// cancel.js
let fetch = require("node-fetch");

let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) throw `🚫 Format salah!\n\nContoh:\n${usedPrefix + command} ABC123DEF456GHI`;

  let id = args[0];
  let apiKey = global.apikey_ciaatopup;
  let url = `https://ciaatopup.my.id/h2h/deposit/cancel?id=${id}`;

  try {
    let res = await fetch(url, {
      method: "GET",
      headers: {
        "X-APIKEY": apiKey,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) throw `❌ Gagal cancel (${res.status})`;
    let json = await res.json();

    if (!json.success) throw `❌ Gagal: ${json.message || "Tidak diketahui"}`;

    // hapus pesan lama kalau ini balasan cancel
    if (m.quoted && m.quoted.key) {
      try {
        await conn.sendMessage(m.chat, { delete: m.quoted.key });
      } catch (e) {}
    }

    let txt = `
🛑 *Transaksi Dibatalkan*

🆔 ID: ${id}
📊 Status: ❌ Canceled
⏱️ Waktu: ${new Date().toLocaleString()}
`.trim();

    m.reply(txt);

    // bersihin dari database juga kalau ada
    let trxdb = global.db.data.transaksi || {};
    if (trxdb[id]) delete trxdb[id];
  } catch (e) {
    throw `⚠️ Error: ${e}`;
  }
};

handler.command = /^cancel$/i;
handler.help = ["cancel <id>"];
handler.tags = ["payment"];
handler.register = true;

module.exports = handler;