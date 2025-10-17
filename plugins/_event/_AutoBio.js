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

let fs = require("fs");

var danz = (m) => m;
danz.all = async function (m) {
  var setting = db.data.settings;
  var _uptime = process.uptime() * 1000;
  var uptime = clockString(_uptime);
  await this.setBio(
    `ShirokoFK | Runtime: ${uptime} |  Mode: ${global.opts["self"] ? "Private" : opts["gconly"] ? "Group" : "Publik"} | Version: ${version}`,
  ).catch((_) => _);
  setting.status = new Date() * 1;
};

module.exports = danz;

function clockString(ms) {
  var h = isNaN(ms) ? "--" : Math.floor(ms / 3600000);
  var m = isNaN(ms) ? "--" : Math.floor(ms / 60000) % 60;
  var s = isNaN(ms) ? "--" : Math.floor(ms / 1000) % 60;
  return [h, m, s].map((v) => v.toString().padStart(2, "0")).join(":");
}
