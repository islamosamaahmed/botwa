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
const axios = require("axios")

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `Masukan URL!\n\ncontoh:\n${usedPrefix + command} https://youtu.be/JZNfVd0yd2w`

  m.reply(wait)

  try {
    let apiUrl, response, data
    if (command === "ytmp3") {
      apiUrl = `https://api-faa-skuarta2.vercel.app/faa/ytmp3?url=${encodeURIComponent(text)}`
      response = await axios.get(apiUrl)
      data = response.data
      if (!data.status || !data.result?.mp3) throw `Gagal mengambil data YTMP3!`

      const { title, thumbnail, mp3 } = data.result
      await conn.sendMessage(
        m.chat,
        {
          audio: { url: mp3 },
          mimetype: "audio/mpeg",
          ptt: false,
          contextInfo: {
            externalAdReply: {
              title: title,
              body: "Format: 128 kbps",
              thumbnailUrl: thumbnail,
              sourceUrl: text,
              mediaType: 1,
              renderLargerThumbnail: true,
            },
          },
        },
        { quoted: m }
      )
    } else if (command === "ytmp4") {
      apiUrl = `https://api-faa-skuarta2.vercel.app/faa/ytmp4?url=${encodeURIComponent(text)}`
      response = await axios.get(apiUrl)
      data = response.data
      if (!data.status || !data.result?.download_url) throw `Gagal mengambil data YTMP4!`

      const { download_url, format } = data.result
      const caption = `*YouTube ${command.toUpperCase()} Downloader*\n\n◦ Format: ${format.toUpperCase()}`

      await conn.sendMessage(
        m.chat,
        {
          video: { url: download_url },
          mimetype: "video/mp4",
          caption,
          contextInfo: {
            externalAdReply: {
              title: "YouTube Video",
              body: `Format: ${format}`,
              sourceUrl: text,
              mediaType: 1,
              renderLargerThumbnail: true,
            },
          },
        },
        { quoted: m }
      )
    }
  } catch (err) {
    console.error(err)
    m.reply(eror)
  }
}

handler.help = ["ytmp3 <url>", "ytmp4 <url>"]
handler.command = /^(ytmp3|ytmp4)$/i
handler.tags = ["downloader"]
handler.limit = true
handler.register = true

module.exports = handler