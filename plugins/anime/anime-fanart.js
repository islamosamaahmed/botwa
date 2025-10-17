let handler = async (m, { conn, text, usedPrefix, command }) => {
  try {
    m.reply(wait);
    conn.sendButton(m.chat, [["NEXT IMAGE", usedPrefix + command]], m, {
      body: "*[ RANDOM FAN ART ]*",
      url: `https://api.lolhuman.xyz/api/random/art?apikey=${lolhuman}`,
    });
  } catch (e) {
    throw eror;
  }
};
handler.help = ["fanart"].map((a) => a + " *[random art]*");
handler.tags = ["anime"];
handler.command = ["fanart"];

module.exports = handler;
