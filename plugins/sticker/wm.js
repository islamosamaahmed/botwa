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
    help: ["wm"].map(a => a + " *[packname|author]*"),
    tags: ["sticker"],
    command: ["wm"],
    limit: true,
    register: true,
    code: async (m, {
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
        let q = m.quoted || m
        let mime = (q.msg || q).mimetype;
        if (!mime) throw `*• Example :* ${usedPrefix + command} *[reply/send media]*`;
        if (!text) throw `*• Example :* ${usedPrefix + command} *[packname|author]*`;
        m.reply(wait);
        let [packname, author] = text.split("|");
        let data = await conn.getFile(await q.download(), true);
        let hasil = {
            packname: packname || "",
            author: author || ""
        }
        if (/image/.test(data.mimetype)) {
            await conn.sendImageAsSticker(m.chat, data.data, m, hasil);
        } else if (/image/.test(data.mimetype)) {
            await conn.sendVideoAsSticker(m.chat, data.data, m, hasil);
        } else {
            await conn.sendImageAsSticker(m.chat, data.data, m, hasil);
        }
    }
}