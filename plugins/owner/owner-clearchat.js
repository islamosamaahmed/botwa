let handler = async (m, { conn }) => {
    try {
        const chatIdsToDeleteGroup = Object.values(conn.chats)
            .filter(item => /@g\.us$/.test(item.id))
            .map(item => item.id);

        const deletedGroupCount = chatIdsToDeleteGroup.length;

        for (const id of chatIdsToDeleteGroup) {
            try {
                await conn.chatModify({
                    delete: true,
                    lastMessages: [{
                        key: m.key,
                        messageTimestamp: m.messageTimestamp
                    }]
                }, id);
            } catch (error) {
                console.error(`Error deleting group chat ${id}:`, error);
            }
        }

        const chatIdsToDeletePrivate = Object.values(conn.chats)
            .filter(item => /@s.whatsapp\.net$/.test(item.id))
            .map(item => item.id);

        const deletedPrivateCount = chatIdsToDeletePrivate.length;

        for (const id of chatIdsToDeletePrivate) {
            try {
                await conn.chatModify({
                    delete: true,
                    lastMessages: [{
                        key: m.key,
                        messageTimestamp: m.messageTimestamp
                    }]
                }, id);
            } catch (error) {
                console.error(`Error deleting private chat ${id}:`, error);
            }
        }

        const combinedResult = `🗑️ *Deleted Group Chats:* ${deletedGroupCount}\n🗑️ *Deleted Private Chats:* ${deletedPrivateCount}`;
        await conn.reply(m.chat, combinedResult, m);

    } catch (error) {
        console.error('Error in handler function:', error);
        await conn.reply(m.chat, 'Terjadi kesalahan dalam menghapus grup.', m);
    }
};

handler.help = ['clearchat'];
handler.tags = ['owner'];
handler.owner = false;
handler.command = /^(clearcha?t)$/i;

module.exports = handler;