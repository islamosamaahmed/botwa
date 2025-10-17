const axios = require('axios');

let handler = async (m, { command, usedPrefix, conn, text, args }) => {
    // Validasi input teks
    if (!text) {
        return m.reply('✨ Hallo! Ada yang bisa saya bantu?\n\nContoh: ketik *gemini Ai* diikuti dengan pertanyaan Anda.');
    }

    try {
        // Respons awal dengan gambar dan teks "proses"
        const { key } = await conn.sendMessage(
            m.chat,
            {
                image: { url: 'https://telegra.ph/file/e628941df62f8d0f8c5aa.png' },
                caption: '⏳ Tunggu sebentar, permintaan Anda sedang diproses...',
            },
            { quoted: m, mentions: [m.sender] }
        );

        // Panggil API Gemini
        const result = await gemini(text);

        // Tunda sejenak untuk efek interaktif
        await conn.delay(500);

        // Kirim hasil dari API Gemini
        await conn.sendMessage(
            m.chat,
            {
                image: { url: 'https://telegra.ph/file/e628941df62f8d0f8c5aa.png' },
                caption: `✨ *Gemini AI*\n\n${result.reply || 'Tidak ada jawaban yang tersedia.'}`,
                edit: key,
            },
            { quoted: m, mentions: [m.sender] }
        );
    } catch (e) {
        console.error('Error handler:', e);
        await m.reply('❌ Terjadi kesalahan saat memproses permintaan Anda. Silakan coba lagi nanti.');
    }
};

// Metadata handler
handler.help = ['gemini'];
handler.tags = ['ai'];
handler.command = /^(gemini(ai)?)$/i;
handler.register = true;
handler.premium = true;

module.exports = handler;

// Fungsi untuk memanggil API Gemini
async function gemini(txt) {
    try {
        const api = await axios.get(
            `https://hercai.onrender.com/gemini/hercai?question=${encodeURIComponent(txt)}`,
            { headers: { 'Content-Type': 'application/json' } }
        );
        return api.data; // Pastikan struktur respons API sesuai
    } catch (e) {
        console.error('Error pada fungsi gemini:', e.message || e);
        return { reply: 'Maaf, saya tidak dapat menjawab pertanyaan Anda saat ini.' };
    }
}