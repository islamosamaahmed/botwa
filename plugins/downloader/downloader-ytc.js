let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `*Example:* ${usedPrefix + command} *[channel name]*`;
  m.reply(wait);
  try {
    let array = [];
    let data = await (
      await fetch(
        `https://api.lolhuman.xyz/api/ytchannel?apikey=${lolhuman}&query=${text}`,
      )
    ).json();
    for (let i of data.result) {
      array.push([
        `*[ CHANNEL INFO ]*
*• Name:* ${i.channel_name}
*• ID:* ${i.channel_id}
*• About:* ${i.channel_about}
*• Created:* ${await tanggal(i.channel_created)}`,
        null,
        i.channel_picture["medium"].url,
        [],
        null,
        [["YOUTUBE URL", `https://www.youtube.com/channel/${i.channel_id}`]],
      ]);
    }
    conn.sendCarousel(m.chat, array, m, {
      body: `*[ SEARCH RESULTS ]*
*• Results from:* ${text}`,
    });
  } catch (e) {
    m.reply(`*Error:* ${e.message}`);
  }
};
handler.help = ["ytc", "ytstalk"].map((a) => a + " *[channel name]*");
handler.tags = ["downloader"];
handler.command = ["ytc", "ytchannel", "ytstalk"];

module.exports = handler;
