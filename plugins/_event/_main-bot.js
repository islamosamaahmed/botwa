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
const RegExp =
  /^(bot|Halo bot|Bot|Woi bot|woi bot|halo bot|hlo bot|hai bot|Hai bot)$/i;

async function before(m) {
  let random = pickRandom([
    "Kita Ga Kenal Gausah Sok Asik..",
    "Kenapa bg?🗿",
    "Apa jir lah",
    "Hem???",
    "Manggil manggil kenapa tuh???",
    "haa?🗿",
    "Halo sayang🗿",
    "Haii",
    "Apaan",
    "Halo cuy",
    "kenapa bubb",
    "Apa apa??",
    "Ada apa bjir",
    "🗿🗿",
    "Yooww??",
    "Yoayy??",
    "Im here!!",
    "KENAPA??!!",
    "lopyu",
  ]);
  if (RegExp.test(m.text)) return m.reply(random);
}

module.exports = {
  before,
};

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}