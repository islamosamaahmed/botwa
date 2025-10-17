let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `*• Example :* ${usedPrefix + command} *[query]*`;
  let [keyword, data] = text.split("•");
  try {
    if (keyword === "videos") {
      if (!data) return;
      let url = "https://tikwm.com" + data;
      m.reply(done, url);
    } else if (keyword === "audios") {
      if (!data) return;
      let url = "https://tikwm.com" + data;
      m.reply(done, url);
    } else {
      let search = await (await Scraper.Api.ttSearch(text)).videos;
      conn.sendList(
        m.chat,
        "Click Here ",
        search.map((i, a) => {
          return {
            headers: `${a + 1} ${i.title}`,
            rows: [
              {
                headers: `Download videos`,
                title: "• Region : " + i.region,
                body: "• Author : " + i.author.nickname,
                description: "Get Video TikTok",
                command: usedPrefix + command + " videos•" + i.play,
              },
              {
                headers: `Download Music`,
                title: "• Name music : " + i.music_info.title,
                body: "• Author : " + i.music_info.author,
                description: "Get Music TikTok",
                command: usedPrefix + command + " audios•" + i.music,
              },
            ],
          };
        }),
        m,
        {
          body: `*• Total Videos :* ${search.length}\n*• Result from :* ${text}`,
          footer: "*® FRESS BUTTON FOR DOWNLOAD RESULT*",
          url: "https://tikwm.com" + search[0].cover,
        },
      );
    }
  } catch (e) {
    throw eror;
  }
};
handler.help = ["tiktoks", "ttsearch"].map((a) => a + " *[query]*");
handler.tags = ["downloader"];
handler.command = ["tiktoks", "ttsearch"];

module.exports = handler;
