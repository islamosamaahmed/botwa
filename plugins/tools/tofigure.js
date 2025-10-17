const axios = require("axios")
const fs = require("fs")

module.exports = {
  help: ["tofigure", "figure"].map(v => v + " [mode]"),
  tags: ["tools"],
  command: ["tofigure", "figure"],
  premium: false,
  register: true,
  limit: true,
  coin: 0,
  code: async (m, { conn, text, usedPrefix, command }) => {
    const choice = text.trim()
    const q = m.quoted ? m.quoted : m
    const mime = (q.msg || q).mimetype || ""

    // kalau belum pilih mode
    if (!choice || !["1", "2", "3"].includes(choice)) {
      const list = [
        { title: "Mode 1: Figur Biasa 🪅", id: `${usedPrefix}${command} 1` },
        { title: "Mode 2: Figur Dipegang 😈", id: `${usedPrefix}${command} 2` },
        { title: "Mode 3: Figur Dipegang Karakter ⚔️", id: `${usedPrefix}${command} 3` },
      ]
      let txt = `*PILIH JENIS FIGUR*\n\nReply gambar lalu pilih mode:`
      txt += list.map(v => `\n◦ ${v.title}\n> ${v.id}`).join("\n")
      return m.reply(txt)
    }

    // pastikan reply gambar
    if (!/image/.test(mime)) {
      return m.reply(`⚠️ Reply sebuah *gambar* dengan perintah *${usedPrefix}${command} ${choice}*`)
    }

    m.reply(wait)

    // tentukan API sesuai mode
    let apiUrl = ""
    switch (choice) {
      case "1":
        apiUrl = "https://api-faa-skuarta2.vercel.app/faa/tofigura"
        break
      case "2":
        apiUrl = "https://api-faa-skuarta2.vercel.app/faa/tofigurav2"
        break
      case "3":
        apiUrl = "https://api-faa-skuarta2.vercel.app/faa/tofigurav3"
        break
    }

    let mediaPath
    try {
      mediaPath = await conn.downloadAndSaveMediaMessage(q)
      if (!mediaPath) throw "Gagal mengunduh gambar."

      // upload dulu ke Catbox (biar ada URL publik)
      const imageUrl = await uploadToCatbox(mediaPath)
      if (!imageUrl) throw "Gagal mengunggah gambar ke server."

      // ambil hasil dari API
      const response = await axios.get(
        `${apiUrl}?url=${encodeURIComponent(imageUrl)}`,
        { responseType: "arraybuffer" }
      )

      const imageBuffer = Buffer.from(response.data)

      await conn.sendMessage(
        m.chat,
        { image: imageBuffer, caption: done },
        { quoted: m }
      )
    } catch (e) {
      console.error("Error di fitur tofigure:", e)
      m.reply(eror)
    } finally {
      if (mediaPath && fs.existsSync(mediaPath)) {
        fs.unlinkSync(mediaPath)
      }
    }
  },
}

// fungsi upload ke catbox
async function uploadToCatbox(filePath) {
  const FormData = require("form-data")
  const fetch = require("node-fetch")
  const form = new FormData()
  form.append("reqtype", "fileupload")
  form.append("fileToUpload", fs.createReadStream(filePath))

  const res = await fetch("https://catbox.moe/user/api.php", { method: "POST", body: form })
  return res.ok ? await res.text() : null
}