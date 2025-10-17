/*═══════════════════════════════════════════════════════
 *  ⌬  YT NeoShiroko Labs
 *═══════════════════════════════════════════════════════
 *  🌐  Website     : https://www.neolabsofficial.my.id
 *  ⌨︎  Developer   : https://zass.cloud
 *  ▶︎  YouTube     : https://www.youtube.com/@zassci_desu
 *  ⚙︎  Panel Murah : pteroku-desu.zass.cloud
 *
 *  ⚠︎  Mohon untuk tidak menghapus watermark ini
 *═══════════════════ © 2025 Zass Desuta ─════════════════════
 */


const handler = async (m, {
            conn
        }) => {
            if (!m.quoted) throw `*• Example :* .ci *[reply message]*`;
  const quotedObj = await m.getQuotedObj();
  const id = quotedObj.msg.contextInfo.forwardedNewsletterMessageInfo;
  let teks = "```Channel Name: ```" + "" + `${id.newsletterName}` + "\n"
    teks += "```Channel Id: ```" + " " + `${id.newsletterJid}` + "";
  await conn.reply(m.chat, teks.trim(), m);
};

handler.help = ["ci *Reply pesan dari channel*"];
handler.command = ["ci"];
handler.tags = ["tools"];

module.exports = handler;