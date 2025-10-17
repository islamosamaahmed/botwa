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

let badwordRegex = /anj|asw|kont|ToIol|gblk|T0lol|Bgsd|ajn|anjingk|bajingan|bangsat|kontol|memek|pepekq|meki|titit|peler|tetek|toket|ngewe|goblok|tolol|idiot|ngentotd|jembut|bego|dajjal|jancuk|pantek|pukimak|kimak|kampang|lonte|colimek|pelacur|henceut|nigga|fuck|dick|bitch|tits|bastard|asshole/i; // tambahin sendiri

async function before(m, {
    isBotAdmin
}) {
    if (m.isBaileys && m.fromMe) return;
    let chat = global.db.data.chats[m.chat];
    let user = global.db.data.users[m.sender];
    let isBadword = badwordRegex.exec(m.text);

    if (chat.antiToxic && isBadword && m.isGroup) {
        m.reply(`*⚠️ Kata Kata Toxic Terdeteksi ⚠️*

PERINGATAN JANGAN GUNAKAN KATA TOXIC UNTUK KENYAMANAN CHAT!
`);

    }
    return true;
}

module.exports = {
    before
};