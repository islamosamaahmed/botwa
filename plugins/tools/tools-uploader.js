const uploaders = require('../../lib/uploader')

let handler = async (m) => {
  let q = m.quoted ? m.quoted : m
  let mime = (q.msg || q).mimetype || ''
  if (!mime) throw 'Tidak ada media yang ditemukan'

  let media = await q.download()
  if (!media) throw '❌ Gagal mendownload media'

  let fileSizeLimit = 10 * 1024 * 1024 // 10MB max
  if (media.length > fileSizeLimit) {
    throw 'Ukuran media tidak boleh melebihi 10MB'
  }

  let results = []
  for (let [name, fn] of Object.entries(uploaders)) {
    try {
      let url = await fn(media)
      if (url && typeof url === 'string') {
        results.push(`✅ *${name}*: ${url}`)
      } else if (url && url.url) {
        // fallback kalo uploader balikin object (kayak Pomf2 / Itzpire)
        results.push(`✅ *${name}*: ${url.url || JSON.stringify(url)}`)
      }
    } catch (err) {
      console.log(`❌ ${name} gagal:`, err.message || err)
    }
  }

  if (!results.length) throw 'Semua uploader gagal!'

  let replyText = `*Hasil Upload:*\n\n${results.join('\n')}`
  m.reply(replyText)
}

handler.help = ['tourl <reply media>']
handler.tags = ['tools']
handler.command = /^(upload|tourl)$/i

module.exports = handler