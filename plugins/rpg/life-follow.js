let confirmation = {};

async function handler(m, { conn, args }) {
    global.db.users = global.db.users || {};

    console.log("Isi global.db.users:", global.db.users); // Tambahkan baris ini

    const user = global.db.users[m.sender] = global.db.users[m.sender] || {};
    user.following = user.following || [];

    let target;
    if (m.mentionedJid && m.mentionedJid[0]) {
        target = m.mentionedJid[0];
    } else {
        target = args[0]?.replace('@', '') + '@s.whatsapp.net';
    }

    if (!target || !global.db.users[target]) {
        return m.reply('Tag target atau ketik nomornya dan pastikan user ada di database');
    }

    const targetUser = global.db.users[target];
    targetUser.followers = targetUser.followers || [];

    if (user.following.includes(target)) return m.reply(`Kamu sudah follow orang ini!`);

    let confirm = `Apakah kamu yakin ingin mengikuti *@${target.replace(/@s\.whatsapp\.net/g, '')}*?\nKetik "ya" untuk iya dan "tidak" untuk tidak.\nTimeout dalam 60 detik.`;

    await conn.reply(m.chat, confirm, m, { mentions: [target] });

    confirmation[m.sender] = {
        sender: m.sender,
        target: target,
        message: m,
        timeout: setTimeout(() => {
            m.reply('Timeout');
            delete confirmation[m.sender];
        }, 60 * 1000)
    };
}

handler.before = async m => {
    if (!(m.sender in confirmation)) return;
    if (!m.text) return;

    const { timeout, sender, message, target } = confirmation[m.sender];
    if (m.id === message.id) return;

    const user = global.db.users[sender] = global.db.users[sender] || {};
    const targetUser = global.db.users[target];

    if (/^tidak$/i.test(m.text)) {
        clearTimeout(timeout);
        delete confirmation[sender];
        return m.reply('Membatalkan follow');
    }

    if (/^ya$/i.test(m.text)) {
        user.following.push(target);
        targetUser.followers.push(sender);
        m.reply(`Berhasil follow *@${target.replace(/@s\.whatsapp\.net/g, '')}*`, null, { mentions: [target] });
        clearTimeout(timeout);
        delete confirmation[sender];
    }
}

handler.help = ['follow'];
handler.tags = ['life'];
handler.command = /^(follow)$/i;
handler.disabled = false;

module.exports = handler;