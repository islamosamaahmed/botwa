let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `*• Example :* ${usedPrefix + command} *[number|product]*`;
  let [number, produk] = text.split("|");
  try {
    let done = `*✅ ALHAMDULILLAH TRANSAKSI DONE*
    --------------------------------------------------------------------------------------
    *• 📦 ITEM :* ${produk}
    *• 🕒 TANGGAL :* ${await tanggal(new Date())}
    *• ✅ STATUS :* BERHASIL
    --------------------------------------------------------------------------------------`;
    conn.reply(number + "@s.whatsapp.net", done, null);
  } catch (e) {
    throw error;
  }
};
handler.help = ["done"];
handler.tags = ["store"];
handler.command = ["done"];
module.exports = handler;
