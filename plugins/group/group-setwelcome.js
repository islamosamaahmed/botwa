module.exports = {
  help: ["setwelcome"].map((a) => a + " *[Input text]*"),
  tags: ["group"],
  command: ["setwelcome"],
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

"Hi @user, Salamat datang di group @subject
••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••
jangan lupa baca deskripsi yah !
@desc"`;
    let chat = db.data.chats[m.chat];
    chat.welcome = text;
    m.reply("Success Change text welcome ✓");
  },
};
