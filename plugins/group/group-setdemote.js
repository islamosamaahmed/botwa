module.exports = {
  help: ["setdemote"].map((a) => a + " *[Input text]*"),
  tags: ["group"],
  command: ["setdemote"],
  group: true,
  admin: true,
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
    if (!text)
      throw `*• Example :* ${usedPrefix + command} *[input text]*

*• Guide :*
* *@user* : tag nomor member
* *@subject* : nama group
* *desc* : deskripsi group 

"Selamat @user, kamu telah menjadi admin di group @subject !"`;
    let chat = db.data.chats[m.chat];
    chat.demote = text;
    m.reply("Success Change text Demote ✓");
  },
};
