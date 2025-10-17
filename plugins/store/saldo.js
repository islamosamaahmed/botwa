let saldoHandler = async (m, { conn }) => {
  let userId = m.sender;

  // kalau belum ada user, set saldo awal
  if (!db.data.users[userId]) db.data.users[userId] = { saldo: 0 };

  let currentSaldo = db.data.users[userId].saldo;

  await conn.sendMessage(
    m.chat,
    { text: `💰 Saldo Anda saat ini adalah: Rp ${currentSaldo}` },
    { quoted: m }
  );
};

saldoHandler.help = saldoHandler.command = ["saldo"];
saldoHandler.tags = ["store"];
handler.register = true;
module.exports = saldoHandler;