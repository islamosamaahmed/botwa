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
 
let { Ezgif } = require("akiraa-wb");
let handler = async (m, { conn, command }) => {
  if (m.quoted && m.quoted.sender) m.mentionedJid.push(m.quoted.sender);
  if (!m.mentionedJid.length) m.mentionedJid.push(m.sender);
  let res = await fetch(API("https://api.waifu.pics", "/sfw/" + command, {}));
  if (!res.ok) throw `${res.status} ${res.statusText}`;
  let json = await res.json();
  if (json.url)
    conn.sendMessage(
      m.chat,
      {
        video: {
          url: await Ezgif.webp2mp4(await getBuffer(json.url)),
        },
        caption: `@${m.sender.split("@")[0]} ${command} ${m.mentionedJid
          .map((user) =>
            user === m.sender ? "Bot" : `@${user.split("@")[0]} `,
          )
          .join(", ")}`,
        gifPlayback: true,
        mentions: [...m.mentionedJid, m.sender],
      },
      {
        quoted: m,
      },
    );
  else throw json;
};
handler.help = ["hug", "pat", "wink", "bonk", "kiss", "slap", "kill"].map(
  (a) => a + " *[tag user]*",
);
handler.tags = ["fun"];
handler.command = ["hug", "pat", "wink", "bonk", "kiss", "slap", "kill"];

module.exports = handler;

async function getBuffer(url) {
  try {
    const response = await fetch(url);
    const data = await response.buffer();
    return data;
  } catch (error) {
    console.log("Terjadi kesalahan:", error);
    throw error;
  }
}
