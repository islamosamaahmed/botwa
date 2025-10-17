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

const JavaScriptObfuscator = require("javascript-obfuscator");

let handler = async (m, { text, usedPrefix, command }) => {
  if (!m.quoted) throw `*• Example :* ${usedPrefix + command} *[reply code]*`;
  const message = await Encrypt(m.quoted.text);
  return m.reply(message);
};
handler.help = ["encrypt", "enc"].map((a) => a + " *[reply code]*");
handler.tags = ["tools"];
handler.command = ["enc", "encrypt"];
handler.limit = true;
module.exports = handler;

async function Encrypt(query) {
  const obfuscationResult = JavaScriptObfuscator.obfuscate(query);
  let encryptedCode = obfuscationResult.getObfuscatedCode();
  return encryptedCode;
}

async function Decrypt(encryptedCode) {
  const decryptedCode =
    JavaScriptObfuscator.obfuscate(encryptedCode).getObfuscatedCode();

  return decryptedCode;
}
