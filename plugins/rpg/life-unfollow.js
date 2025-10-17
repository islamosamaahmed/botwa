let confirmation = {};

async function handler(m, { conn, args, usedPrefix, command }) {
    global.db.users = global.db.users || {}; // Ensure the users object is initialized
    let user = global.db.users[m.sender] = global.db.users[m.sender] || {};

    let who = ((m.mentionedJid && m.mentionedJid[0]) ? m.mentionedJid[0] : args[0] ? ((args.join('').replace(/[@ .+-]/g, '')).replace(/^\+/, '').replace(/-/g, '') + '@s.whatsapp.net') : '').replace(/[^0-9]/g, '') + '@s.whatsapp.net';
    if (!who) return m.reply('Tag target atau ketik nomornya');
    let _user = global.db.users[who] = global.db.users[who] || {};
    let index = user.following.indexOf(who);
    if (index === -1) return m.reply('Kamu belum follow orang ini');
    if (user.jail === true) {
        throw '*Kamu tidak bisa melakukan aktivitas karena masih dalam penjara!*';
    }
    if (_user.banned == true) return m.reply('Kamu tidak bisa unfollow orang yang terbanned');

    let confirm = `
Apakah kamu yakin ingin berhenti mengikuti *@${(who || '').replace(/@s\.whatsapp\.net/g, '')}*
Timeout *60* detik
Ketik "y" untuk iya ✅ dan "n" ❌ untuk tidak!
    `.trim();

    await conn.reply(m.chat, confirm, m, { mentions: [who] });

    confirmation[m.sender] = {
        sender: m.sender,
        to: who,
        message: m,
        timeout: setTimeout(() => (m.reply('Timeout'), delete confirmation[m.sender]), 60 * 1000)
    };
}

handler.before = async m => {
    if (m.isBaileys) return;
    if (!(m.sender in confirmation)) return;
    if (!m.text) return;

    let { timeout, sender, message, to } = confirmation[m.sender];
    if (m.id === message.id) return;

    let users = Object.values(global.db.users);
    let followers = users.filter(user => user.following && user.following.includes(m.sender)).map(follower => Object.values(follower)[0].slice(0, -5));

    if (/❌|no?/g.test(m.text.toLowerCase())) {
        clearTimeout(timeout);
        delete confirmation[sender];
        return m.reply('Membatalkan unfollow');
    }

    if (/✅|y(es)?/g.test(m.text.toLowerCase())) {
        user = global.db.users[sender];
        let index = user.following.indexOf(to);
        user.following.splice(index, 1);

        let _user = global.db.users[to];
        _user.followers = followers.length - 1;

        m.reply(`Berhasil unfollow *@${(to || '').replace(/@s\.whatsapp\.net/g, '')}*`, null, { mentions: [to] });
        clearTimeout(timeout);
        delete confirmation[sender];
    }
};

handler.help = ['unfollow'].map(v => v + '');
handler.tags = ['sosial'];
handler.command = /^(unfollow)$/i;

handler.disabled = false;

module.exports = handler;