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
  help: ["ongoing"].map((a) => a + " *[get latest anime]*"),
  tags: ["anime"],
  command: ["ongoing"],
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
    let data = await (
      await Func.fetchJson("https://api.jikan.moe/v4/seasons/now?filter=tv")
    ).data;
    let arr = [];
    for (let a of data) {
      arr.push([
        `*• Title :* ${a.title}
*• Genre :* *[ ${a.genres.map((a) => a.name).join(", ")} ]*
*• Type :* ${a.type}
*• Season :* ${a.season} *[ ${a.year} ]*
*• Source :* ${a.source}
*• Total episode :* ${a.episodes}
*• Status :* ${a.status}
*• Duration :* ${a.duration}
*• Studio :* *[ ${a.studios.map((a) => a.name).join(", ")} ]*
*• Rating :* ${a.rating}
*• Score :* ${a.score}/10.0
*• Popularity :* ${a.popularity}`,
        null,
        a.images["jpg"].large_image_url,
        [],
        null,
        [["Watch Trailer !", a.trailer.url]],
      ]);
    }
    conn.sendCarousel(m.chat, arr, m, {
      body: `*+ A N I M E - O N G O I N G*

List Anime yang rilis pada musim *[ ${data[0].season} ${data[0].year} ]*`,
    });
  },
};
