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

let axios = require("axios");
let handler = async (m, { conn, isOwner, usedPrefix, command, text }) => {
  if (!text) throw `*• Example :* ${usedPrefix + command} *[question]*`;
  const requestData = {
    content: text,
    user: m.sender,
  };
  const quoted = m && (m.quoted || m);

  try {
    let response;
    if (quoted && /image/.test(quoted.mimetype || quoted.msg.mimetype)) {
      requestData.imageBuffer = await quoted.download();
    }

    response = (await axios.post("https://luminai.my.id", requestData)).data
      .result;
    m.reply(response);
  } catch (e) {
    m.reply(e.message);
  }
};
handler.help = ["luminai"].map((a) => a + " *[question]*");
handler.tags = ["ai"];
handler.command = ["luminai"];
handler.limit = true;

module.exports = handler;
