const fs = require("fs");
const path = require("path");

let handler = async (m, { args, usedPrefix, command }) => {
  let bu = `*[ ✓ ] Successfully turned on auto levelup*`.trim();

  let isClose = {
    on: true,
    off: false,
  }[args[0]?.toLowerCase() || ""];

  if (isClose === undefined) {
    let text5 = `*[ ${command.toUpperCase()} EXAMPLE ]*:
> *• Example :* ${usedPrefix + command} on
> *• Example :* ${usedPrefix + command} off`;
    return m.reply(text5);
  }

  // Update global
  global.levelup = isClose;

  // Update permanen ke config.js
  try {
    let configPath = path.join(__dirname, "../../config.js");
    let configFile = fs.readFileSync(configPath, "utf8");
    let updated = configFile.replace(
      /global\.levelup\s*=\s*(true|false)/,
      `global.levelup = ${global.levelup}`
    );
    fs.writeFileSync(configPath, updated);
  } catch (e) {
    console.error("❌ Gagal update config.js:", e);
  }

  if (isClose) {
    await m.reply(bu);
  } else {
    await m.reply("*[ ✓ ] Successfully turned off auto levelup*");
  }
};

handler.help = ["autolevelup *[on/off]*"];
handler.tags = ["owner"];
handler.command = ["autolevelup", "levelup"];
handler.owner = true;

module.exports = handler;