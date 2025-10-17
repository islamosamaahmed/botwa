let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `*• Example :* ${usedPrefix + command} *[query]*`;
  m.reply(wait);
  try {
    let search = await Scraper["Api"].ttSearch(text);
    let random = Func.random(search.videos);
    let vid = "https://tikwm.com" + random.play;
    if (menu === "button") {
      conn.sendButton(
        m.chat,
        [["Download Audio", `.ttsearch audios•${random.music}`]],
        m,
        {
          body: `*[ TIKTOK PLAY ]*
*• Title :* ${random.title}
*• Region :* ${random.region}
*• Duration :* ${random.duration} seconds
*• Total Views :* ${Func.formatNumber(random.play_count)}
*• Total Likes :* ${Func.formatNumber(random.digg_count)}
*• Author :* ${random.author.nickname}`,
          url: "https://tikwm.com" + random.cover,
        },
      );
      conn.sendMessage(m.chat, { video: { url: vid } }, { quoted: m });
    } else {
      conn.sendMessage(
        m.chat,
        {
          image: { url: "https://tikwm.com" + random.cover },
          caption: `*[ TIKTOK PLAY ]*
*• Judul :* ${random.title}
*• Region :* ${random.region}
*• Durasi :* ${random.duration} detik
*• Total Main :* ${Func.formatNumber(random.play_count)}
*• Total Suka :* ${Func.formatNumber(random.digg_count)}
*• Penulis :* ${random.author.nickname}`,
        },
        { quoted: m },
      );
      conn.sendMessage(m.chat, { video: { url: vid } }, { quoted: m });
    }
  } catch (e) {
    throw e;
  }
};
handler.help = ["ttplay", "tiktokplay"];
handler.tags = ["downloader"];
handler.command = ["ttplay", "tiktokplay"];

module.exports = handler;
