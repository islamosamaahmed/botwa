let handler = async (m, { usedPrefix }) => {
    let id = m.chat
    conn.absen = conn.absen ? conn.absen : {}
    if (!(id in conn.absen)) return conn.reply(m.chat, `🚩 _*Tidak ada absen berlangsung digrup ini!*_\n\n*${usedPrefix}mulaiabsen* - untuk memulai absen`, m)

    // Ensure conn.absen[id] is an array and has a second element as an array
    if (!Array.isArray(conn.absen[id])) conn.absen[id] = []
    if (!Array.isArray(conn.absen[id][1])) conn.absen[id][1] = []

    let absen = conn.absen[id][1]
    const wasVote = absen.includes(m.sender)
    if (wasVote) return conn.reply(m.chat, '🚩 *Kamu sudah absen!*', m)
    absen.push(m.sender)
    m.reply(`Done!`)
    let d = new Date
    let date = d.toLocaleDateString('id', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    })
    let list = absen.map((v, i) => `│ ${i + 1}. @${v.split`@`[0]}`).join('\n')
    conn.reply(m.chat, `*「 ABSEN 」*

Tanggal: ${date}
${conn.absen[id][2]}

┌ *List absen:*
│ 
│ Total: ${absen.length}
${list}
│ 
└────

_${global.wm}_`, m, { contextInfo: { mentionedJid: absen.map(v => v) } })
}
handler.help = ['absen']
handler.tags = ['absen']
handler.command = /^(absen|hadir)$/i
handler.group = true
module.exports = handler