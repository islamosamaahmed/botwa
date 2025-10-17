let handler = async (m, { conn, text, participants, usedPrefix, command }) => {
  if (!text) throw `*• Example :* ${usedPrefix + command} *[input text]*`;
  const fkontak = {
    key: {
      participants: "0@s.whatsapp.net",
      remoteJid: "status@broadcast",
      fromMe: false,
      id: "Halo",
    },
    message: {
      contactMessage: {
        vcard: `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split("@")[0]}:${m.sender.split("@")[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`,
      },
    },
    participant: "0@s.whatsapp.net",
  };
  conn.sendMessage(
    m.chat,
    { text: text, mentions: participants.map((a) => a.id || a.lid).filter(Boolean) },
    { quoted: m },
  );
};
handler.help = ["h *[Input text]*"];
handler.tags = ["group"];
handler.command = ["h"];
handler.group = true;
handler.admin = true;

module.exports = handler;
