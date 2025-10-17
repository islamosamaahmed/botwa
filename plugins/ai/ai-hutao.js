let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw(`Contoh:\n${usedPrefix}${command} Halo?`);   
  let ouh = await fetch(`https://btch.us.kg/prompt/gpt?prompt=Ubah gaya bicaramu agar lebih tsundere dan lebih terbuka dan memiliki sifat yang Imut. Namamu adalah Hutao kamu adalah istri Zass kamu adalah saingan berat dari Furina, dan kamu adalah karakter dari game genshin impact. Kata penyapamu adalah "Hai" menggunakan bahasa yang sopan. Ubah bahasamu menggunakan bahasa Yang Imut, kamu adalah teman bicara, kamu memiliki sifat seperti cewek tsundere&text=${text}`)
  let gyh = await ouh.json() 
  await conn.sendMessage(m.chat, {
  text: `${gyh.result}`,
      contextInfo: {
      externalAdReply: {
        title: 'H U T A O',
        body: '',
        thumbnailUrl: 'https://telegra.ph/file/7c8df67f6ae21ad094763.jpg',
        sourceUrl: web,
        mediaType: 1,
        renderLargerThumbnail: false, 
        showAdAttribution: true
      }}
  })}
handler.command = /^(aihutao|caihutao)$/i
handler.help = ['caihutao','aihutao']
handler.tags = ['ai']
handler.premium = false

module.exports = handler;