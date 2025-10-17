let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `*• Example :* ${usedPrefix + command} *[input text]*`;

  let apiUrl = `https://api.siputzx.my.id/api/m/brat?text=${encodeURIComponent(text)}&isAnimated=false&delay=500`;
  try {
    let stiker = await conn.sendImageAsSticker(m.chat, apiUrl, m, {
      packname: packname,
      author: author,
    });
    if (!stiker) throw new Error("Gagal convert ke stiker");
  } catch (error) {
    console.error(error);
    m.reply("Terjadi kesalahan saat mengirim stiker brat.");
  }
};

handler.help = ["brat <text>"];
handler.tags = ["sticker"];
handler.command = /^brat$/i;
handler.limit = true;
handler.register = true;

module.exports = handler;