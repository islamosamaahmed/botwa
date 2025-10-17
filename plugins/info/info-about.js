let handler = async (m, { conn }) => {
let thumb = 'https://telegra.ph/file/becc1cf9f0952565d59d6.jpg'
let capt = `
*WhatsApp - Bot* adalah botWangsap cerdas dan akan banyak membantu kalian dalam menjawab pertanyaan, *WhatsApp - Bot* juga bisa membuat sticker, download, logo design, dll. *WhatsApp - Bot* dikembangkan oleh *zass* bot ini menggunakan sumber asli dari base *#HIDENIED*, dikembangkan oleh *zass* dan terus di perbarui oleh *zass* untuk memberikan pengalaman interaksi dengan antar lain agar lebih mudah dan menyenangkan.

*WhatsApp - Bot* dikembangkan untuk selalu meng update fitur dan semakin hari semakin bertambah fitur-fitur baru. Dan *WhatsApp - Bot* memiliki online service selalu yg di tangani oleh *balzz*, "Saya akan selalu aktif di chat *WhatsApp - Bot* jika kalian kesusahan saya akan siap membantu 24jam dengan tujuan agar pengguna juga bisa memahami pemakaian bot kami!".

Produk Yg kami jual dengan harga murah dan selalu memberikan promo pada produk tersebut kami tidak keberatan jika kamu ingin nego seberapa pun jika harga nego itu masuk akal akan kami terima.

Kualitas Bot kami dibilang belum 100% online dikarenakan, selalu banyak kendala seperti panel yg saya beli selalu mati (mokad), database yg tidak ke backup pada saat panel mokad membuat saya kewalahan karena saya akan membeli lagi panel tsb.

_Tentang 31/03/23_
*V${version} ©zassbtz*
`

await conn.sendMessage(m.chat, {
text: capt,
contextInfo: {
externalAdReply: {
title: xl + ' A B O U T - B O T',
body: 'Apakah Kamu ingin tahu tentang WhatsApp bot?',
thumbnailUrl: thumb,
sourceUrl: sgc,
mediaType: 1,
renderLargerThumbnail: true
}}})
}
handler.tags = ['info']
handler.command = /^(tentang|about)/i
module.exports = handler