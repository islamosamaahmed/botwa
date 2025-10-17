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
  help: ["cariteman"].map((a) => a + " *[random tag]*"),
  tags: ["fun"],
  command: ["cariteman"],
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
    let user = db.data.users;
    let random = Func.random(Object.keys(user));
    let cap = `*[ RANDOM FRIENDS ]*
*• Name :* ${await conn.getName(random)}
*• Tags :* @${random.split("@")[0]}

Click button for send message to random friends !`;
    conn.sendUrl(
      m.chat,
      [
        [
          "Chat now",
          `https://wa.me/${random.split("@")[0]}?text=you+wanna+be+to+my+friend?`,
        ],
      ],
      m,
      {
        body: cap,
      },
    );
  },
};
