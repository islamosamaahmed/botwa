module.exports = {
  help: ["listpc"].map((a) => a + " *[view list private]*"),
  tags: ["info"],
  command: ["listpc"],
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
    let anulistp = await store.chats
      .all()
      .filter((v) => v.id.endsWith(".net"))
      .map((v) => v.id);
    let teks = `*[ Private Chat ]*
Total: ${anulistp.length} Chat\n\n`;
    for (let i of anulistp) {
      let nama = store.messages[i].array[0].pushName;
      teks += `∘ *Nama* : ${nama}
∘ *User* : @${i.split("@")[0]}
∘ *Chat* : https://wa.me/${i.split("@")[0]}\n°°°°°°°°°°°°°°°°°°°°°°°°°°°°°\n`;
    }
    conn.reply(m.chat, teks, m);
  },
};
