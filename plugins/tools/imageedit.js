const fs = require("fs")
const axios = require("axios")
const uploader = require("../../lib/uploader")

let handler = async (m, { conn, text, usedPrefix, command }) => {
  try {
    const quoted = m.quoted || m
    const mime = quoted.message?.imageMessage?.mimetype || quoted.mimetype || ""
    if (!mime || !/image/.test(mime)) {
      return m.reply(`❌ Kirim atau reply gambar dengan caption *${usedPrefix}${command}* dan sertakan prompt, misal:\n${usedPrefix}${command} pakai tanktop`)
    }

    if (!text) return m.reply("❌ Masukkan prompt edit gambar, misal: pakai tanktop")

    m.reply(wait)

    let mediaPath
    try {
      // download media
      mediaPath = await conn.downloadAndSaveMediaMessage(quoted)
      if (!mediaPath) throw "Gagal mengunduh gambar."

      // upload pake uploader internal, misal catbox
      const buffer = fs.readFileSync(mediaPath)
      const imageUrl = await uploader.catbox(buffer)
      fs.unlinkSync(mediaPath)
      if (!imageUrl) throw eror

      // request ke API editfoto
      const response = await axios.get(
        `https://api-faa-skuarta2.vercel.app/faa/editfoto?url=${encodeURIComponent(imageUrl)}&prompt=${encodeURIComponent(text)}`,
        { responseType: "arraybuffer" }
      )
      const imageBuffer = Buffer.from(response.data)

      // kirim hasil ke chat
      await conn.sendMessage(
        m.chat,
        { image: imageBuffer, caption: `🖌️ Hasil edit: ${text}` },
        { quoted: m }
      )
    } catch (err) {
      console.error(err)
      m.reply(`${eror}:\n${err.message}`)
    }
  } catch (err) {
    console.error(err)
    m.reply(`${eror}:\n${err.message}`)
  }
}

handler.help = ["imageedit", "editfoto"].map(a => a + " *[reply/send media]*")
handler.tags = ["tools"]
handler.command = ["imageedit", "editfoto"]
handler.limit = true
handler.register = true

module.exports = handler