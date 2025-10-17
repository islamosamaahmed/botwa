// cekstatus.js
let fetch = require("node-fetch");

let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) throw `🚫 Format salah!\n\nContoh:\n${usedPrefix + command} ABC123DEF456GHI`;

  let id = args[0]; 
  let apiKey = global.apikey_ciaatopup;
  let url = `https://ciaatopup.my.id/h2h/deposit/status?id=${id}`;

  try {
    let res = await fetch(url, {
      method: "GET",
      headers: {
        "X-APIKEY": apiKey,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) throw `❌ Gagal cek status (${res.status})`;
    let json = await res.json();

    if (!json.success) throw `❌ Gagal: ${json.message || "Tidak diketahui"}`;
    let data = json.data;

    let statusEmoji =
      data.status === "success"
        ? "✅"
        : data.status === "pending"
        ? "⏳"
        : "❌";

    let txt = `
📌 *STATUS TRANSAKSI*

🆔 ID: ${data.id}
🔖 Reff: ${data.reff_id}
💰 Nominal: Rp${data.nominal}
📊 Status: ${statusEmoji} ${data.status}
🏦 Metode: ${data.metode}
🕒 Dibuat: ${data.created_at}
`.trim();

    // hapus pesan lama kalau ini hasil refresh
    if (m.quoted && m.quoted.key) {
      try {
        await conn.sendMessage(m.chat, { delete: m.quoted.key });
      } catch (e) {}
    }

    // kalau sukses, kirim tanpa tombol
    if (data.status === "success") {
      await conn.sendMessage(
        m.chat,
        {
          image: { url: "https://files.catbox.moe/kdat23.jpg" },
          caption: txt,
          footer: "✅ Pembayaran berhasil",
          headerType: 4,
        },
        { quoted: m }
      );
      return;
    }

    // kalau belum sukses → pakai tombol Refresh
    await conn.sendMessage(
      m.chat,
      {
        image: { url: "https://files.catbox.moe/i6mxn4.jpg" },
        caption: txt,
        footer: wm,
        buttons: [
          {
            buttonId: `${usedPrefix + command} ${id}`,
            buttonText: { displayText: "🔄 Refresh" },
            type: 1,
          },
        ],
        headerType: 4,
      },
      { quoted: m }
    );
  } catch (e) {
    throw `⚠️ Error: ${e}`;
  }
};

handler.command = /^cekstatus$/i;
handler.help = ["cekstatus <id>"];
handler.tags = ["payment"];
handler.register = true;

module.exports = handler;