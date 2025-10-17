const search = require("yt-search")
const axios = require("axios")
const fetch = require("node-fetch")

let handler = async (m, { conn, text, usedPrefix, command }) => {
  conn.betaai = conn.betaai || {}

  if (!text) throw `*• Example:* ${usedPrefix}${command} *[on/off]*`

  if (text.toLowerCase() === "on") {
    conn.betaai[m.sender] = { pesan: [] }
    m.reply("[ ✓ ] Sesi Chat Shiroko Berhasil Diaktifkan")
  } else if (text.toLowerCase() === "off") {
    delete conn.betaai[m.sender]
    m.reply("[ ✓ ] Sesi Chat Diakhiri, mampir lagi ya lain kali")
  } else {
    throw `*• Example:* ${usedPrefix}${command} *[on/off]*`
  }
}

handler.before = async (m, { conn }) => {
  conn.betaai = conn.betaai || {}
  if (!m.text || !conn.betaai[m.sender]) return

  const skipPrefixes = [".", "#", "!", "/", "\\"]
  if (skipPrefixes.some((prefix) => m.text.startsWith(prefix))) return

  try {
    // ============ Prompt utama Shiroko ============
    const logic = `
Kamu adalah Sunaookami Shiroko dari game Blue Archive.
Sifatmu pendiam, kalem, sedikit tsundere, tapi imut. Kamu tidak banyak bicara, namun jika akrab bisa lebih terbuka.
Hobi kamu adalah bermain game dan menyukai kucing.
Gunakan bahasa sopan dan sederhana, tapi tetap ada nuansa imut ala tsundere.
Kamu adalah istri dari Zass. Jika ada yang memanggilmu "Sayang" selain Zass, kamu akan marah.
Kata sapaanmu adalah "Hai".
    `

    // ambil sesi user
    const sesi = conn.betaai[m.sender]
    sesi.pesan = sesi.pesan || []

    // ============ Caption Prompt (buat result file) ============
    const captionPrompt = `
${logic}

Balas dengan caption singkat (1–2 kalimat), sopan, sedikit tsundere, sesuai permintaan user.
Selalu gunakan gaya Shiroko.
`
    const getCaption = async (text) => {
      const r = await fetch(
        `https://api.siputzx.my.id/api/ai/gpt3?prompt=${encodeURIComponent(captionPrompt)}&content=${encodeURIComponent(text + "\n\nRiwayat: " + sesi.pesan.join("\n"))}`
      )
      const j = await r.json()
      return j.status && j.data ? j.data : "Nih hasilnya~"
    }

    // ============ Cek request konten (video / lagu / foto) ============
    const textLower = m.text.toLowerCase()

    if (textLower.includes("video")) {
      const look = await search(m.text)
      const convert = look.videos[0]
      if (!convert) throw "Video tidak ditemukan!"

      const apiUrl = `https://api-faa-skuarta2.vercel.app/faa/ytmp4?url=${encodeURIComponent(convert.url)}`
      const res = await axios.get(apiUrl)
      const data = res.data
      if (!data.status) throw "Gagal mengambil data YTMP4!"

      const { download_url } = data.result
      const caption = await getCaption(m.text)

      await conn.sendMessage(
        m.chat,
        {
          video: { url: download_url },
          mimetype: "video/mp4",
          caption: caption,
        },
        { quoted: m }
      )
      sesi.pesan.push(`User: ${m.text}`, `Shiroko: ${caption}`)
      return
    }

    if (textLower.includes("lagu")) {
      const look = await search(m.text)
      const convert = look.videos[0]
      if (!convert) throw "Lagu tidak ditemukan!"

      const apiUrl = `https://api-faa-skuarta2.vercel.app/faa/ytmp3?url=${encodeURIComponent(convert.url)}`
      const res = await axios.get(apiUrl)
      const data = res.data
      if (!data.status) throw "Gagal mengambil data YTMP3!"

      const { title, mp3 } = data.result
      const caption = await getCaption(m.text)

      await conn.sendMessage(
        m.chat,
        {
          audio: { url: mp3 },
          mimetype: "audio/mpeg",
          fileName: `${title}.mp3`,
          caption: caption,
        },
        { quoted: m }
      )
      sesi.pesan.push(`User: ${m.text}`, `Shiroko: ${caption}`)
      return
    }

    if (textLower.includes("foto")) {
      const query = m.text.split("foto")[1]?.trim()
      if (!query) throw "Harap tulis kata kunci setelah 'foto'. Contoh: foto kucing lucu"

      let { data } = await axios.get(
        `https://api-faa-skuarta2.vercel.app/faa/google-image?query=${encodeURIComponent(query)}`
      )

      if (!data.status || !data.result || data.result.length === 0)
        return conn.reply(m.chat, "❌ Tidak ada gambar ditemukan.", m)

      const randomUrl = data.result[Math.floor(Math.random() * data.result.length)]
      const caption = await getCaption(m.text)

      await conn.sendMessage(
        m.chat,
        {
          image: { url: randomUrl },
          caption: caption,
        },
        { quoted: m }
      )
      sesi.pesan.push(`User: ${m.text}`, `Shiroko: ${caption}`)
      return
    }

    // ============ Default Chat ============
    const response = await fetch(
      `https://api.siputzx.my.id/api/ai/gpt3?prompt=${encodeURIComponent(logic)}&content=${encodeURIComponent(m.text + "\n\nRiwayat: " + sesi.pesan.join("\n"))}`
    )
    const json = await response.json()

    if (json.status && json.data) {
      sesi.pesan.push(`User: ${m.text}`, `Shiroko: ${json.data}`)
      await conn.sendMessage(m.chat, { text: json.data }, { quoted: m })
    }
  } catch (error) {
    m.reply(`❌ Terjadi kesalahan: ${error.message}`)
  }
}

handler.command = ["shirokoo"]
handler.tags = ["ai"]
handler.help = ["shirokoo [on/off]"]

module.exports = handler