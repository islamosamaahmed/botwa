module.exports = {
  help: ["whitelist", "wl"],
  tags: ["owner"],
  command: ["whitelist", "wl"],
  code: async (
    m,
    {
      conn,
      usedPrefix,
      command,
      text,
      isOwner,
      isAdmin,
      isBotAdmin,
      isPrems,
      chatUpdate,
    },
  ) => {
    let ex = `*[ ${command.toUpperCase()} EXAMPLE ]*
• ${usedPrefix + command} add
• ${usedPrefix + command} list
• ${usedPrefix + command} delete`;
    const chat = db.data.chats[m.chat];
    if (!text) return m.reply(ex);
    if (text.toLowerCase() === "add") {
      chat.whitelist = true;
      m.reply(
        `Successfully added whitelist to: *[ ${await conn.getName(m.chat)} ]*`,
      );
    } else if (text.toLowerCase() === "delete") {
      chat.whitelist = false;
      m.reply(
        `Successfully deleted whitelist to: *[ ${await conn.getName(m.chat)} ]*`,
      );
    } else if (text.toLowerCase() === "list") {
      let list = Object.keys(db.data.chats)
        .map((a) => ({
          name: a,
          wl: db.data.chats[a].whitelist,
        }))
        .filter((a) => a.wl == true);
      let arr = [];
      for (let i of list) {
        let data = await conn.groupMetadata(i.name);
        arr.push({
          name: data.subject,
          id: data.id,
        });
      }
      m.reply(
        arr.map((a) => `*• Name :* ${a.name}\n*• ID :* ${a.id}`).join("\n\n"),
      );
    } else return m.reply(ex);
  },
  owner: true,
};
