const { tebakkata } = require("@bochilteam/scraper");

let timeout = 120000;
let handler = async (m, { conn, command, usedPrefix }) => {
  conn.tebakkata = conn.tebakkata ? conn.tebakkata : {};
  let id = m.chat;
  if (id in conn.tebakkata) {
    conn.reply(
      m.chat,
      "Masih ada soal belum terjawab di chat ini",
      conn.tebakkata[id].reply,
    );
    throw false;
  }
  let json = await tebakkata();
  let caption = `*[ TEBAK KATA ]*
*• Timeout :* 60 seconds
*• Question :* ${json.soal}
*• Clue :* ${json.jawaban.replace(/[AIUEOaiueo]/g, "_")}`.trim();
  let q = await conn.reply(m.chat, caption, m);
  conn.tebakkata[id] = {
    reply: q,
    ...json,
  };
  setTimeout(() => {
    if (conn.tebakkata[id]) {
      conn.reply(
        m.chat,
        `*</> T I M E O U T </>*\n*• Jawaban :* ${json.jawaban}`,
        q,
      );
      delete conn.tebakkata[id];
    }
  }, timeout);
};
handler.before = async (m, { conn }) => {
  conn.tebakkata = conn.tebakkata ? conn.tebakkata : {};
  let id = m.chat;
  if (!m.text) return;
  if (m.isCommand) return;
  if (!conn.tebakkata[id]) return;
  let json = await conn.tebakkata[id];
  let reward = db.data.users[m.sender];
  if (m.text.toLowerCase() === json.jawaban.toLowerCase()) {
    reward.money += parseInt(10000);
    conn.sendImageAsSticker(m.chat, "https://files.catbox.moe/iltcvw.webp", m, {
      packname: "You get reward !",
      author: "+1000 money",
    });
    delete conn.tebakkata[id];
  } else {
    conn.sendImageAsSticker(
      m.chat,
      "https://telegra.ph/file/3c1b009ce6f861bd78e4e.png",
      m,
      {
        packname: "try again !",
        author: "",
      },
    );
  }
};
handler.help = ["tebakkata"];
handler.tags = ["game"];
handler.command = ["tebakkata", "tebakata"];
handler.group = false;

module.exports = handler;
