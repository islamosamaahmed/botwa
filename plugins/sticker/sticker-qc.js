const axios = require("axios");

let handler = async (m, { conn, args }) => {
  let warnaList = {
    black: "#000000",
    red: "#ff2414",
    blue: "#22b4f2",
    pink: "#eb13f2",
    purple: "#8000ff",
    green: "#00c851",
    yellow: "#ffeb3b",
    orange: "#ff9800",
    gray: "#9e9e9e"
  };

  let inputColor, inputText;

  // kalau ada format warna|teks
  if (args.join(" ").includes("|")) {
    let parts = args.join(" ").split("|");
    inputColor = parts[0].trim().toLowerCase();
    inputText = parts.slice(1).join("|").trim();
  } else if (args.length >= 1) {
    inputText = args.join(" ");
  } else if (m.quoted && m.quoted.text) {
    inputText = m.quoted.text;
  } else {
    throw `*• Example :*\n.qc teks\n.qc red|halo dunia\n\nList warna: ${Object.keys(warnaList).join(", ")}`;
  }

  // pilih warna
  let reswarna;
  if (inputColor) {
    if (!warnaList[inputColor]) {
      return m.reply(`⚠️ Warna *${inputColor}* tidak tersedia.\n\nList warna:\n${Object.keys(warnaList).join(", ")}`);
    }
    reswarna = warnaList[inputColor];
  } else {
    let warnaArray = Object.values(warnaList);
    reswarna = warnaArray[Math.floor(Math.random() * warnaArray.length)];
  }

  // ambil pp user
  let pp;
  try {
    pp = await conn.profilePictureUrl(m.sender, "image");
  } catch {
    pp = "https://telegra.ph/file/320b066dc81928b782c7b.png";
  }

  const obj = {
    type: "quote",
    format: "png",
    backgroundColor: reswarna,
    width: 512,
    height: 768,
    scale: 2,
    messages: [
      {
        entities: [],
        avatar: true,
        from: {
          id: m.chat.split("@")[0],
          name: m.pushName,
          photo: { url: pp },
        },
        text: inputText,
        replyMessage: {},
      },
    ],
  };

  try {
    const json = await axios.post("https://bot.lyo.su/quote/generate", obj, {
      headers: { "Content-Type": "application/json" },
    });
    const buffer = Buffer.from(json.data.result.image, "base64");

    await conn.sendImageAsSticker(m.chat, buffer, m, {
      packname: global.packname || "Sticker",
      author: global.author || "Bot",
    });
  } catch (e) {
    console.error(e);
    m.reply("❌ Gagal generate sticker QC.");
  }
};

handler.help = ["qc *[teks]*", "qc *[warna|teks]*"];
handler.tags = ["sticker"];
handler.command = /^qc$/i;
handler.limit = true;
handler.register = true

module.exports = handler;