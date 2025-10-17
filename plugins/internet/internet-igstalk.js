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
  help: ["igstalk"].map((a) => a + " *[username]*"),
  tags: ["internet"],
  command: ["igstalk"],
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
    if (!text) throw `*• Example :* ${usedPrefix + command} *[username]*`;
    m.reply(wait);
    let req = await axios.get(
      `https://akhirpetang.vercel.app/api/ig?username=${encodeURIComponent(text)}`,
      {
        headers: {
          Authorization: "Bearer akhirpetang-09853773678853385327Ab63",
        },
      },
    );
    let info = req.data;
    let cap = `*[ IG - STALK ]*
*• Username :* ${info.username}
*• FullName :* ${info.nama_lengkap}
*• Followers :* ${info.jumlah_pengikut}
*• Following :* ${info.jumlah_diikuti}
*• Total Post :* ${info.jumlah_postingan}

${info.biography}`;
    await conn.sendUrl(
      m.chat,
      [["Url Account", "https://www.instagram.com/@" + info.username]],
      m,
      {
        body: cap,
        url: info.foto_profil,
      },
    );
  },
};
