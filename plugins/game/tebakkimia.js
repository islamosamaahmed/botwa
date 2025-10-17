const { tebakkimia } = require("@bochilteam/scraper");

let timeout = 120000;
let handler = async (m, { conn, command, usedPrefix }) => {
  conn.tebakkimia = conn.tebakkimia ? conn.tebakkimia : {};
  let id = m.chat;
  if (id in conn.tebakkimia) {
    conn.reply(
      m.chat,
      "Masih ada soal belum terjawab di chat ini",
      conn.tebakkimia[id].reply,
    );
    throw false;
  }
  let json = await tebakkimia();
  let caption = `*[ TEBAK KIMIA ]*
*• Timeout :* 60 seconds
*• Symbol material :* ${json.lambang}
*• Clue :* ${json.unsur.replace(/[AIUEOaiueo]/g, "_")}`.trim();
  let q = await conn.reply(m.chat, caption, m);
  conn.tebakkimia[id] = {
    reply: q,
    ...json,
  };
  setTimeout(() => {
    if (conn.tebakkimia[id]) {
      conn.reply(
        m.chat,
        `*</> T I M E O U T </>*\n*• Jawaban :* ${json.unsur}`,
        q,
      );
      delete conn.tebakkimia[id];
    }
  }, timeout);
};
handler.before = async (m, { conn }) => {
  conn.tebakkimia = conn.tebakkimia ? conn.tebakkimia : {};
  let id = m.chat;
  if (!m.text) return;
  if (m.isCommand) return;
  if (!conn.tebakkimia[id]) return;
  let json = await conn.tebakkimia[id];
  let reward = db.data.users[m.sender];
  if (m.text.toLowerCase() === json.unsur.toLowerCase()) {
    reward.money += parseInt(10000);
    conn.sendImageAsSticker(m.chat, "https://files.catbox.moe/iltcvw.webp", m, {
      packname: "You get reward !",
      author: "+1000 money",
    });
    delete conn.tebakkimia[id];
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
handler.help = ["tebakkimia"];
handler.tags = ["game"];
handler.command = ["tebakkimia"];
handler.group = false;

module.exports = handler;
