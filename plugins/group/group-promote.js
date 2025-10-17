let handler = async (m, { teks, conn, isOwner, isAdmin, args }) => {
  let ownerGroup = m.chat.split`-`[0] + "@s.whatsapp.net";
  if (m.quoted) {
    if (m.quoted.sender === ownerGroup || m.quoted.sender === conn.user.jid)
      return;
    let usr = m.quoted.sender;
    await conn.groupParticipantsUpdate(m.chat, [usr], "promote");
    return;
  }
  if (!m.mentionedJid[0]) throw `*• Example :* .promote *[reply/tag use]*`;
  let users = m.mentionedJid.filter(
    (u) => !(u == ownerGroup || u.includes(conn.user.jid)),
  );
  for (let user of users)
    if (user.endsWith("@s.whatsapp.net"))
      await conn.groupParticipantsUpdate(m.chat, [user], "promote");
};

handler.help = ["promote"].map((a) => a + " *[reply/tag user]*");
handler.tags = ["group"];
handler.command = ["promote"];
handler.admin = true;
handler.group = true;
handler.botAdmin = true;

module.exports = handler;
