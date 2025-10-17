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

let handler = async (m) => {
  let totalreg = Object.keys(global.db.data.users).length;
  let rtotalreg = Object.values(global.db.data.users).filter(
    (user) => user.registered == true,
  ).length;
  m.reply(`• Total User Today : *[ ${rtotalreg}/${totalreg} ]*`);
};
handler.help = ["database", "user"].map((a) => a + " *[check total user]*");
handler.tags = ["info"];
handler.command = ["user", "database"];

module.exports = handler;
