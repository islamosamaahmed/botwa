/*═══════════════════════════════════════════════════════
 *  ⌬  YT NeoShiroko Labs
 *═══════════════════════════════════════════════════════
 *  🌐  Website     : https://www.neolabsofficial.my.id
 *  ⌨︎  Developer   : https://zass.cloud
 *  ▶︎  YouTube     : https://www.youtube.com/@zassci_desu
 *  ⚙︎  Panel Murah : pteroku-desu.zass.cloud
 *
 *  ⚠︎  Mohon untuk tidak menghapus watermark ini
 *═══════════════════ © 2025 Zass Desuta ─════════════════════
 */

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `*• Example :* ${usedPrefix + command} *[input text]*`;
  let chats = Object.keys(db.data.users);
  conn.reply(m.chat, `Sending Broadcast to *[ ${chats.length} ]*`, m);
  let q = m.quoted ? m.quoted : m;
  let mime = q.mimetype || "";
  for (let id of chats) {
    if (mime) {
      await sleep(20 * 1000);
      await conn.sendMessage(id, {
        forward: q.fakeObj,
      });
    } else {
      await sleep(20 * 1000);
      conn.sendButton(
        id,
        [
          {
            texf: "",
          },
        ],
        null,
        {
          body: `*${text}`,
          footer: done,
        },
      );
    }
  }
};
handler.help = ["broadcast", "bc"].map((v) => v + " *[input text]*");
handler.tags = ["owner"];
handler.command = ["broadcast", "bc"];
handler.owner = true;

module.exports = handler;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
