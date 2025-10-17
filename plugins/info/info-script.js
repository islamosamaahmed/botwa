
let handler = async (m, { conn, usedPrefix: _p, __dirname, args }) => {
  const pp = await conn.profilePictureUrl(m.sender, 'image')
    .catch((_) => "https://telegra.ph/file/1ecdb5a0aee62ef17d7fc.jpg");
  
  // Kirim info audio/script
  conn.sendFile(m.chat,'./mp3/script.opus',null,null, fkontak, true, {
    contextInfo: {
      externalAdReply: {
        showAdAttribution: true,
        title: '‼️ INFO SCRIPT GRATIS',
        body: 'Dapatkan script ini secara gratis',
        mediaType: 2,
        mediaUrl: "https://youtube.com/@zassci_desu", // redirect link
        thumbnailUrl: pp,
        renderLargerThumbnail: false,
        sourceUrl: "https://youtube.com/@zassci_desu"
      }
    }
  })

  // Delay biar keliatan ada notifikasi lanjutan
  setTimeout(() => {
    conn.reply(m.chat, `*FREE SCRIPT SHIROKO FORK*

Script ini bisa kamu dapatkan GRATIS di YouTube:
https://youtube.com/@zassci_desu

*==> Total Fitur:* 700+
*==> FREE UPDATE*
*==> VIP APIKEY*
*==> FULL SERVICE*
*==> PANEL BOT WA*

Segera cek channel untuk link dan review lengkapnya.`, m)
  }, 5000)
}

handler.help = ['sc', 'sourcecode']
handler.tags = ['info']
handler.command = /^(sc|sourcecode)$/i
handler.register = false

module.exports = handler