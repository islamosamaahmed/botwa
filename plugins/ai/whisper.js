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
  let q = m.quoted;
  if (!q) throw `*• Example :* ${usedPrefix + command} *[reply audio]*`;
  if (!/audio/.test(q.mimetype))
    throw `*• Example :* ${usedPrefix + command} *[reply audio]*`;
  m.reply(wait);
  try {
    let url = await Uploader.Uguu(await q.download());
    let { data } = await axios.post(
      "https://onesytex-rest-api-ca434649bcac.herokuapp.com/api/audio_whisper",
      {
        audioUrl: url,
      },
    );
    m.reply(data.result.output.text);
  } catch (e) {
    throw e;
  }
};
handler.help = ["whisper"].map((a) => a + " *[reply audio]*");
handler.tags = ["ai"];
handler.command = ["whisper"];

module.exports = handler;
