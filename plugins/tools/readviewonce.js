const { Lib } = require("akiraa-wb");

let handler = async (m, { conn, usedPrefix, command }) => {
  let q = m.quoted ? m.quoted : m;
  let mime = (q.msg || q).mimetype || "";

  if (!mime) throw `*• Example :* ${usedPrefix + command} *[reply media]*`;

  // 🖼️ Sticker → Image
  if (/sticker/.test(mime)) {
    let img = await q.download();
    await conn.sendMessage(
      m.chat,
      {
        image: img,
        caption: "✅ Konversi stiker ke gambar",
      },
      { quoted: m }
    );
    return;
  }

  // 📷 Image → Kirim ulang
  if (/image/.test(mime)) {
    let img = await q.download();
    await conn.sendMessage(
      m.chat,
      {
        image: img,
        caption: "🖼️ Ini gambarnya kak~",
      },
      { quoted: m }
    );
    return;
  }

  // 🎥 Video → Kirim ulang
  if (/video/.test(mime)) {
    let vid = await q.download();
    await conn.sendMessage(
      m.chat,
      {
        video: vid,
        caption: "🎥 Ini videonya kak~",
      },
      { quoted: m }
    );
    return;
  }

  // 🎙️ Audio/Video → Konversi ke VN
  if (/audio|video/.test(mime)) {
    let media = await q.download();
    let audio = await Lib.converter.toPTT(media, "mp4");
    if (!audio.data) throw `*❌ Gagal konversi ke VN*`;
    await conn.sendFile(m.chat, audio.data, "file.opus", "🎙️ Konversi ke VN", m, 1, {
      mimetype: "audio/ogg; codecs=opus",
      ptt: true,
    });
    return;
  }

  throw `❌ Format tidak didukung untuk perintah *${command}*`;
};

handler.help = ['rvo', 'readviewonce', 'read', 'liat', 'readvo'];
handler.tags = ["tools"];
handler.command = ['rvo', 'readviewonce', 'read', 'liat', 'readvo'];

module.exports = handler;