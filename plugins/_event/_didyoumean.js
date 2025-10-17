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

const didyoumean = require('didyoumean');
const similarity = require('similarity');

let handler = m => m;

handler.before = function (m, { match, usedPrefix }) {
  if ((usedPrefix = (match[0] || '')[0])) {
    let noPrefix = m.text.replace(usedPrefix, '').trim();
    let alias = Object.values(global.plugins).filter(v => v.help && !v.disabled).map(v => v.help).flat(1);
    let mean = didyoumean(noPrefix, alias);
    let sim = similarity(noPrefix, mean);
    let similarityPercentage = parseInt(sim * 100);      

    if (mean && noPrefix.toLowerCase() !== mean.toLowerCase()) {
      let response = `• ᴀᴘᴀᴋᴀʜ ᴋᴀᴍᴜ ᴍᴇɴᴄᴀʀɪ ᴍᴇɴᴜ ʙᴇʀɪᴋᴜᴛ ɪɴɪ?\n\n◦ ɴᴀᴍᴀ ᴄᴏᴍᴍᴀɴᴅ: ➠ *${usedPrefix + mean}*\n◦ ʜᴀsɪʟ ᴋᴇᴍɪʀɪᴘᴀɴ: ➠ *${similarityPercentage}%*`;

      conn.sendMessage(m.key.remoteJid, {
        image: { url: "https://files.catbox.moe/car4nh.jpg" },
        caption: response, 
        footer: "Inikah?",
        buttons: [
          { buttonId: `${usedPrefix + mean}`, buttonText: { displayText: `Coba ${usedPrefix + mean}` }, type: 1 },
        ],
        headerType: 1,
        viewOnce: true
      }, { quoted: m });
    }
  }
}

module.exports = handler;