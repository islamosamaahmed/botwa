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

const fs = require("fs")
const axios = require("axios")
const uploader = require("../../lib/uploader") // sesuaikan path

let handler = async (m, { conn, usedPrefix, command }) => {
  try {
    const quoted = m.quoted || m
    const mime = quoted.message?.imageMessage?.mimetype || quoted.mimetype || ""
    if (!mime || !/image/.test(mime)) {
      return m.reply(`❌ Kirim atau reply gambar dengan caption *${usedPrefix}${command}*`)
    }

    // kalau user klik tombol
    if (m.text && m.text.startsWith(`${usedPrefix}${command}`)) {
      m.reply(wait)

      let mediaPath
      try {
        mediaPath = await conn.downloadAndSaveMediaMessage(quoted)
        if (!mediaPath) throw "Gagal mengunduh gambar."

        // upload pake uploader internal, misal catbox
        const buffer = fs.readFileSync(mediaPath)
        const imageUrl = await uploader.catbox(buffer)
        fs.unlinkSync(mediaPath)
        if (!imageUrl) throw eror

        // ambil hasil botak
        const response = await axios.get(
          `https://api-faa-skuarta2.vercel.app/faa/tobotak?url=${encodeURIComponent(imageUrl)}`,
          { responseType: "arraybuffer" }
        )
        const imageBuffer = Buffer.from(response.data)

        await conn.sendMessage(
          m.chat,
          { image: imageBuffer, caption: done },
          { quoted: m }
        )
      } catch (err) {
        console.error(err)
        m.reply(`${eror}:\n${err.message}`)
      }
    }
  } catch (err) {
    console.error(err)
    m.reply(`${eror}:\n${err.message}`)
  }
}

handler.help = ["tobotak"].map(a => a + " *[reply/send media]*")
handler.tags = ["tools"]
handler.command = /^tobotak$/i
handler.limit = true
handler.register = true

module.exports = handler