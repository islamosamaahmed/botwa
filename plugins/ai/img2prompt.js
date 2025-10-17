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

const Replicate = require("replicate");
const replicate = new Replicate({
  auth: "r8_SyZo9OOA7H1z7jjMlmOIuG0VKM6DIUi4RfyF5",
});

module.exports = {
  help: ["img2prompt"].map((a) => a + " *[reply/send media]*"),
  tags: ["ai"],
  command: ["img2prompt"],
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
    let q = m.quoted ? m.quoted : m;
    let mime = (q || q.msg).mimetype || "";
    if (!mime)
      throw `*• Example :* ${usedPrefix + command} *[reply/send media]*`;
    m.reply(wait);
    let url = await Uploader.Uguu(await q.download());
    let input = {
      image: url,
    };

    let output = await replicate.run(
      "methexis-inc/img2prompt:50adaf2d3ad20a6f911a8a9e3ccf777b263b8596fbd2c8fc26e8888f8a0edbb5",
      {
        input,
      },
    );
    conn.sendCopy(m.chat, [["Copy Prompt", output]], m, {
      body: `Result :
${output}`,
    });
  },
};
