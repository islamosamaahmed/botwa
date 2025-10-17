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
  if (!text) throw `*• Example :* ${usedPrefix + command} *[query]*`;
  m.reply(wait);
  try {
    let search = await (
      await Func.fetchJson(
        `https://wow-balxzzy.vercel.app/api/pixiv?query=${text}`,
      )
    ).result;
    let random = await Func.random(search);
    let cap = `*• Caption :* ${random.title}
*• Tags :* ${random.tags.map((a) => a.name).join(", ")}`;
    conn.sendButton(
      m.chat,
      [["NEXT IMAGE", `${usedPrefix + command} ${text}`]],
      m,
      {
        body: cap,
        url: random.urls.regular,
      },
    );
  } catch (e) {
    throw e;
  }
};
handler.help = ["pixiv"].map((a) => a + " *[query]*");
handler.tags = ["internet"];
handler.command = ["pixiv"];

module.exports = handler;
