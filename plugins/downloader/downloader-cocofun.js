let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text)
    throw `*• Example :* ${usedPrefix + command} https://i.coco.fun/short/1513tui`;
  if (!Func.isUrl(text))
    throw `*• Example :* ${usedPrefix + command} https://i.coco.fun/short/1513tui`;
  m.reply(wait);
  try {
    let data = await Scraper.Download.cocofun(text);
    let cap = `*[ COCOFUN DOWNLOADER ]*
*• Title :* ${data.caption}
*• Duration :* ${data.duration}
*• Views :* ${Func.formatNumber(data.play)}
*• Like :* ${Func.formatNumber(data.like)}
*• Share :* ${Func.formatNumber(data.share)}
*• Tag  :* ${data.toxic}`;
    await conn.sendFile(m.chat, data.no_watermark, null, cap, m);
  } catch (e) {
    throw eror;
  }
};
handler.help = ["cocofun"].map((a) => a + " *[cocofun url]*");
handler.tags = ["downloader"];
handler.command = ["cocofun"];

module.exports = handler;
