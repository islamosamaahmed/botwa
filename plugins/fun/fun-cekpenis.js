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
  help: ["cekpenis"].map((a) => a + " *[name]*"),
  tags: ["fun"],
  command: ["cekpenis"],
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
    if (!text) throw `*• Example :* ${usedPrefix + command} *[name]*`;
    let rand = Math.floor(Math.random() * 10);
    let name = text;
    let warna = ["hitam", "putih", "coklat", "pelangi"];
    let txt = "";
    if (rand == 0) return;
    if (rand > 5) {
      txt = "Alamak Panjang nye 😋";
    } else if (rand < 5) {
      txt = "Ah Normal ini mah";
    }
    if (rand < 3) {
      txt = "Kecil amat 😂";
    }
    m.reply(`┌─⭓「 *CEK PENIS*  」
│ *• Nama :* ${name}
│ *• Ukuran :* ${rand.toFixed(1)} cm
│ *• Warna :* ${warna[Math.floor(Math.random() * warna.length)]}
│ *• Pesan :* ${txt}
└───────────────⭓`);
  },
};
