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

const categories = [
  "genshin",
  "swimsuit",
  "schoolswimsuit",
  "white",
  "barefoot",
  "touhou",
  "gamecg",
  "hololive",
  "uncensored",
  "sunglasses",
  "glasses",
  "weapon",
  "shirtlift",
  "chain",
  "fingering",
  "flatchest",
  "torncloth",
  "bondage",
  "demon",
  "pantypull",
  "headdress",
  "headphone",
  "anusview",
  "shorts",
  "stockings",
  "topless",
  "beach",
  "bunnygirl",
  "bunnyear",
  "vampire",
  "nobra",
  "bikini",
  "whitehair",
  "blonde",
  "pinkhair",
  "bed",
  "ponytail",
  "nude",
  "dress",
  "underwear",
  "foxgirl",
  "uniform",
  "skirt",
  "breast",
  "twintail",
  "spreadpussy",
  "seethrough",
  "breasthold",
  "fateseries",
  "spreadlegs",
  "openshirt",
  "headband",
  "nipples",
  "erectnipples",
  "greenhair",
  "wolfgirl",
  "catgirl",
];
module.exports = {
  help: categories.map((a) => a + " *[random image]*"),
  tags: ["anime"],
  command: categories,
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
    m.reply(wait);

    let data = await Func.fetchJson(
      "https://fantox-apis.vercel.app/" + command,
    );

    conn.sendMessage(
      m.chat,
      {
        image: {
          url: data.url,
        },
        caption: `*[ RANDOM ${command.toUpperCase()} ]*`,
      },
      {
        quoted: m,
      },
    );
  },
};
