const fs = require("fs");
const Jimp = require("jimp");
let linkRegex = /chat.whatsapp.com\/([0-9A-Za-z]{20,24})/i;

let handler = async (m, { conn, usedPrefix, text, command }) => {
  let [_, code] = text.match(linkRegex) || [];
  if (!text)
    throw `*[ PERINGATAN !! ]*
_⚠️ Jangan salah gunakan fitur ini untuk kesenangan semata, karena fitur ini dapat membuat orang lain di rugikan, jangan salahkan membuat fitur ini jika ada pihak lain yang dirugikan_

contoh pemakaian: ${usedPrefix + command} https://chat.whatsapp.com`;
  if (!linkRegex)
    throw `*[ PERINGATAN !! ]*
_⚠️ Jangan salah gunakan fitur ini untuk kesenangan semata, karena fitur ini dapat membuat orang lain di rugikan, jangan salahkan membuat fitur ini jika ada pihak lain yang dirugikan_

contoh pemakaian: ${usedPrefix + command} https://chat.whatsapp.com`;
  const { key } = await conn.sendMessage(m.chat, {
    text: "*😂 OTW KUDETA GRUP NYA YGY*",
  });

  try {
    const res = await conn.groupAcceptInvite(code);
    const data = await conn.groupMetadata(res);

    const jid = await data.participants
      .filter((item) => item.id !== conn.user.jid && item.admin)
      .map((a) => a.id);
    const isAdmin = await data.participants
      .filter((item) => item.admin)
      .map((a) => a.id);
    const member = await data.participants
      .filter((item) => m.isBaileys || conn.user.jid !== item.id)
      .map((a) => a.id);

    const admin = jid
      .map(
        (a, index) =>
          `*${index + 1}.* wa.me/${a.split("@")[0]}?text=ADMIN+GOBLOK+😂😂😂`,
      )
      .join("\n");

    if (!isAdmin.includes(conn.user.jid))
      await conn.sendMessage(m.chat, {
        text: "*😂 GIMANA MAU KUDETA KALO GW BUKAN ADMIN*",
        edit: key,
      });

    const { img } = await generateProfilePicture(
      "https://t3.ftcdn.net/jpg/01/20/50/28/360_F_120502836_XKKceDDRp2S76HTy2Z1gj0rFplua6bKT.jpg",
    );
    await conn.updateProfilePicture(res, img);

    let subjek = "😈😈 9999 KUDETA BY ZASS" + "\nGRUP AMPAS  GAKGUNA";
    await conn.groupUpdateSubject(res, subjek);

    let desk = `*😈😈 GRUP INI UDAH GW KUDETA*\n\n*[ 😈 LIST ADMIN TOLOL DI GRUP INI ]*\n${admin}\n\n_⚠️ Pesan Untuk admin grup sini, lu jangan suka nyari masalah sama orang kalo gak mau kena akibatnya, kasian gw sama mental lu 😂😂😂_\n\n~.© Copyright ~Zass 2025~`;
    await conn.groupUpdateDescription(res, desk);

    await conn.groupSettingUpdate(res, "announcement");

    setTimeout(() => {
      conn.groupParticipantsUpdate(res, member, "remove");
    }, 3000);

    setTimeout(() => {
      conn.groupParticipantsUpdate(res, jid, "demote");
    }, 3000);
    await conn.sendMessage(res, {
      text: "😈 *TUGAS GW DISINI UDAH KELAR*\n\n```group ini emang pantes bubar 😂```",
    });

    setTimeout(() => {
      conn.groupLeave(res);
    }, 3000);

    await conn.sendMessage(m.chat, {
      text: "*TUGAS GW UDAH SELESAI*",
      edit: key,
    });
  } catch (e) {
    await conn.sendMessage(m.chat, {
      text: "*WOYLA FITUR KUDETA ERROR* " + e,
      edit: key,
    });
  }
};
handler.help = ["kudeta"];
handler.tags = ["owner"];
handler.command = /^kudeta$/i;
handler.owner = true;

module.exports = handler;

async function generateProfilePicture(buffer) {
  const jimp_1 = await Jimp.read(buffer);
  const minz =
    jimp_1.getWidth() > jimp_1.getHeight()
      ? jimp_1.resize(720, Jimp.AUTO)
      : jimp_1.resize(Jimp.AUTO, 720);
  const jimp_2 = await Jimp.read(await minz.getBufferAsync(Jimp.MIME_JPEG));
  return {
    img: await minz.getBufferAsync(Jimp.MIME_JPEG),
  };
}
