let fs = require('fs')
let handler = async (m, { conn }) => {
let name = conn.getName(m.sender)
let numberowner = global.numberowner
let anu = `Hallo Kak 👋 ${name}
Silahkan donasi agar bot tetap aktif

╭─『  Donasi • E-money  』
├ Dana : *085298027445*
├ Gopay : *085298027445*
├ *Qris : https://zass.cloud/donasi*
╰───

Berapapun donasi kalian akan sangat berarti

☞ Info selengkapnya : wa.me/${nomorown}

*❒ Keuntungan Donasi Bagi Bot* 
☞ Buat sewa VPS supaya bot bisa aktif 24 jam
☞ Buat beli limit apikey fitur
☞ Supaya bot terus update & aktif

*❒ Keuntungan Donasi Bagi Para Donasi*
☞ Bisa dapat exp
☞ Bisa dapat limit
☞ Bisa dapat money

*[ Developer Shiroko bot ]*`
  await conn.sendMessage(m.chat, {
text: anu,
contextInfo: {
externalAdReply: {  
title: 'S U P P O R T',
body: namebot,
thumbnailUrl: 'https://telegra.ph/file/a631996f92016ae1b2f37.png',
sourceUrl: '',
mediaType: 1,
renderLargerThumbnail: true
}}}, { quoted: m})
}
handler.help = ['donasi', 'donate']
handler.tags = ['xp', 'info']
handler.command = /^(donasi|donate)$/i

module.exports = handler