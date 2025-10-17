const handler = async (m, { conn, usedPrefix, command, text }) => {
    if (!m.quoted) {
        return m.reply(`[❗] Reply audio dengan command /${usedPrefix + command} <text>`);
    }
    try {
        await m.reply('⏱️ Memproses...');        
        let tujuan = text;
        await conn.sendMessage(
            `120363251106848970@newsletter`,
            {
                audio: await m.quoted.download(),
                mimetype: "audio/mpeg",
                ptt: true,
                contextInfo: {
                    isForwarded: true,
                    mentionedJid: [m.sender],
                    businessMessageForwardInfo: {
                        businessOwnerJid: "0@s.whatsapp.net"
                    },
                    forwardedNewsletterMessageInfo: {
                        newsletterName: `${text}`,
                        newsletterJid: `120363251106848970@newsletter`
                    }
                }
            },
            { quoted: m }
        );
        m.reply(`D o n e ✔️\nAudio Berhasil Dikirim Ke Channel`);
    } catch (err) {
        m.reply('Error: ' + err.message);
        await m.reply('❌ Terjadi kesalahan');
    }
};

handler.help = ['upaudioch'];
handler.command = /^(upaudioch|tovnsaluran)$/i;
handler.tags = ['upload'];
handler.owner = true;

module.exports = handler;