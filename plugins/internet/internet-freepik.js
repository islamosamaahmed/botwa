let handler = async (m, { conn, text, usedPrefix, command }) => {
  m.reply(wait);
  let data = await Func.fetchJson(
    `https://api.onesytex.my.id/api/jp.freepik?query=${text || "anime"}`,
  );
  let json = await Func.random(data.result);
  if (menu === "button") {
    conn.sendButton(
      m.chat,
      [["NEXT IMAGE", `${usedPrefix + command} ${text || " "}`]],
      m,
      {
        body: `*[ ${command.toUpperCase()} RANDOM ]*
*• Title :* ${json.name}
*• Release :* ${json.datePublished}
*• License :* ${json.license}`,
        url: json.imageUrl,
      },
    );
  } else {
    m.reply(
      `*[ ${command.toUpperCase()} RANDOM ]*
*• Title :* ${json.name}
*• Release :* ${json.datePunlished}
*• License :* ${json.license}`,
      json.imageUrl,
    );
  }
};
handler.help = ["wallpaper", "freepik"].map((a) => a + " *[random image]*");
handler.tags = ["internet"];
handler.command = ["wallpaper", "freepik"];

module.exports = handler;
