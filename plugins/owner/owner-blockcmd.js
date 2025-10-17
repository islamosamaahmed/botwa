let handler = async (m, { conn, text, usedPrefix, command }) => {
  const settings = db.data.settings;

  if (!text)
    throw `*[ ${command.toUpperCase()} EXAMPLE ]*
> *• Example :* ${usedPrefix + command} *[command on]*
> *• Example :* ${usedPrefix + command} *[command off]*`;

  let keyword = text.split(" ")[0];
  let data = text.slice(keyword.length + 1);

  try {
    let fitur = Object.values(plugins)
      .filter((v) => v.help && !v.disabled)
      .map((v) => v.help)
      .flat(1);

    let list = fitur.map((a) => a.split("*[")[0].trim());

    if (data === "off") {
      if (!list.includes(keyword.toLowerCase()))
        throw `*[!] command ${keyword} not found*`;

      settings.blockcmd.push(keyword.toLowerCase());
      m.reply("*✓ Success Block command from this bot*");
    } else if (data === "on") {
      if (!list.includes(keyword.toLowerCase()))
        throw `*[!] command ${keyword} not found*`;

      settings.blockcmd.forEach((result, index) => {
        if (result === keyword.toLowerCase())
          settings.blockcmd.splice(index, 1);
      });

      m.reply("*✓ Success Unblock command from this bot*");
    }
  } catch (e) {
    throw e;
  }
};

handler.help = ["command", "cmd"].map((a) => a + " *[command on/off]*");
handler.tags = ["owner"];
handler.command = ["command", "cmd"];
handler.rowner = true;

module.exports = handler;
