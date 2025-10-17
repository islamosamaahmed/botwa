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

module.exports = {
  help: ["lexica"].map((a) => a + " *[query]*"),
  tags: ["ai"],
  command: ["lexica"],
  code: async (
    m,
    {
      conn,
      usedPrefix,
      command,
      text,
      isOwner,
      isAdmin,
      isBotAdmin,
      isPrems,
      chatUpdate,
    },
  ) => {
    if (!text) throw `*• Example :* ${usedPrefix + command} *[query]*`;
    m.reply(wait);
    let result = await Func.fetchJson(
      "https://lexica.art/api/v1/search?q=" + text,
    );
    let data = Func.random(result.images);
    let cap = `*[ LEXICA - ART ]*
*• Id :* ${data.id}
*• Prompt :* ${data.prompt}
*• Ratio :* ${data.width} x ${data.height}
*• Seed :* ${data.seed}
*• Grid :* ${data.grid}
*• Model :* ${data.model}
*• Gallery :* ${data.gallery}`;
    m.reply(cap, data.src);
  },
};
