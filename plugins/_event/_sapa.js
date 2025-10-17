/*═══════════════════════════════════════════════════════
 *  ⌬  YT NeoShiroko Labs
 *═══════════════════════════════════════════════════════
 *  🌐  Website     : https://www.neolabsofficial.my.id
 *  ⌨︎  Developer   : https://zass.cloud
 *  ▶︎  YouTube     : https://www.youtube.com/@zassci_desu
 *  ⚙︎  Panel Murah : pteroku-desu.zass.cloud
 *
 *  ⚠︎  Mohon untuk tidak menghapus watermark ini
 *═══════════════════ © 2025 Zass Desuta ─════════════════════
 */

let handler = m => m

handler.before = async function (m, { conn, participants }) {
  let name = m.sender
  let fkonn = { 
    key: { 
      fromMe: false, 
      participant: `0@s.whatsapp.net`, 
      ...(m.chat ? { remoteJid: '0@s.whatsapp.net' } : {}) 
    }, 
    message: { 
      contactMessage: { 
        displayName: `${await conn.getName(name)}`, 
        vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;a,;;;\nFN:${name}\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
      }
    }
  }

  // Inisialisasi state jika belum ada
  if (!conn.danil_join) {
    conn.danil_join = {
      join: false,
      time: 0,
    }
  }

  const currentTime = Math.floor(Date.now() / 1000)

  // ✅ Jika ada yang mention owner
  if (m.isGroup && m.mentionedJid && m.mentionedJid.includes(`${nomorown}@s.whatsapp.net`)) {
    await conn.sendMessage(
      m.chat,
      { sticker: { url: "https://files.catbox.moe/eg98cs.webp" } },
      { quoted: m }
    )
    await conn.sendMessage(
      m.chat,
      { text: "*Gausah tag ownerku, dia lagi sibuk nafkahin Shiroko!*" },
      { quoted: m }
    )
    return
  }

  // ✅ Sambutan Owner masuk grup
  if (!m.isGroup || conn.danil_join.time > currentTime) return

  let messageText = null
  let mentionedUsers = participants.map((u) => u.id).filter((v) => v !== conn.user.jid)

  if (m.sender === `${nomorown}@s.whatsapp.net`) {
    messageText = `📣 *Perhatian semua, Owner* *Shiroko* - *Fork* telah tiba disini`
  }

  if (messageText) {
    await conn.sendMessage(
      m.chat,
      { text: messageText },
      { quoted: fkonn, mentions: mentionedUsers }
    )

    await conn.sendMessage(
      m.chat,
      { sticker: { url: "https://files.catbox.moe/r3uccu.webp" } },
      { quoted: fkonn }
    )

    conn.danil_join = {
      join: true,
      time: currentTime + 600, // 10 menit
    }
  }
}

module.exports = handler