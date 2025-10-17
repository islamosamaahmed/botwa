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
  help: ["jadianime", "toanime"].map((a) => a + " *[reply/send media]*"),
  tags: ["tools"],
  command: ["jadianime", "toanime"],
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
    let q = m.quoted ? m.quoted : m;
    let mime = (q.msg || q).mimetype || "";
    if (!mime)
      throw `*• Example :* ${usedPrefix + command} *[reply/send media]*`;
    m.reply(wait);
    let buffer = await q.download();
    let url = await require(process.cwd() + "/lib/uploader.js").catbox(buffer);
    m.reply(done, "https://api-faa-skuarta2.vercel.app/faa/toanime?url=" + url);
  },
};
