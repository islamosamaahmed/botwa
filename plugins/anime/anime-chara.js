let handler = async (m, { conn, text, usedPrefix, command }) => {
  conn.chara = conn.chara ? conn.chara : {};
  if (!text) throw `*• Example :* ${usedPrefix + command} *[name chara]*`;
  let key = text.split(" ")[0];
  let data = text.slice(key.length + 1);
  try {
    if (key === "detail" && conn.chara[m.sender]) {
      if (isNaN(data)) return;
      let detail = conn.chara[m.sender].data[data - 1];
      let cap = `*[ CHARA INFO ${detail.name} ]*
*• Name :* ${detail.name} *[ ${detail.name_kanji} ]*
*• Mal ID :* ${detail.mal_id}
*• Url :* ${detail.url}
*• Total Favorites :* ${Func.formatNumber(detail.favorites)}

\`\`\`${detail.about}\`\`\``;
      if (menu === "button") {
        conn.sendButton(m.chat, [["BACK TO MENU", ".menu"]], m, {
          body: cap,
          url: detail.images["jpg"].image_url,
        });
      } else {
        conn.sendFile(m.chat, detail.images["jpg"].image_url, null, cap, m);
      }
      delete conn.chara[m.sender];
    } else {
      let list = await Func.fetchJson(
        "https://api.jikan.moe/v4/characters?page=1&q=" + text,
      );
      conn.sendList(
        m.chat,
        "Pilih disini",
        list.data.map((i, a) => {
          return {
            rows: [
              {
                headers: i.name,
                title: "• Favorites : " + i.favorites,
                body: i.url,
                command: `${usedPrefix + command} detail ${a + 1}`,
              },
            ],
          };
        }),
        m,
        {
          body: "*[ SEARCH CHARA ]*\n*• Result Search :* " + text,
          footer: "\n*® Total Characters : " + list.data.length + "*",
          url: list.data[0].images["jpg"].image_url,
        },
      );
      conn.chara[m.sender] = list;
    }
  } catch (e) {
    throw error;
  }
};

handler.help = ["chara"].map((a) => a + " *[name chara]*");
handler.tags = ["anime"];
handler.command = ["chara"];
module.exports = handler;
