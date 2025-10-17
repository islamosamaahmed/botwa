/** !! THIS CODE GENERATE BY RODOTZBOT !! **/

let handler = async (m, { conn, args, participants, text, usedPrefix, command }) => {
  switch (command) {
case 'giveaway': {
      let member = participants.map(u => u.id).filter(v => v !== conn.user.jid)
      let org = member[Math.floor(Math.random() * member.length)];
      conn.sendMessage(m.chat, { text: `selamat telah mendapatkan ${command} selamat kepada @${org.split('@')[0]}`, mentions: [org] }, { quoted: m })
      break;
    }
  }
};
handler.tags = ['owner']
handler.help = handler.command = ['giveaway']
handler.group = true
handler.owner = true
module.exports = handler