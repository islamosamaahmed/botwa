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

const fs = require("fs");
const handler = async (m, {
    args,
    text,
    conn,
    command,
    usedPrefix
}) => {
    const data = fs.readFileSync(process.cwd() + '/database/group.json');
    let json = JSON.parse(data);

    let type = (args[0] || '').toLowerCase();

    switch (type) {
        case 'on':
            if (json.includes(m.chat)) throw '*Schedule Grup sudah aktif*';

            try {
                // Menambahkan data baru ke dalam array
                json.push(m.chat);
                // Menyimpan perubahan kembali ke file grup.json
                fs.writeFileSync(process.cwd() + '/database/group.json', JSON.stringify(json));
                // Mengembalikan array yang telah diperbarui
                await conn.reply(m.chat, `Successfully activated schedule in group *${await conn.getName(m.chat)}*`, m);
                return json;
            } catch (e) {
                throw e;
            }
            break;
        case 'off':
            if (!json.includes(m.chat)) throw '*Schedule Grup sudah nonaktif*';
            try {
                json.splice(json.indexOf(m.chat), 1);
                // Menyimpan perubahan kembali ke file grup.json
                fs.writeFileSync(process.cwd() + '/database/group.json', JSON.stringify(json));
                await conn.reply(m.chat, `Successfully disabled schedule in group *${await conn.getName(m.chat)}*`, m);
                return json;
            } catch (e) {
                throw e;
            }
            break;
        default:
            return conn.sendFile(m.chat,`*����� Example :* ${usedPrefix + command} *[on/off]*`, m);
    }
};

handler.help = handler.command = ['schedule'];
handler.tags = ['group'];
handler.admin = handler.group = true;

module.exports = handler;