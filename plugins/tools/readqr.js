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

const Jimp = require("jimp");
const qrcode = require("qrcode-reader");
const handler = async (m, { conn, usedPrefix, args, command }) => {
  const q = m.quoted ? m.quoted : m;
  const mime = (q.msg || q).mimetype || "";
  if (!/image\/(jpe?g|png)/.test(mime))
    return await conn.reply(
      m.chat,
      "*• Example :* .readqr *[reply/send image]*",
      m,
    );
  const mediaData = await q?.download();
  const image = await Jimp.read(mediaData);
  try {
    const result = await readQRCode(image);
    await conn.reply(m.chat, result, m);
  } catch (error) {
    await conn.reply(m.chat, "Terjadi kesalahan dalam membaca QR code", m);
  }
};
handler.help = ["readqr", "readqrcode"].map(
  (a) => a + " *[reply/send qr code]*",
);
handler.tags = ["tools"];
handler.command = ["readqr", "readqrcode"];
module.exports = handler;

const readQRCode = (image) =>
  new Promise((resolve, reject) => {
    const qr = new qrcode();
    qr.callback = (err, value) => {
      err ? reject(err) : resolve(value.result);
    };
    qr.decode(image.bitmap);
  });
