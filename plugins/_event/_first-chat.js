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
 
const moment = require('moment-timezone');

async function before(m) {
    if (m.chat.endsWith('broadcast') || m.fromMe || m.isGroup) return;

    const user = global.db.data.users[m.sender];
    const currentTime = new Date();
    const time = moment.tz(currentTime, 'Asia/Jakarta').format('HH');

    let res = "Selamat dinihari 🌆";
    if (time >= 4 && time < 10) {
        res = "Selamat pagi 🌄";
    } else if (time >= 10 && time < 15) {
        res = "Selamat siang ☀️";
    } else if (time >= 15 && time < 18) {
        res = "Selamat sore 🌇";
    } else if (time >= 18) {
        res = "Selamat malam 🌙";
    }

    let txt = `👋 Hai, ${res}

${user.banned ? '📮Maaf, kamu dibanned & Tidak bisa menggunakan bot ini lagi' : `💬 Ada yg bisa Shiroko Fork bantu?\n📮Note: Jangan spam botnya
⏩Ketik *Click Button* untuk menampilkan menu
`}`.trim();

    // Periksa apakah sudah melewati waktu minimum sejak pesan terakhir dikirim
    if (currentTime - user.lastSentTime < 21600000) return;

    // Kirim pesan dengan tombol
    await conn.sendMessage(
        m.chat,
        {
            image: { url: "https://files.catbox.moe/wekboe.jpg" }, // URL gambar
            caption: txt, // Deskripsi gambar
            footer: wm, // Footer atau watermark
            buttons: [
                {
                    buttonId: ".menu",
                    buttonText: { displayText: "Menu" }, // Teks tombol
                    type: 1, // Jenis tombol
                },
                {
                    buttonId: ".sc",
                    buttonText: { displayText: "Script" },
                    type: 1,
                },
            ],
            viewOnce: true, // Aktifkan mode view once
            headerType: 4, // Header tipe gambar
        },
        { quoted: m } // Pesan yang dikutip
    );

    // Update waktu terakhir pesan dikirim
    user.lastSentTime = currentTime;
}

module.exports = { before };