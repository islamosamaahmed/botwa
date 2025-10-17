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
  if (!text) throw `*• Example :* ${usedPrefix + command} Akiraa`;
  m.reply(
    `*• Result from :* ${text}`,
    `https://joshweb.click/canvas/avatarv2?id=${Math.floor(Math.random() * 200)}&bgtext=${text}&signature=by+Shiroko&color=black`,
  );
};
handler.help = ["logo"].map((a) => a + " *[name logo]*");
handler.tags = ["tools"];
handler.command = ["logo"];

module.exports = handler;
