let fetch = require("node-fetch")

let handler = async (m, { conn, args, usedPrefix, command }) => {
  let chatdb = global.db.data.chats
  let now = Date.now()

  switch (command) {
    case "ceksewa":
      {
        if (!chatdb[m.chat] || !chatdb[m.chat].expired || chatdb[m.chat].expired < 1)
          return conn.reply(m.chat, `⚠️ Grup ini tidak di-set sewa!`, m)

        let sisa = chatdb[m.chat].expired - now
        if (sisa < 0) return conn.reply(m.chat, "⚠️ Masa sewa sudah habis.", m)

        conn.reply(m.chat, `⏳ Sewa grup ini akan berakhir dalam:\n${msToDate(sisa)}`, m)
      }
      break

    case "addsewa":
      {
        if (!args[0]) {
          return m.reply(
            `⚠️ Format salah!\n\n*Contoh:* ${usedPrefix}addsewa https://chat.whatsapp.com/xxxxx,1d`,
          )
        }

        let [link, durasi] = args.join(" ").split(",")
        if (!link.includes("whatsapp.com")) return m.reply("❌ Link GC tidak valid")

        // hapus query string ?mode=...
        link = link.split("?")[0]

        let code = link.replace("https://chat.whatsapp.com/", "").trim()
        let id = await conn.groupAcceptInvite(code).catch(() => null)
        if (!id) return m.reply("❌ Gagal join grup.")

        let waktu = toMs(durasi || "4d") // default 4 hari kalau kosong
        if (!waktu) return m.reply("❌ Format durasi tidak valid!\nGunakan: 1s 1m 1h 1d 1w 1mo")

        chatdb[id] = chatdb[id] || {}
        chatdb[id].expired = now + waktu

        // info ke owner
        m.reply(
          `✅ Berhasil sewa grup!\n\nID: ${id}\nDurasi: ${durasi}\nBerakhir: ${new Date(
            chatdb[id].expired,
          ).toLocaleString()}`,
        )

        // info ke grup
        let penyewa = m.pushName || m.sender || "Anomali"
        await conn.sendMessage(id, {
          text: `✅ Grup ini berhasil dimasukkan ke daftar sewa bot!\n\n` +
                `📌 *Durasi:* ${durasi}\n` +
                `👤 *Penyewa:* ${penyewa}\n\n` +
                `Ketik *.menu* untuk mulai menggunakan bot.\n` +
                `Jangan lupa daftar dengan cara ketik:\n*.daftar nama.umur*`
        })

        // schedule notifikasi 15 detik sebelum keluar
        let timeoutNotif = waktu - 15000
        if (timeoutNotif > 0) {
          setTimeout(async () => {
            if (chatdb[id] && chatdb[id].expired <= Date.now()) return
            await conn.sendMessage(id, {
              text: `⚠️ Masa sewa grup ini telah berakhir.\n` +
                    `Bot akan keluar dalam 15 detik...\n\n` +
                    `Terimakasih sudah menyewa 💙`
            })
          }, timeoutNotif)
        }

        // auto keluar pas expired
        setTimeout(async () => {
          if (chatdb[id] && chatdb[id].expired <= Date.now()) {
            await conn.groupLeave(id).catch(() => null)
            chatdb[id].expired = 0
          }
        }, waktu)
      }
      break

    case "delsewa":
      {
        if (!args[0]) return m.reply(`⚠️ Masukkan ID grup!\n\n*Contoh:* ${usedPrefix}delsewa 123-456@g.us`)

        let id = args[0]
        if (!chatdb[id]) return m.reply("❌ Grup tidak ada di database sewa.")

        delete chatdb[id]
        await conn.groupLeave(id).catch(() => m.reply("❌ Bot gagal keluar dari grup."))

        m.reply(`✅ Berhasil hapus sewa dan keluar dari grup ${id}`)
      }
      break
  }
}

handler.help = ["ceksewa", "addsewa", "delsewa"]
handler.tags = ["group"]
handler.command = /^(ceksewa|addsewa|delsewa)$/i
handler.owner = true

module.exports = handler

// === Helper ===
function toMs(str) {
  let total = 0
  let regex = /(\d+)(s|m|h|d|w|mo)/g
  let match
  while ((match = regex.exec(str))) {
    let val = parseInt(match[1])
    let unit = match[2]
    if (unit === "s") total += val * 1000
    if (unit === "m") total += val * 60000
    if (unit === "h") total += val * 3600000
    if (unit === "d") total += val * 86400000
    if (unit === "w") total += val * 7 * 86400000
    if (unit === "mo") total += val * 30 * 86400000
  }
  return total
}

function msToDate(ms) {
  let days = Math.floor(ms / (24 * 60 * 60 * 1000))
  let daysms = ms % (24 * 60 * 60 * 1000)
  let hours = Math.floor(daysms / (60 * 60 * 1000))
  let hoursms = ms % (60 * 60 * 1000)
  let minutes = Math.floor(hoursms / (60 * 1000))
  let minutesms = ms % (60 * 1000)
  let sec = Math.floor(minutesms / 1000)
  return `${days} Hari ${hours} Jam ${minutes} Menit ${sec} Detik`
}