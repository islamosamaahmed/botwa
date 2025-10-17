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
async function before(m, { isAdmin, isBotAdmin }) {
  if (m.mtype === "imageMessage") {
    let data = await query(await m.download());
    let result = data[0];
    if (result.label === "nsfw") {
      if (!isBotAdmin) return;
      conn.reply(
        m.chat,
        `*[ Nsfw Image Detected ]* sorry your image has been detected NSFW content.
*• Score :* ${result.score}`,
        m,
      );
      conn.sendMessage(m.chat, {
        delete: {
          ...m.key,
        },
      });
    }
  }
}
module.exports = {
  before,
};

async function query(data) {
  const response = await fetch(
    "https://api-inference.huggingface.co/models/Falconsai/nsfw_image_detection",
    {
      headers: {
        Authorization: "Bearer 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",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: data,
    },
  );
  const result = response.json();
  return result;
}
