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
  if (!text) throw `*• Example :* ${usedPrefix + command} *[question]*`;
  m.reply(wait);
  try {
    let response = await Func.fetchJson(
      "https://itzpire.com/ai/blackbox-ai?q=" + text,
    );
    m.reply(response.result);
  } catch (e) {
    throw eror;
  }
};
handler.help = ["bb", "blackbox", "kotakhitam", "blekbok"].map(
  (a) => a + " *[question]*",
);
handler.tags = ["ai"];
handler.command = ["bb", "blackbox", "kotakhitam", "blekbok"];

module.exports = handler;
