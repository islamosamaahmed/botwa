const axios = require('axios');
const QRCode = require('qrcode');

let handler = async (m, { text, usedPrefix, command, db, conn }) => {
  if (!text) {
    return m.reply(`Contoh: ${usedPrefix + command} 25000`);
  }

  if (m.isGroup) return m.reply("⚠️ Pembelian hanya bisa dilakukan di private chat (PC bot).")
 
  const nominal = parseInt(text, 10);
  if (isNaN(nominal) || nominal < 2000) {
    return m.reply("⚠️ Nominal tidak valid. Minimal 2000.");
  }

  let trgt = m.sender;
  let sentMessage;
  const feeBot = 100; // keuntungan bot per deposit

  try {
    // === CREATE PAYMENT ===
    const params = new URLSearchParams({
      nominal: nominal,
      metode: 'QRISFAST'
    });

    const createRes = await fetch(`https://ciaatopup.my.id/h2h/deposit/create?${params}`, {
      method: 'GET',
      headers: {
        'X-APIKEY': global.apikey_ciaatopup,
        'Content-Type': 'application/json'
      }
    });

    const createData = await createRes.json();
    if (!createData.success) throw new Error("Gagal membuat pembayaran.");

    const pay = createData.data;

    // expired
    const expiredAt = new Date(pay.expired_at);
    const formattedExpired = expiredAt.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Jakarta' });

    // bikin qr dari qr_string
    const qrBuffer = await QRCode.toBuffer(pay.qr_string, { type: 'png', width: 400 });

    const tek = `𝗗𝗘𝗧𝗔𝗜𝗟 𝗣𝗘𝗠𝗕𝗔𝗬𝗔𝗥𝗔𝗡 📢

> 🆔 ID Trx: ${pay.id}
> 🏧 Nominal: Rp ${toRupiah(pay.nominal)}
> 💸 Fee API: Rp ${toRupiah(pay.fee)}
> 🪙 Fee Bot: Rp ${toRupiah(feeBot)}
> 📥 Total Masuk: Rp ${toRupiah(pay.get_balance - feeBot)}
> 📦 Item: Deposit Saldo
> ⏱️ Berlaku Hingga: ${formattedExpired} WIB

⚠️ QRIS hanya berlaku sampai jam _${formattedExpired}_, apabila lewat dari itu pembayaran otomatis batal.`

    sentMessage = await conn.sendMessage(
      m.chat,
      { image: qrBuffer, caption: tek },
      { quoted: m }
    );

    const apiUrlStatus = `https://ciaatopup.my.id/h2h/deposit/status?id=${pay.id}`;
    const apiUrlCancel = `https://ciaatopup.my.id/h2h/deposit/cancel?id=${pay.id}`;

    let isTransactionComplete = false;

    // auto cancel setelah expired
    const timer = setTimeout(async () => {
      if (!isTransactionComplete) {
        try {
          await fetch(apiUrlCancel, {
            method: 'GET',
            headers: {
              'X-APIKEY': global.apikey_ciaatopup,
              'Content-Type': 'application/json'
            }
          });

          // hapus pesan invoice
          await conn.sendMessage(m.chat, {
            delete: {
              remoteJid: m.chat,
              fromMe: true,
              id: sentMessage.key.id,
              participant: sentMessage.key.participant
            }
          });

          await conn.sendMessage(m.chat, { text: '❌ Transaksi dibatalkan otomatis karena waktu pembayaran habis.' }, { quoted: m });
        } catch (err) {
          console.error('Error auto cancel:', err);
        }
      }
    }, 60 * 60 * 1000);

    // polling status
    while (!isTransactionComplete) {
      try {
        const statusRes = await axios.get(apiUrlStatus, {
          headers: {
            'X-APIKEY': global.apikey_ciaatopup,
            'Content-Type': 'application/json'
          }
        });

        const statusData = statusRes.data;

        if (statusData.success && statusData.data.status === "success") {
          isTransactionComplete = true;
          clearTimeout(timer);

          // hapus pesan invoice
          await conn.sendMessage(m.chat, {
            delete: {
              remoteJid: m.chat,
              fromMe: true,
              id: sentMessage.key.id,
              participant: sentMessage.key.participant
            }
          });

          // notif sukses
          const notification = `🎉 Deposit Dengan ID ( ${pay.id} ) Sukses 🎉`;
          await conn.sendMessage(m.chat, { text: notification }, { quoted: m });

          // === Tambahin saldo user ke database JSON ===
          if (!db.data.users[trgt]) db.data.users[trgt] = { saldo: 0 };
          db.data.users[trgt].saldo += parseInt(pay.get_balance) - feeBot;

          m.reply(`💸 *Saldo Berhasil Ditambahkan* 💸

📌 Detail:
📞 Nomor: ${m.sender}
🏧 Nominal Awal: Rp ${toRupiah(pay.nominal)}
💸 Fee API: Rp ${toRupiah(pay.fee)}
🪙 Fee Bot: Rp ${toRupiah(feeBot)}
📥 Saldo Masuk: Rp ${toRupiah(pay.get_balance - feeBot)}

✨ Silakan ketik *.saldo* untuk melihat total saldo Anda saat ini.`);
        }
      } catch (error) {
        console.error('Error checking status:', error);
      }

      if (!isTransactionComplete) {
        await new Promise(resolve => setTimeout(resolve, 10000)); // 10s polling
      }
    }
  } catch (error) {
    console.error('Error deposit flow:', error);
    m.reply('❌ Gagal membuat atau memeriksa pembayaran.');
  }
};

handler.help = handler.command = ["deposit"];
handler.tags = ["store"];
handler.register = true;
module.exports = handler;

// helper
function toRupiah(angka) {
  var saldo = '';
  var angkarev = angka.toString().split('').reverse().join('');
  for (var i = 0; i < angkarev.length; i++)
    if (i % 3 == 0) saldo += angkarev.substr(i, 3) + '.';
  return saldo.split('', saldo.length - 1).reverse().join('');
}