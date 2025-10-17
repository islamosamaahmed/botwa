let qrcode = require("qrcode");

let handler = async (m, { conn, text }) => {
  if (!text) throw "*• Example :* .qr *[input text]*";
  conn.sendFile(
    m.chat,
    await qrcode.toDataURL(text.slice(0, 2048), { scale: 8 }),
    "qrcode.png",
    "",
    m,
  );
};
handler.help = ["qr", "qrcode"].map((v) => v + " *[input text]*");
handler.tags = ["tools"];
handler.command = ["qr", "qrcode"];

module.exports = handler;
