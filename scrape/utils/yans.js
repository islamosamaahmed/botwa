const cheerio = require("cheerio");

async function yans(query) {
  try {
    const res = await fetch(`https://yande.re/post?tags=${query}`);
    const html = await res.text();
    const $ = cheerio.load(html);
    const list = $(".directlink.largeimg").toArray();

    if (list.length === 0) {
      return { creator: "aureel", status: false, result: "not found" };
    }
    const randomIndex = Math.floor(Math.random() * list.length);
    const imgurl = $(list[randomIndex]).attr("href");

    return { creator: "aureel", status: true, result: imgurl };
  } catch (e) {
    console.log(e);
  }
}

module.exports = yans;
