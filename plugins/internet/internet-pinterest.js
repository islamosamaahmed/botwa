/*──────────────────────────────────────────────────────────
 *  🧩 NeoBot - Powered by NeoShiroko Labs
 *──────────────────────────────────────────────────────────
 *  🌐 Website  : https://www.neolabsofficial.my.id
 *  💬 Kontak : https://zass.cloud
 *  📺 YouTube  : https://www.youtube.com/@zassci_desu
 *  📡 Panel Murah   : pteroku-desu.zass.cloud
 *
 *  [ ! ] Jangan Hapus Wm Bggg
 *──────────── © 2025 Zass Onee. All rights reserved.───────────────────
 */

const axios = require("axios");
const {
  generateWAMessageFromContent,
  generateWAMessageContent,
  prepareWAMessageMedia,
  proto,
} = require("@whiskeysockets/baileys");

let handler = async (m, { conn, text }) => {
  if (!text) return conn.reply(m.chat, "Mau cari apa?", m);
  await conn.reply(m.chat, "Bentar yah aku cariin dulu 🙂", m);

  try {
    // ambil dari API RyuuDev
    let { data } = await axios.get(
      `https://api.ryuu-dev.offc.my.id/search/pinterest?query=${encodeURIComponent(
        text
      )}`
    );

    if (!data.status || !data.result || data.result.length === 0)
      return conn.reply(m.chat, "❌ Tidak ada gambar ditemukan.", m);

    let selected = data.result.slice(0, 6); // ambil 6 gambar
    let cards = [];
    let i = 1;

    for (let item of selected) {
      let imgMsg = await createImage(item.image, conn);

      cards.push({
        body: proto.Message.InteractiveMessage.Body.fromObject({
          text: `Hasil ke-${i++}\n${item.caption || ""}`,
        }),
        footer: proto.Message.InteractiveMessage.Footer.fromObject({
          text: `By: ${item.fullname || item.upload_by}`,
        }),
        header: proto.Message.InteractiveMessage.Header.fromObject({
          title: "</> Pinterest </>",
          hasMediaAttachment: true,
          imageMessage: imgMsg,
        }),
        nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject(
          {
            buttons: [
              {
                name: "cta_url",
                buttonParamsJson: JSON.stringify({
                  display_text: "Lihat di Pinterest",
                  url: item.source || item.image,
                }),
              },
            ],
          }
        ),
      });
    }

    const bot = generateWAMessageFromContent(
      m.chat,
      {
        viewOnceMessage: {
          message: {
            messageContextInfo: {
              deviceListMetadata: {},
              deviceListMetadataVersion: 2,
            },
            interactiveMessage: proto.Message.InteractiveMessage.fromObject({
              body: proto.Message.InteractiveMessage.Body.create({
                text: `🔎 Berikut hasil pencarian gambar untuk *${text}*`,
              }),
              footer: proto.Message.InteractiveMessage.Footer.create({
                text: wm,
              }),
              header: proto.Message.InteractiveMessage.Header.create({
                hasMediaAttachment: false,
              }),
              carouselMessage:
                proto.Message.InteractiveMessage.CarouselMessage.fromObject({
                  cards,
                }),
            }),
          },
        },
      },
      {}
    );

    await conn.relayMessage(m.chat, bot.message, { messageId: bot.key.id });
  } catch (err) {
    console.error(err);
    conn.reply(
      m.chat,
      "⚠️ Error saat mengambil gambar dari Pinterest. Coba lagi nanti yah~",
      m
    );
  }
};

handler.help = ["pinterest <query>", "pin <query>"];
handler.tags = ["downloader"];
handler.command = /^(pinterest|pin)$/i;
handler.limit = true;
handler.register = true;

module.exports = handler;

async function createImage(url, conn) {
  const { imageMessage } = await generateWAMessageContent(
    { image: { url } },
    { upload: conn.waUploadToServer }
  );
  return imageMessage;
}