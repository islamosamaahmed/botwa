const baileys = require("@whiskeysockets/baileys");
const yts = require('yt-search');

const handler = async (m, { conn, command, text, usedPrefix }) => {
  if (!text) {
    throw `Contoh penggunaan: ${usedPrefix + command} cupid`;
  }

  m.reply(wait);

  try {
    const results = await yts(text);
    const firstResult = results.all[0];
    if (!firstResult) throw "Video tidak ditemukan!";

    const { title, thumbnail, timestamp, views, ago, url } = firstResult;

    const teks = `
*${title}*

*Durasi:* ${timestamp}
*Views:* ${views}
*Upload:* ${ago}
*Link:* ${url}
    `;
    
    conn.sendMessage(m.chat, {
      image: { url: thumbnail }, // Thumbnail video
      caption: teks, // Deskripsi video
      footer: wm, // Footer atau watermark
      buttons: [
        {
          buttonId: `.ytmp3 ${url}`,
          buttonText: { 
            displayText: 'Download Audio' 
          }
        },
        {
          buttonId: `.ymp4 ${url}`,
          buttonText: {
            displayText: "Download Video"
          }
        }
      ],
      viewOnce: true,
      headerType: 4,
    }, { quoted: m });
      
  } catch (err) {
    console.error(err);
    const errorMsg = "Maaf, terjadi kesalahan.";
    await conn.sendMessage(m.chat, { text: errorMsg }, { quoted: m });
  }
};

handler.help = ["play"];
handler.tags = ["downloader"];
handler.command = /^(play)$/i;
handler.limit = true;

module.exports = handler;