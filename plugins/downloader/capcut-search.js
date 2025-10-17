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
  help: ["capcutsearch", "ccs"].map((a) => a + " *[query]*"),
  tags: ["downloader"],
  command: ["capcutsearch", "ccs"],
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
    conn.capcut = conn.capcut ? conn.capcut : {};
    if (!text) throw `*• Example :* ${usedPrefix + command} *[query]*`;
    m.reply(wait);
    let data = await Func.fetchJson(
      "https://hoanghao.me/api/capcut/search?keyword=" + text,
    );
    let result = data.data.video_templates
      .map(
        (a, i) => `*• Number :* ${i + 1}
*• Title :* ${a.title}
*• Duration :* ${a.duration}
*• Like Count :* ${a.like_count}
*• Play Count :* ${a.play_amount}
*• Thumbnail :* ${a.cover_url}`,
      )
      .join("\n\n");
    let cap = `Balas pesan ini dengan mengetik angka *1 -> ${data.data.video_templates.length}* untuk mendownload video capcut

${result}`;
    m.reply(cap);
    conn.capcut[m.sender] = data.data.video_templates;
  },
  before: async (m) => {
    conn.capcut = conn.capcut ? conn.capcut : {};
    if (!conn.capcut[m.sender]) return;
    if (!m.text) return;
    if (isNaN(m.text)) return;
    let data = conn.capcut[m.sender];
    if (parseInt(data) > data.length) return m.reply("video tidak di temukan!");
    let pilihan = data[m.text - 1];
    if (pilihan.id) {
      let cap = `*[ CAPCUT DOWNLOADER ]*
*• Title :* ${pilihan.title}
*• Like count :* ${pilihan.like_count}
*• Favorite count :* ${pilihan.favorite_count}
*• View count :* ${pilihan.play_amount}
*• Short Title :* ${pilihan.short_title}`;
      m.reply(cap, pilihan.video_url);
      delete data;
    } else {
      m.reply("Video tidak ditemukan");
      delete data;
    }
  },
};
