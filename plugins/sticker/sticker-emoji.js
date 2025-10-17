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
  help: ["emoji"].map((a) => a + " *[emoji]*"),
  tags: ["sticker"],
  command: ["emoji"],
  limit: true,
  register: true,
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
    if (!text) throw `*• Example :* ${usedPrefix + command} *[emoji]*`;
    if (!Func.getEmoji(text))
      throw `*• Example :* ${usedPrefix + command} *[emoji]*`;
    let codePoint = Array.from(text)[0]?.codePointAt(0)?.toString(16);
    let result = codePoint
      ? `https://fonts.gstatic.com/s/e/notoemoji/latest/${codePoint}/512.webp`
      : false;
    if (!result) throw "*[ x ]* Emoji Not found";
    m.reply(done, result);
  },
};

async function NotoEmoji(emoji) {
  try {
    const codePoint = Array.from(query)[0]?.codePointAt(0)?.toString(16);
    return codePoint
      ? `https://fonts.gstatic.com/s/e/notoemoji/latest/${codePoint}/512.webp`
      : null;
  } catch (error) {
    return console.error("Error getting NotoEmoji:", error), null;
  }
}
