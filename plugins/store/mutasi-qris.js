let handler = async (m, { conn }) => {
  try {
    const response = await fetch('https://ciaatopup.my.id/h2h/mutasi', {
      method: 'GET',
      headers: {
        'X-APIKEY': global.apikey_ciaatopup 
        'Content-Type': 'application/json'
      }
    });

    const result = await response.json();

    let capt = '*📊 Q R I S  -  M U T A S I*\n\n';

    if (!result.success) {
      capt += '❌ Gagal mengambil data mutasi.';
    } else {
      // === Mutasi Deposit ===
      if (result.mutasiDeposit && result.mutasiDeposit.length > 0) {
        capt += '*💰 Mutasi Deposit:*\n';
        result.mutasiDeposit.forEach(entry => {
          capt += '```Tanggal:``` ' + `${formatDate(entry.created_at)}\n`;
          capt += '```Reff ID:``` ' + `${entry.reff_id}\n`;
          capt += '```Nominal:``` Rp ' + `${toRupiah(entry.nominal)}\n`;
          capt += '```Fee:``` Rp ' + `${toRupiah(entry.fee)}\n`;
          capt += '```Diterima:``` Rp ' + `${toRupiah(entry.get_balance)}\n`;
          capt += '```Metode:``` ' + `${entry.metode}\n`;
          capt += '```Status:``` ' + `${entry.status}\n\n`;
        });
      } else {
        capt += '_Tidak ada mutasi deposit_\n\n';
      }

      // === Mutasi Order ===
      if (result.mutasiOrder && result.mutasiOrder.length > 0) {
        capt += '*🛒 Mutasi Order:*\n';
        result.mutasiOrder.forEach(entry => {
          capt += '```Tanggal:``` ' + `${formatDate(entry.created_at)}\n`;
          capt += '```Reff ID:``` ' + `${entry.reff_id}\n`;
          capt += '```Layanan:``` ' + `${entry.layanan}\n`;
          capt += '```Target:``` ' + `${entry.target}\n`;
          capt += '```Harga:``` Rp ' + `${toRupiah(entry.price)}\n`;
          capt += '```SN:``` ' + `${entry.sn}\n`;
          capt += '```Status:``` ' + `${entry.status}\n\n`;
        });
      } else {
        capt += '_Tidak ada mutasi order_\n\n';
      }
    }

    await conn.reply(m.chat, `${capt}ID-${Func.makeId(20)}`, m);

  } catch (e) {
    console.error(e);
    await conn.reply(m.chat, '❌ Error mengambil mutasi:\n' + e.message, m);
  }
};

handler.tags = ['owner'];
handler.command = handler.help = ['mutasi'];
handler.owner = true;
module.exports = handler;

// === Helper Functions ===
function toRupiah(angka) {
  var saldo = '';
  var angkarev = angka.toString().split('').reverse().join('');
  for (var i = 0; i < angkarev.length; i++)
    if (i % 3 == 0) saldo += angkarev.substr(i, 3) + '.';
  return saldo.split('', saldo.length - 1).reverse().join('');
}

function formatDate(isoDate) {
  const date = new Date(isoDate);
  return date.toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' });
}