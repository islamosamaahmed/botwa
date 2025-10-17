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

module.exports = {
    help: ["nokia"].map(a => a + " *[reply/send media]*"),
    tags: ["maker"],
    command: ["nokia"],
    code: async (m, { conn, usedPrefix, command, text }) => {
        let q = m.quoted ? m.quoted : m;
        let mime = q.mimetype;
       m.reply(wait);
            if (mime) {
                let url = await Uploader.catbox(await q.download());
               conn.sendImageAsSticker(m.chat, `https://api.popcat.xyz/nokia?image=${url}`, m, {
                 packname: packname,
                 author: author
               });
            } else {
                let url = await Uploader.catbox(await Func.fetchBuffer(await conn.profilePictureUrl(q.sender, "image").catch(e => icon)));
               conn.sendImageAsSticker(m.chat, `https://api.popcat.xyz/nokia?image=${url}`, m, {
                 packname: packname,
                 author: author
               });
          }
    }
}