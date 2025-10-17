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
  help: ["honkai-sheets"].map((a) => a + " *[name chara]*"),
  tags: ["anime"],
  command: ["honkai-sheets"],
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
      acheron: "1308",
      argenti: "1302",
      arlan: "1008",
      asta: "1009",
      aventurine: "1304",
      bailu: "1211",
      blackswan: "1307",
      blade: "1205",
      bronya: "1101",
      clara: "1107",
      danhengil: "1213",
      danheng: "1002",
      drratio: "1305",
      firetrailblazer: "8003",
      fuxuan: "1208",
      gallagher: "1301",
      gepard: "1104",
      guinaifen: "1210",
      hanya: "1215",
      herta: "1013",
      himeko: "1003",
      hook: "1109",
      huohuo: "1217",
      jingyuan: "1204",
      jingliu: "1212",
      kafka: "1005",
      luka: "1111",
      luocha: "1203",
      lynx: "1110",
      march7th: "1001",
      natasha: "1105",
      pela: "1106",
      physicaltrailblazer: "8001",
      qingque: "1201",
      ruanmei: "1303",
      sampo: "1108",
      seele: "1102",
      serval: "1103",
      silverwolf: "1006",
      sparkle: "1306",
      sushang: "1206",
      tingyun: "1202",
      topaz: "1112",
      welt: "1004",
      xueyi: "1214",
      yanqing: "1209",
      yukong: "1207",
    };
    if (!text)
      return m.reply(`*• Example :* ${UsedPrefix + command} *[chara name]*

*• List Characters :*
- ${Object.keys(characters).join("\n- ")}`);
    let Maximus = characters[text.toLowerCase()];
    if (Maximus) {
      let data = await fetch(
        `https://raw.githubusercontent.com/FortOfFans/HSR/main/sheet/${Maximus}.jpg`,
      );
      if (!data.ok) throw new Error("Gagal mendapatkan data gambar");
      let image = await data.buffer();
      conn.sendFile(m.chat, image, null, `Honkai: Star Rail - Sheet`, m);
    } else {
      return m.reply(`*• Example :* ${usedPrefix + command} *[chara name]*
*• List Characters :*
${Object.keys(characters).join("\n- ")}`);
    }
  },
};
