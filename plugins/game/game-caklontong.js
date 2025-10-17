const { caklontong } = require("@bochilteam/scraper");

let timeout = 120000;
let handler = async (m, { conn, command, usedPrefix }) => {
  conn.caklontong = conn.caklontong ? conn.caklontong : {};
  let id = m.chat;
  if (id in conn.caklontong) {
    conn.reply(
      m.chat,
      "Masih ada soal belum terjawab di chat ini",
      conn.caklontong[id].reply,
    );
    throw false;
  }
  let json = await caklontong();
  let caption = `*[ CAK LONTONG ]*
*• Timeout :* 60 seconds
*• Question :* ${json.soal}
*• Clue :* ${json.jawaban.replace(/[AIUEOaiueo]/g, "_")}`.trim();
  let q = await conn.reply(m.chat, caption, m);
  conn.caklontong[id] = {
    reply: q,
    ...json,
  };
  setTimeout(() => {
    if (conn.caklontong[id]) {
      conn.reply(
        m.chat,
        `*</> T I M E O U T </>*\n*• Jawaban :* ${json.jawaban}`,
        q,
      );
      delete conn.caklontong[id];
    }
  }, timeout);
};
handler.before = async (m, { conn }) => {
  conn.caklontong = conn.caklontong ? conn.caklontong : {};
  let id = m.chat;
  if (!m.text) return;
  if (m.isCommand) return;
  if (!conn.caklontong[id]) return;
  let json = await conn.caklontong[id];
  let reward = db.data.users[m.sender];
  if (m.text.toLowerCase() === json.jawaban.toLowerCase()) {
    reward.money += parseInt(10000);
    conn.sendImageAsSticker(m.chat, "https://files.catbox.moe/iltcvw.webp", m, {
      packname: "You get reward !",
      author: "+1000 money",
    });
    delete conn.caklontong[id];
  } else {
    conn.sendMessage(m.chat, {
      react: {
        text: "❌",
        key: m.key,
      },
    });
  }
};
handler.help = ["caklontong"];
handler.tags = ["game"];
handler.command = ["caklontong"];
handler.group = false;

module.exports = handler;
