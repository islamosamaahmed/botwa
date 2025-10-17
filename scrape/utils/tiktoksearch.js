const axios = require("axios");
const cheerio = require("cheerio");
const { JSDOM } = require("jsdom");

async function tiktokSearch(query) {
  try {
    const json = {
      keywords: query,
      count: 15,
      cursor: 0,
      web: 1,
      hd: 1,
    };

    const { data } = await axios.post(
      "https://tikwm.com/api/feed/search",
      json,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          Accept: "application/json, text/javascript, /; q=0.01",
          "X-Requested-With": "XMLHttpRequest",
        },
      },
    );

    const random =
      data.data.videos[Math.floor(Math.random() * data.data.videos.length)];

    const result = {
      status: 200,
      creator: "PrinzXz Inc. || Px - Team",
      result: {
        id: random.id,
        title: random.title,
        author: {
          name: random.author.nickname,
          username: random.author.unique_id,
        },
        info: {
          play_count: random.play_count,
          like_count: random.digg_count,
          comment_count: random.comment_count,
          share_count: random.share_count,
        },
        music_info: random.music_info,
        media: {
          nowm: "https://tikwm.com" + random.play,
          wm: "https://tikwm.com" + random.wmplay,
          music: "https://tikwm.com" + random.music,
        },
      },
    };

    return result;
  } catch (e) {
    return e;
  }
}

module.exports = tiktokSearch;
