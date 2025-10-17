let handler = async (m, { conn, text, usedPrefix, command }) => {
  let res = await Func.fetchJson(
    "https://www.vilipix.com/api/v1/picture/recommand?limit=1&offset=10",
  );
  let data = await Func.random(res.data.rows);
  let cap = `*[ RANDOM WAIFU ]*
*• Title :* ${data.title}
*• Tags :* ${data.tags}
*• create at :* ${data.created_at}`;
  conn.sendButton(m.chat, [["NEXT IMAGE", usedPrefix + command]], fkontak, {
    body: cap,
    url: data.regular_url,
  });
};
handler.help = ["waifu"].map((a) => a + " *[random image]*");
handler.tags = ["anime"];
handler.command = ["waifu"];

module.exports = handler;
