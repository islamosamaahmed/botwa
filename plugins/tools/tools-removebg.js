const axios = require ('axios');
const uploadImage = require ("../../lib/uploadFile.js");

let handler = async (m, { conn, usedPrefix, command, text }) => {
  let q = m.quoted ? m.quoted : m;
  let mime = (q.msg || q).mimetype || "";
  if (!mime) return m.reply("Fotonya Mana?");
  if (!/image\/(jpe?g|png)/.test(mime))
    return m.reply(`Tipe ${mime} tidak didukung!`);
  let ephemeral =
    conn.chats[m.chat]?.metadata?.ephemeralDuration ||
    conn.chats[m.chat]?.ephemeralDuration ||
    false;
  
  let img = await q.download()
  let files = await uploadImage(img)
  m.reply('Tunggu sebentar ...')
    try {
      let { data } = await axios.get(`https://api.nekoo.qzz.io/tools/removebg?imageUrl=${files}`)
      if (!data.status) throw new Error("Gagal remove background!")
    
      let out = data.result
      await conn.sendMessage(
        m.chat,
        {
          image: { url: out },
          fileName: "removebg.png",
          mimetype: "image/png",
          caption: "*DONE (≧ω≦)ゞ*",
        },
        { quoted: m, ephemeralExpiration: ephemeral }
      )
    } catch (e) {
      console.error(e)
      m.reply(eror)
    }
};
handler.help = ["removebg", "changebg"];
handler.tags = ["tools", "premium"];
handler.command = /^(removebg|changebg)$/i;
handler.premium = true;
module.exports = handler;