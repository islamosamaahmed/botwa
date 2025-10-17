let fs = require("fs");
let { js } = require("js-beautify");
let handler = async (m, { text, usedPrefix, command }) => {
  if (!text) throw `*• Example:* ${usedPrefix + command} *[filename]*`;

  if (command === "sf") {
    if (!m.quoted) throw `*[ ! ] Reply Your Progress Code*`;
    let path = `plugins/${text}.js`;
    await fs.writeFileSync(
      path,
      await js(`/*═══════════════════════════════════════════════════════
 *  ⌬  YT NeoShiroko Labs
 *═══════════════════════════════════════════════════════
 *  🌐  Website     : https://www.neolabsofficial.my.id
 *  ⌨︎  Developer   : https://zass.cloud
 *  ▶︎  YouTube     : https://www.youtube.com/@zassci_desu
 *  ⚙︎  Panel Murah : pteroku-desu.zass.cloud
 *
 *  ⚠︎  Mohon untuk tidak menghapus watermark ini
 *═══════════════════ © 2025 Zass Desuta ─════════════════════
 */\n\n${m.quoted.text}`),
    );
    let key = await conn.sendMessage(
      m.chat,
      {
        text: "*[ SAVING CODE... ]*",
      },
      {
        quoted: m,
      },
    );
    await conn.sendMessage(
      m.chat,
      {
        text: `*[ SUCCES SAVING CODE ]*\n\n\`\`\`${m.quoted.text}\`\`\``,
        edit: key.key,
      },
      {
        quored: m,
      },
    );
  } else if (command === "df") {
    let path = `plugins/${text}.js`;
    let key = await conn.sendMessage(
      m.chat,
      {
        text: "*[ DELETE FILE... ]*",
      },
      {
        quoted: m,
      },
    );
    if (!fs.existsSync(path))
      return conn.sendMessage(
        m.chat,
        {
          text: `*[ FILE NOT FOUND ]*`,
          edit: key.key,
        },
        {
          quored: m,
        },
      );
    fs.unlinkSync(path);
    await conn.sendMessage(
      m.chat,
      {
        text: `*[ SUCCESS DELETE FILE ]*`,
        edit: key.key,
      },
      {
        quored: m,
      },
    );
  }
};
handler.help = ["sf", "df"].map((v) => v + " *[reply code/filename]*");
handler.tags = ["owner"];
handler.command = /^(sf|df)$/i;
handler.rowner = true;
module.exports = handler;
