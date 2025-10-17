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

const { Deobfuscator } = require("deobfuscator");

module.exports = {
  code: async (m, { args, command, usedPrefix }) => {
    const usage = `*• Example :* ${usedPrefix}${command} *[input/reply code]*`;
    let text;
    if (args.length >= 1) {
      text = args.join(" ");
    } else {
      if (!m.quoted || !m.quoted?.text) return m.reply(usage);
      text = m.quoted?.text;
    }

    const message = await Decrypt(text);
    m.reply(message);
  },

  help: ["denc", "dencrypt"].map((a) => a + " *[input/reply code]*"),
  tags: ["tools"],
  command: ["denc", "dencrypt"],
};

async function Decrypt(query) {
  return new Deobfuscator().deobfuscateSource(query);
}
