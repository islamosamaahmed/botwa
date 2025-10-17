const axios = require("axios");
const cheerio = require("cheerio");

async function tiktokDlv2(url) {
  let response = await axios.post(
    "https://www.tikwm.com/api",
    {},
    {
      params: {
        url: url,
        count: 12,
        cursor: 0,
        web: 1,
        hd: 1,
      },
    },
  );
  return response.data;
}

async function tiktok(urls) {
  const url = "https://tiktokio.com/api/v1/tk-htmx";
  const data = new URLSearchParams({
    prefix: "dtGslxrcdcG9raW8uY29t",
    vid: urls,
  });

  const config = {
    headers: {
      "HX-Request": "true",
      "HX-Trigger": "search-btn",
      "HX-Target": "tiktok-parse-result",
      "HX-Current-URL": "https://tiktokio.com/id/",
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: data,
  };

  try {
    let { data: res } = await axios.post(url, data, config);
    let $ = cheerio.load(res);
    const urls = [];
    let media;

    const links = {
      creator: "@Fainshe",
      status: 200,
      isSlide: false,
      title: $("h2").text(),
      media: media,
    };

    $(".download-item img").each((index, element) => {
      const url = $(element).attr("src");
      urls.push(url);
      links.isSlide = true;
    });

    if (urls.length === 0) {
      media = {};
      $("div.tk-down-link").each(function (index, element) {
        const linkType = $(this).find("a").text().trim();
        const url = $(this).find("a").attr("href");

        if (linkType === "Download watermark") {
          media["watermark"] = url;
        } else if (linkType === "Download Mp3") {
          media["mp3"] = url;
        } else if (linkType === "Download without watermark") {
          media["no_wm"] = url;
        } else if (linkType === "Download without watermark (HD)") {
          media["hd"] = url;
        }
      });
    } else {
      media = urls;
    }
    links.media = media;

    return links;
  } catch (e) {
    return {
      status: 404,
      msg: e,
    };
  }
}
module.exports = tiktok;
