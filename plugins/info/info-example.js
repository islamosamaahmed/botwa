let handler = async (m, { conn, args, usedPrefix, command }) => {
  let code = Func.texted(
    "monospace",
    `module.exports = {
     help: ["name_features"],
     tags: ["Category"],
    command: ["name_features"],
    code: async(m, { 
 conn, 
 usedPrefix, 
 command,
 text,
 isOwner,
 isAdmin,
isBotAdmin,
isPrems,
chatUpdate
   }) => {
   //kode anda
  } 
}`,
  );
  await m.reply(code);
};
handler.help = ["example"].map((a) => a + " *[example code]*");
handler.tags = ["info"];
handler.command = ["example"];
module.exports = handler;
