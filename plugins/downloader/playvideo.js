
let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return m.reply(`*• Example :* ${usedPrefix + command} *[query]*`)
  
  m.reply("🔍 Mencari video...");

  try {
    let response = await fetch(`https://ochinpo-helper.hf.space/yt?query=${text}`);
    let json = await response.json();

    if (!json.success) throw new Error('Failed to fetch video info');
    
    let { video, title, duration, views, author, download } = json.result;
    let caption = `*乂 P L A Y - V I D E O*\n\n` +
                  `   *◦ Title :* ${title}\n` +
                  `   *◦ Duration :* ${duration.timestamp}\n` +
                  `   *◦ Views :* ${views}\n` +
                  `   *◦ Author :* ${author.name}`;

    await conn.sendFile(m.chat, download.video, `${title}.mp4`, caption, m);

  } catch (e) {
    console.error(e);
    m.reply("Terjadi eror");
  }
};

handler.help = ['playvideo'].map(v => v + ' *query*');
handler.tags = ['downloader'];
handler.command = /^(playvid|playvideo)$/i;

module.exports = handler;