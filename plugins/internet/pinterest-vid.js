const axios = require("axios")

let handler = async (m, { conn, text, usedPrefix, command }) => {
  try {
    if (!text) return m.reply(`❌ Masukkan kata kunci pencarian!\n\nContoh:\n${usedPrefix + command} shiroko`)

    m.reply(wait)

    // request ke API playpinvid
    const response = await axios.get(`https://api-faa-skuarta2.vercel.app/faa/playpinvid?query=${encodeURIComponent(text)}`)
    const data = response.data

    if (!data.status || !data.video_url) throw "Video tidak ditemukan."

    // kirim video ke chat
    await conn.sendMessage(
      m.chat,
      {
        video: { url: data.video_url },
        mimetype: "video/mp4",
        caption: `🎬 Hasil pencarian: ${text}`,
      },
      { quoted: m }
    )
  } catch (err) {
    console.error(err)
    m.reply(`${eror}:\n${err.message}`)
  }
}

handler.help = ["pinvid", "pinterest-video"]
handler.tags = ["Internet"]
handler.command = ["pinvid", "pinterest-video"]
handler.limit = true
handler.register = true

module.exports = handler