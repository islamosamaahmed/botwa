const axios = require("axios");
const cheerio = require("cheerio");

async function pins(query) {
  return new Promise(async (resolve, reject) => {
    Funct.axios
      .get("https://id.pinterest.com/", {
        headers: {
          "User-Agent": global.api.useragent,
        },
      })
      .then((response) => {
        const setCookieHeader = response.headers["set-cookie"];
        const cookie = setCookieHeader.map((c) => c.split(";")[0]).join("; ");

        axios
          .get(
            `https://id.pinterest.com/search/pins/?autologin=true&q=${query}`,
            {
              headers: {
                "User-Agent": global.api.useragent,
                Cookie: cookie,
              },
            },
          )
          .then(({ data }) => {
            const $ = Funct.cheerio.load(data);
            const result = [];

            $("div > a")
              .get()
              .map((b) => {
                const link = $(b).find("img").attr("src");
                if (link) result.push(link.replace(/236/g, "736"));
              });

            resolve(result);
          })
          .catch((error) => {
            reject(error);
          });
      })
      .catch((error) => {
        reject(error);
      });
  });
}

module.exports = pins;
