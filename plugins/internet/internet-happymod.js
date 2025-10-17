module.exports = {
  help: ["happymod"].map((a) => a + " *[query]*"),
  tags: ["internet"],
  command: ["happymod"],
  code: async (
    m,
    {
      conn,
      usedPrefix,
      command,
      text,
      isOwner,
      isAdmin,
      isBotAdmin,
      Ekspresi,
      chatUpdate,
    },
  ) => {
    if (!text) throw `*• Example :* ${usedPrefix + command} *[query]*`;
    let data = await (await happymod(text)).hsl;
    let json = data
      .map(
        (a, i) => `*• No :* ${i + 1}
*• Name :* ${a.name}
*• Version :* ${a.version}
*• Download :* ${a.url}`,
      )
      .join("\n\n");
    conn.reply(m.chat, "*± H A P P Y - M O D*\n\n" + json, fkontak);
  },
};

/**
 * Amirul Dev
 * Happymod Search
 **/

async function happymod(query) {
  try {
    const res = await axios.get(
      "https://unduh.happymod.com/search.html?q=" + query,
    );
    const html = res.data;
    const $ = cheerio.load(html);
    const hsl = [];
    $("article.flex-item").each((index, element) => {
      const appName = $(element)
        .find("h2.has-normal-font-size.no-margin.no-padding.truncate")
        .text()
        .trim();
      const appVersion = $(element)
        .find("div.has-small-font-size.truncate")
        .first()
        .text()
        .trim();
      const appUrl = $(element).find("a.app.clickable").attr("href");

      if (appName && appVersion && appUrl) {
        hsl.push({
          name: appName,
          version: appVersion,
          url: "https://unduh.happymod.com/" + appUrl,
        });
      }
    });
    return {
      status: true,
      dev: "amirul.dev",
      hsl,
    };
  } catch (error) {
    return {
      status: false,
      dev: "amirul.dev",
      message: "permintaan tidak dapat diproses!!",
    };
  }
}
