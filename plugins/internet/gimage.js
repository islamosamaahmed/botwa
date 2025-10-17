const axios = require("axios");
const {
  generateWAMessageFromContent,
  generateWAMessageContent,
  prepareWAMessageMedia,
  proto,
} = require("@whiskeysockets/baileys");

let handler = async (m, { conn, text }) => {
  if (!text) return conn.reply(m.chat, "Mau cari gambar apa?", m);
  await conn.reply(m.chat, wait, m);

  try {
    // ambil dari API google-image
    let { data } = await axios.get(
      `https://api-faa-skuarta2.vercel.app/faa/google-image?query=${encodeURIComponent(text)}`
    );

    if (!data.status || !data.result || data.result.length === 0)
      return conn.reply(m.chat, "❌ Tidak ada gambar ditemukan.", m);

    let selected = data.result.slice(0, 6); // ambil 6 gambar
    let cards = [];
    let i = 1;

    for (let url of selected) {
      let imgMsg = await createImage(url, conn);

      cards.push({
        body: proto.Message.InteractiveMessage.Body.fromObject({
          text: `Hasil ke-${i++}`,
        }),
        footer: proto.Message.InteractiveMessage.Footer.fromObject({
          text: wm,
        }),
        header: proto.Message.InteractiveMessage.Header.fromObject({
          title: "🔎 Google Image",
          hasMediaAttachment: true,
          imageMessage: imgMsg,
        }),
        nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
          buttons: [
            {
              name: "cta_url",
              buttonParamsJson: JSON.stringify({
                display_text: "Lihat Gambar",
                url,
              }),
            },
          ],
        }),
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
              carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({
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
      eror,
      m
    );
  }
};

handler.help = ["gimage <query>"];
handler.tags = ["downloader"];
handler.command = /^gimage$/i;
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