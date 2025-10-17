let handler = async (m, {conn, text}) => {
global.menu = text
if (text === 'doc') {
m.reply('Suksess Set menu menjadi Document ✅')
} else if (text === 'simple') {
m.reply('Suksess Set menu menjadi simple ✅')
} else if (text === 'gif') {
m.reply('sukses set menu menjadi gif ✅')
} else if (text === 'button') {
m.reply('sukses set menu menjadi button ✅')
} else if (text === 'payment') {
m.reply('sukses set menu menjadi payment ✅')
} else m.reply('Tampilan menu berhasil di reset‼️\n\n===========================\n*•BERIKUT LIST TAMPILAN MENU*• button : menampilkan menu dengan button\n\n• doc : menampilkan menu dengan documentMessage\n• simple : menampilkan menu dengan simpleMenu\n• gif : menampilkan menu dengan Gif\n• payment :  menampilkan menu dengan RequestPaymentMessage\n=========================\n\n*Example:* .setmenu doc')
}
handler.command = handler.help = ['setmenu']
handler.tags = ['owner']
handler.rowner = true
module.exports = handler