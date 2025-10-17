const { susunkata } = require("@bochilteam/scraper");

let timeout = 120000;

let handler = async (m, { conn, command, usedPrefix }) => {
  conn.susunkata = conn.susunkata ? conn.susunkata : {};
  let id = m.sender;

  if (id in conn.susunkata) {
    conn.reply(
      m.chat,
      "*Masih ada soal belum terjawab di chat ini*",
      conn.susunkata[id].reply,
    );
    throw false;
  }

  let json = await susunkata();
  let caption = `*[ SUSUN KATA ]*
*• Timeout :* 60 seconds
*• Question :* ${json.soal} *[ ${json.tipe} ]*
*• Clue :* ${json.jawaban.replace(/[AIUEOaiueo]/g, "_")}`.trim();

  let q = await conn.reply(m.chat, caption, m);
  conn.susunkata[id] = {
    reply: q,
    ...json,
  };
};

handler.before = async (m, { conn }) => {
  conn.susunkata = conn.susunkata ? conn.susunkata : {};
  let id = m.sender;

  if (!m.text) return;
  if (m.isCommand) return;
  if (!conn.susunkata[id]) return;

  let json = await conn.susunkata[id];
  let reward = db.data.users[m.sender];

  if (m.text.toLowerCase() === json.jawaban.toLowerCase()) {
    reward.money += parseInt(10000);
    conn.sendImageAsSticker(m.chat, "https://files.catbox.moe/iltcvw.webp", m, {
      packname: "You get reward !",
      author: "+1000 money",
    });
    delete conn.susunkata[id];
  } else {
    conn.sendMessage(m.chat, {
      react: {
        text: "❌",
        key: m.key,
      },
    });
  }

  setTimeout(() => {
    if (conn.susunkata[id]) {
      conn.reply(
        m.chat,
        `*</> T I M E O U T </>*\n*• Jawaban :* ${json.jawaban}`,
        json.reply,
      );
      delete conn.susunkata[id];
    }
  }, timeout);
};

handler.help = ["susunkata"];
handler.tags = ["game"];
handler.command = ["susunkata"];
handler.group = true;

module.exports = handler;
