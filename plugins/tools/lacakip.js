
let handler = async (m, { text, usedPrefix, command, conn }) => {
  if (!text) throw `*Example:* ${usedPrefix + command} 112.90.150.204`;

  try {
    await m.reply('Please wait... fetching IP information.');

    let res = await fetch(`https://ipwho.is/${text}`).then(result => result.json());

    if (res.error) {
      throw `Error: ${res.error.message || 'Could not fetch data for this IP.'}`;
    }
    await conn.sendMessage(m.chat, {
      location: { degreesLatitude: res.latitude, degreesLongitude: res.longitude }
    }, { ephemeralExpiration: 604800 });

    await delay(2000);

    conn.reply(m.chat, JSON.stringify(res, null, 2), m);

  } catch (e) {
    console.error('Error fetching IP information:', e); 
    throw `Error: ${e.message || 'An unknown error occurred.'}`;
  }
}

handler.command = handler.help = ['lacakip', 'cekip'];
handler.tags = ['tools'];
handler.premium = false;

module.exports = handler;

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}