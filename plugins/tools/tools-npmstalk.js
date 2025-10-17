const npm = async (pkg) => {
  return new Promise(async (resolve, reject) => {
    await axios
      .get("https://npmjs.com/package/" + pkg)
      .then(({ data }) => {
        let $ = cheerio.load(data);
        let keywords = [];
        let info = [];
        let collaborator = [];
        $("#tabpanel-readme > div.pv4 > ul > li").each(function (a, b) {
          keywords.push($(b).text());
        });
        $("div._702d723c.dib.w-50.bb.b--black-10.pr2").each(function (a, b) {
          info.push({
            type: $(b).find("h3").text(),
            result: $(b).find("p").text() || $(b).find("a").text(),
          });
        });
        $(
          "#top > div.fdbf4038.w-third-l.mt3.w-100.ph3.ph4-m.pv3.pv0-l > div.w-100 > ul > li",
        ).each(function (a, b) {
          collaborator.push({
            name: $(b).find("a").attr("href").replace("/~", ""),
            url: "https://www.npmjs.com" + $(b).find("a").attr("href"),
          });
        });
        let hasil = {
          title:
            $("#top > div.w-100.ph0-l.ph3.ph4-m > h2 > span").text() || pkg,
          language:
            $("#top > div.w-100.ph0-l.ph3.ph4-m > h2 > div").text() ||
            "Default",
          publish: $(
            "#top > div.w-100.ph0-l.ph3.ph4-m > span:nth-child(4)",
          ).text(),
          explore:
            $("#package-tab-explore > span").text().replace(" Explore ", "") ||
            "",
          dependencies:
            $("#package-tab-dependencies > span")
              .text()
              .replace(" Dependencies", "") || "",
          dependents:
            $("#package-tab-dependents > span")
              .text()
              .replace(" Dependents", "") || "",
          version_count:
            $("#package-tab-versions > span").text().replace(" Versions", "") ||
            "",
          keywords: keywords || [],
          install: $(
            "#top > div.fdbf4038.w-third-l.mt3.w-100.ph3.ph4-m.pv3.pv0-l > p > code > span",
          ).text(),
          info,
          collaborator,
        };
        resolve({ status: 200, result: hasil });
      })
      .catch((e) => {
        console.log(e);
        reject({
          status: 300,
          message: "request failed",
        });
      });
  });
};
let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `*• Example :* ${usedPrefix} ${command} *[name pkg]*`;
  m.reply(wait);
  let data = await (await npm(text)).result;
  let cap = `*[ NPM STALK ]*\n*• Title :* ${data.title}\n${data.publish}\n*• Dependencies :* ${data.dependencies}\n*• Version count :* ${data.version_count}\n*• Keyword :* ${data.keywords.map((a) => a).join(", ") || "Nothing"}\n\n${data.info.map((a) => `*• ${a.type} :* ${a.result}`).join("\n") || "Nothing"}\n\n*• Collaborator:*\n${data.collaborator.map((a) => `* ${a.name} *[ ${a.url} ]*`).join("\n") || "Nothing"}`;
  m.reply(cap);
};

handler.help = ["npmstalk"].map((a) => a + " *[name pkg]*");
handler.tags = ["tools"];
handler.command = ["npmstalk"];

module.exports = handler;
