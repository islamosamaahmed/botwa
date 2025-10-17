/** !! THIS CODE GENERATE BY ZHUBOT !! **/

let handler = async (m, { conn, usedPrefix }) => {
    let id = m.chat
    conn.event = conn.event ? conn.event : {}
    if (!(id in conn.event)) throw `_*Tidak ada EVENT berlangsung digrup ini!*_\n\n*${usedPrefix}mulaievent* - untuk memulai event`

    let d = new Date
    let date = d.toLocaleDateString('id', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    })
    let absen = conn.event[id][1]
    let list = absen.map((v, i) => `│ ${i + 1}. @${v.split`@`[0]}`).join('\n')
    conn.reply(m.chat, `*「 LIST MEMBER 」*

Tanggal: ${date}
${conn.event[id][2]}

┌ *Yang sudah ikut:*
│ 
│ Total: ${absen.length}
${list}
│ 
└────

_${global.set.footer}_`, m, { contextInfo: { mentionedJid: absen } })
}
handler.help = ['event']
handler.tags = ['group']
handler.command = /^event$/i
handler.owner = true
module.exports = handler