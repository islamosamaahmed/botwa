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
  help: ["wuwa-sheets"].map((a) => a + " *[name chara]*"),
  tags: ["anime"],
  command: ["wuwa-sheets"],
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
    const characters = {
      sanhua: "1102",
      baizhi: "1103",
      lingyang: "1104",
      chixia: "1202",
      encore: "1203",
      mortefi: "1204",
      calcharo: "1301",
      yinlin: "1302",
      yuanwu: "1303",
      yangyang: "1402",
      aalto: "1403",
      jiyan: "1404",
      jianxin: "1405",
      "rover-spectro": "1502",
      verina: "1503",
      taoqi: "1601",
      danjin: "1602",
      "rover-havoc": "1604",
    };
    if (!text)
      return m.reply(`*• Example :* ${usedPrefix + command} *[chara name]*

*• List Characters :*
- ${Object.keys(characters).join("\n- ")}`);
    let Maximus = characters[text.toLowerCase()];
    if (Maximus) {
      let data = await fetch(
        `https://raw.githubusercontent.com/DEViantUA/wuthering-waves-elevation-materials/main/character/${Maximus}.png`,
      );
      if (!data.ok) throw new Error("Gagal mendapatkan data gambar");
      let image = await data.buffer();
      conn.sendFile(m.chat, image, null, `Wuthering Waves - Sheet`, m);
    } else {
      return m.reply(`*• Example :* ${usedPrefix + command} *[chara name]*
*• List Characters :*
${Object.keys(characters).join("\n- ")}`);
    }
  },
};
