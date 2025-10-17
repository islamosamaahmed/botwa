let handler = async (m, { conn, text, usedPrefix, command, args }) => {
    global.db.users = global.db.users || {}; // Ensure the users object is initialized

    // Determine who to look up
    let who = (m.mentionedJid && m.mentionedJid[0]) ? m.mentionedJid[0] : args[0] ? ((args.join('').replace(/[@ .+-]/g, '')).replace(/^\+/, '').replace(/-/g, '') + '@s.whatsapp.net') : '';
    if (!who) {
        who = m.sender;
    }

    // Ensure the user exists in the database
    let user = global.db.users[who] = global.db.users[who] || {};
    let users = Object.values(global.db.users);

    // Check if the user is in jail
    if (user.jail === true) {
        throw '*Kamu tidak bisa melakukan aktivitas karena masih dalam penjara!*';
    }

    // Calculate followers
    let followers = users.filter(u => u.following && u.following.includes(who)).map(u => u.jid);
    user.followers = followers.length;

    // Update the user data
    global.db.users[who] = user;

    // Generate the response based on the command
    if (command.toLowerCase() === 'followers') {
        m.reply(`
• Nama: *@${(who || '').replace(/@s\.whatsapp\.net/g, '')}*
• Jumlah Pengikut: ${user.followers}

• Daftar Pengikut : 
${followers.map((follower, index) => {
    if (typeof follower === 'string') {
        let name = follower.split('@')[0];
        return `${index + 1}. @${name}`.trim();
    } else {
        console.error('Follower is not a valid JID:', follower);
        return `${index + 1}. @unknown`.trim();
    }
}).join('\n')}
        `.trim(), null, { mentions: followers });
    }

    if (command.toLowerCase() === 'following') {
        m.reply(`
• Nama: *@${(who || '').replace(/@s\.whatsapp\.net/g, '')}*
• Jumlah Mengikuti: ${user.following ? user.following.length : 0}

• Daftar Mengikuti:
${(user.following ? user.following : []).map((following, index) => {
    if (typeof following === 'string') {
        let name = following.split('@')[0];
        return `${index + 1}. @${name}`.trim();
    } else {
        console.error('Following is not a valid JID:', following);
        return `${index + 1}. @unknown`.trim();
    }
}).join('\n')}
        `.trim(), null, { mentions: user.following ? user.following : [] });
    }
};

handler.help = ['followers', 'following'];
handler.tags = ['life'];
handler.command = /^followers|following/i;

module.exports = handler;