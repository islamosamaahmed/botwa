const QRCode = require("qrcode")
const fetch = require("node-fetch")

// === Config harga sewa ===
const harga = {
  daily: 1000,       // per hari
  weekly: 7000,      // 7 hari
  monthly: 15000,    // 30 hari
  custom: 1000       // harga custom per hari
}

let handler = async (m, { conn, args, usedPrefix }) => {
  let db = global.db
  db.data.transaksi = db.data.transaksi || {}
  let trxdb = db.data.transaksi
  let chatdb = db.data.chats

  // === tolak kalau dari grup ===
  if (m.isGroup) return m.reply("⚠️ Pembelian hanya bisa dilakukan di private chat (PC bot).")

  // === parsing argumen ===
  let [link, durasi] = args.join(" ").split(",")
  if (link) link = link.trim()
  if (durasi) durasi = durasi.trim()

  // === kalau cuma link tanpa durasi → tampilkan pilihan paket ===
  if (link && !durasi) {
    if (!link.includes("whatsapp.com")) return m.reply("❌ Link GC tidak valid")

    const sections = [
      {
        title: 'Durasi Sewa',
        rows: [
          { header: '📦 Paket Harian', title: `2 Hari - Rp${harga.daily.toLocaleString()}`, id: `${usedPrefix}buysewa ${link},2d` },
          { header: '📦 Paket Mingguan', title: `7 Hari - Rp${harga.weekly.toLocaleString()}`, id: `${usedPrefix}buysewa ${link},7d` },
          { header: '📦 Paket Bulanan', title: `30 Hari - Rp${harga.monthly.toLocaleString()}`, id: `${usedPrefix}buysewa ${link},30d` },
          { header: '📦 Custom Durasi', title: `Custom (Rp${harga.custom.toLocaleString()}/hari)`, id: `${usedPrefix}buysewa ${link},10d` }
        ]
      }
    ]

    return conn.sendMessage(m.chat, {
      text: `*</> Sewa Bot </>*\nSilakan pilih durasi sewa untuk grup ini:`,
      buttons: [
        {
          buttonId: "pilih_durasi",
          buttonText: { displayText: "Pilih Durasi" },
          type: 4,
          nativeFlowInfo: { name: "single_select", paramsJson: JSON.stringify({ title: "Pilih Durasi", sections }) }
        }
      ]
    }, { quoted: m })
  }

  // === kalau ga ada link sama sekali
  if (!link) return m.reply(`⚠️ Format salah!\n\n*Contoh:* ${usedPrefix}buysewa https://chat.whatsapp.com/xxx,1d`)
  if (!link.includes("whatsapp.com")) return m.reply("❌ Link GC tidak valid")

  let code = link.replace("https://chat.whatsapp.com/", "").trim()
  let waktu = toMs(durasi)
  if (!waktu) return m.reply("❌ Format durasi tidak valid!")

  // === hitung harga ===
  let nominal = hargaSewa(durasi)
  if (nominal <= 0) return m.reply("❌ Durasi tidak valid.")
  if (nominal < 2000) return m.reply("⚠️ Minimal order Rp2.000")

  // === pesan loading ===
  let loadingMsg = await m.reply(wait)

  // === bikin invoice ===
  let url = `https://ciaatopup.my.id/h2h/deposit/create?nominal=${nominal}&metode=QRISFAST`
  let res = await fetch(url, {
    method: "GET",
    headers: { "X-APIKEY": global.apikey_ciaatopup, "Accept": "application/json" }
  }).catch(() => null)

  if (!res) return m.reply("⚠️ Gagal menghubungi server payment.")
  let data = await res.json().catch(() => ({}))
  if (!data.success || !data.data) return m.reply(`❌ Gagal membuat invoice: ${data.error || 'takde pesan'}`)

  let trx = data.data
  let trxid = trx.id

  trxdb[trxid] = {
    id: trxid,
    chat: m.chat,
    buyer: m.sender,
    link,
    code,
    durasi,
    waktu,
    nominal,
    status: "pending",
    created: Date.now()
  }

  // === generate QR dari qr_string ===
  let qrBuffer
  try {
    qrBuffer = await QRCode.toBuffer(trx.qr_string, { type: "png" })
  } catch (e) {
    return m.reply("⚠️ Gagal membuat QR dari string!")
  }

  // === kirim invoice ===
  let caption = `🧾 *Invoice Pembelian Sewa Bot*\n\n` +
    `• ID Transaksi : ${trxid}\n` +
    `• Penyewa      : @${m.sender.split("@")[0]}\n` +
    `• Durasi       : ${durasi}\n` +
    `• Nominal      : Rp${trx.nominal.toLocaleString()}\n` +
    `• Fee          : Rp${trx.fee.toLocaleString()}\n` +
    `• Saldo Masuk  : Rp${trx.get_balance.toLocaleString()}\n` +
    `• Status       : ⏳ Pending\n\n` +
    `📌 Scan QRIS di atas untuk bayar.\n` +
    `🔗 [Link QR](${trx.qr_image})\n` +
    `❗ Expired dalam 15 menit.\n` +
    `⚠️ Jika ada kendala, ketik *.owner*.\n\n` +
    `Ketik *.cekstatus ${trxid}* atau *.cancel ${trxid}* jika diperlukan.`

  let sentMsg = await conn.sendMessage(m.chat, {
    image: qrBuffer,
    caption,
    mentions: [m.sender]
  }, { quoted: m })

  // === auto cek status tiap 1 detik ===
  let interval = setInterval(async () => {
    if (!trxdb[trxid] || trxdb[trxid].status !== "pending") {
      clearInterval(interval)
      return
    }

    let resStatus = await fetch(`https://ciaatopup.my.id/h2h/deposit/status?id=${trxid}`, {
      method: "GET",
      headers: { "X-APIKEY": global.apikey_ciaatopup }
    }).catch(() => null)

    if (!resStatus) return
    let statusData = await resStatus.json().catch(() => ({}))
    if (!statusData.success || !statusData.data) return

    let status = statusData.data.status
    if (status === "success") {
      trxdb[trxid].status = "success"
      clearInterval(interval)

      let newCaption = caption.replace("⏳ Pending", "✅ Sukses") +
        `\n\nBot akan segera join ke grup sesuai durasi yang dibeli.`

      // hapus pesan qr lama
      await conn.sendMessage(m.chat, { delete: sentMsg.key })

      await conn.sendMessage(m.chat, {
        text: newCaption,
        mentions: [m.sender]
      }, { quoted: m })

      let resJoin = await conn.groupAcceptInvite(trxdb[trxid].code).catch(() => null)
      if (resJoin) {
        chatdb[resJoin] = chatdb[resJoin] || {}
        chatdb[resJoin].expired = Date.now() + trxdb[trxid].waktu

        conn.sendMessage(resJoin, {
          text: `🤖 Bot berhasil masuk ke grup ini.\n\n📦 Paket sewa: ${trxdb[trxid].durasi}\n👤 Penyewa: @${m.sender.split("@")[0]}\n\nGunakan *.menu* untuk mulai.`,
          mentions: [m.sender]
        })

        // === notif owner ===
        let ownerJid = global.nomorown + "@s.whatsapp.net"
        conn.sendMessage(ownerJid, {
          text: `📢 *Pembelian Sewa Bot*\n\n` +
            `👤 Penyewa: @${m.sender.split("@")[0]}\n` +
            `📦 Durasi: ${durasi}\n` +
            `💰 Nominal: Rp${nominal.toLocaleString()}\n` +
            `🔗 Grup: ${link}\n` +
            `📱 Kontak: wa.me/${m.sender.split("@")[0]}\n` +
            `✅ Status: Sukses`,
          mentions: [m.sender]
        })

        setTimeout(async () => {
          let sisa = chatdb[resJoin]?.expired - Date.now()
          if (sisa <= 0) {
            await conn.sendMessage(resJoin, { text: "⏳ Masa sewa telah berakhir. Bot akan keluar dalam 15 detik.\nTerima kasih sudah menyewa 🙏" })
            setTimeout(() => conn.groupLeave(resJoin), 15000)
            chatdb[resJoin].expired = 0
          }
        }, trxdb[trxid].waktu)
      }
    }
  }, 1000)
  
   // === kalau canceled manual ===
  if (status === "canceled" || status === "cancel") {
    trxdb[trxid].status = "canceled"
    clearInterval(interval)

    // hapus invoice lama
    await conn.sendMessage(m.chat, { delete: sentMsg.key })

    await conn.sendMessage(m.chat, {
      text: `🛑 *Invoice Dibatalkan*\n\n🆔 ID: ${trxid}\n📊 Status: ❌ Cancelled\n\nPesanan telah dibatalkan.`,
      mentions: [m.sender]
    }, { quoted: m })

    delete trxdb[trxid]
  }
}, 3000) // tiap 3 detik biar ga terlalu spam

  // === auto cancel 15 menit ===
  setTimeout(async () => {
    if (trxdb[trxid] && trxdb[trxid].status === "pending") {
      await fetch(`https://ciaatopup.my.id/h2h/deposit/cancel?id=${trxid}`, {
        method: "GET",
        headers: { "X-APIKEY": global.apikey_ciaatopup }
      }).catch(() => null)

      delete trxdb[trxid] // hapus riwayat
      clearInterval(interval)
      m.reply(`⚠️ Invoice ${trxid} expired & dibatalkan otomatis.`)
    }
  }, 15 * 60 * 1000)
}

handler.help = ["buysewa"]
handler.tags = ["store"]
handler.command = /^buysewa$/i
handler.register = true;

module.exports = handler

// === helper ===
function toMs(str) {
  let total = 0
  let regex = /(\d+)(d|h|m|s|w|mo)/g
  let match
  while ((match = regex.exec(str))) {
    let val = parseInt(match[1])
    let unit = match[2]
    if (unit === "d") total += val * 86400000
    if (unit === "h") total += val * 3600000
    if (unit === "m") total += val * 60000
    if (unit === "s") total += val * 1000
    if (unit === "w") total += val * 7 * 86400000
    if (unit === "mo") total += val * 30 * 86400000
  }
  return total
}

function hargaSewa(durasi) {
  if (/^1d$/.test(durasi)) return harga.daily
  if (/^7d$/.test(durasi)) return harga.weekly
  if (/^30d$/.test(durasi) || /^1mo$/.test(durasi)) return harga.monthly
  if (/^(\d+)d$/.test(durasi)) {
    let days = parseInt(durasi)
    return days * harga.custom
  }
  return 0
}