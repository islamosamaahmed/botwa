async function before(m, { isBotAdmin, isAdmin }) {
   const regex = /https:\/\/whatsapp\.com\/channel\/[A-Za-z0-9]{22}/;
   if (regex.test(m.text)) {
     if (isAdmin) return;
    if (!isBotAdmin) return;
    conn.sendMessage(m.chat, {
       text: `*[ Channel detected ]* You can't semd another channel on this group
     sorry I will delete this`
      },{ quoted: m })
    conn.sendMessage(m.chat, { delete: m.key })
  }
}

module.exports = { before }