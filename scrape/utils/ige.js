const cheerio = require("cheerio");
const axios = require("axios");

async function insta(url) {
  try {
    const a = await axios.get("https://116.203.129.92/");
    const _a = cheerio.load(a.data);
    const csrf = _a('meta[name="csrf-token"]').attr("content");

    const b = await axios.post(
      "https://116.203.129.92/getData",
      `url=${encodeURIComponent(url)}`,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          Accept: "/",
          "X-CSRF-TOKEN": csrf,
          "X-Requested-With": "XMLHttpRequest",
          cookie: a.headers["set-cookie"],
        },
      },
    );

    return b.data.error
      ? {
          status: false,
        }
      : {
          status: true,
          result: b.data,
        };
  } catch (error) {
    return {
      status: false,
    };
  }
}

module.exports = insta;
