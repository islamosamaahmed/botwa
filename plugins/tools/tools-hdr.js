let fetch = require("node-fetch")
let upload = require("../../lib/uploader") // sesuaikan path

let handler = async (m, { conn, usedPrefix, command, args }) => {
  switch (command) {
    case "hd":
    case "hdr":
    case "remini":
      {
        conn.hdr = conn.hdr || {}
        if (m.sender in conn.hdr)
          throw "Masih ada proses yang belum selesai, tunggu dulu ya..."

        let q = m.quoted ? m.quoted : m
        let mime = (q.msg || q).mimetype || q.mediaType || ""
        if (!mime)
          throw `*• Example:* ${usedPrefix + command} *[reply/send media]*`

        conn.hdr[m.sender] = true
        m.reply(wait)

        let img = await q.download?.()
        if (!img) throw "❌ Gagal download media."

        // Upload ke catbox
        let url
        try {
          url = await upload.catbox(img)
        } catch (e) {
          delete conn.hdr[m.sender]
          throw "❌ Gagal upload gambar ke catbox."
        }

        // parsing scale dari args
        let scale = parseInt(args[0]) || 4
        if (scale < 1) scale = 1
        if (scale > 20) scale = 20

        try {
          let apiUrl = `https://api.siputzx.my.id/api/tools/upscale?url=${encodeURIComponent(
            url,
          )}&scale=${scale}`

          let res = await fetch(apiUrl)
          if (!res.ok) throw await res.text()
          let buffer = await res.buffer()

          await conn.sendFile(
            m.chat,
            buffer,
            "upscaled.jpg",
            `✅ Gambar berhasil di-HD (Scale ${scale}x)`,
            m,
          )
        } catch (e) {
          console.error(e)
          m.reply("❌ Gagal upscale gambar, coba lagi nanti.")
        } finally {
          delete conn.hdr[m.sender]
        }
      }
      break
  }
}

handler.help = ["hd", "hdr", "remini"].map((a) => a + " *[reply/send media]*")
handler.tags = ["tools"]
handler.command = ["hd", "hdr", "remini"]

module.exports = handler