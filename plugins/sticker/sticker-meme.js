const fs = require("fs")
const axios = require("axios")
const uploader = require("../../lib/uploader") // pastikan ada
// atau bikin fungsi uploadToCloudku sendiri kalau mau spesifik Catbox

let handler = async (m, { conn, text, usedPrefix, command }) => {
  let q = m.quoted || m
  let mime = (q.msg || q).mimetype || ""
  if (!/image|webp/.test(mime)) {
    return m.reply(`📌 Reply gambar/webp dengan caption:\n${usedPrefix + command} teksAtas|teksBawah`)
  }

  let [atas, bawah] = text.split("|")
  if (!atas) return m.reply("⚠️ Format salah!\nContoh: .smeme teksatas|teksbawah")

  let tempFile, uploadedUrl
  try {
    // 1. Download media sementara
    tempFile = await conn.downloadAndSaveMediaMessage(q, `smeme_${Date.now()}`)

    // 2. Upload ke host (pakai Uguu fallback kalau Catbox error)
    try {
      uploadedUrl = await uploader.catbox(fs.readFileSync(tempFile))
    } catch {
      uploadedUrl = await uploader.Uguu(fs.readFileSync(tempFile))
    }

    if (!uploadedUrl || !uploadedUrl.startsWith("http")) throw new Error("Upload gagal")

    // 3. Panggil API RyuuDev smeme
    const apiUrl = `https://api.ryuu-dev.offc.my.id/tools/smeme?img=${encodeURIComponent(uploadedUrl)}&atas=${encodeURIComponent(atas)}&bawah=${encodeURIComponent(bawah || "")}`
    const { data } = await axios.get(apiUrl, { responseType: "arraybuffer" })

    // 4. Kirim hasil sebagai stiker
    await conn.sendImageAsSticker(m.chat, data, m, {
      packname: global.packname,
      author: global.author,
    })

  } catch (err) {
    console.error("❌ smeme error:", err)
    m.reply("✖️ Gagal membuat meme, coba lagi.")
  } finally {
    if (tempFile && fs.existsSync(tempFile)) fs.unlinkSync(tempFile)
  }
}

handler.help = ["smeme"].map(a => a + " teksAtas|teksBawah")
handler.tags = ["sticker"]
handler.command = /^smeme$/i
handler.limit = true
handler.register = true

module.exports = handler