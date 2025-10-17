let axios = require('axios');
let cheerio = require('cheerio');

var handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `Masukkan Judul!\n\nContoh: ${usedPrefix + command} ayam goreng`;
  conn.sendMessage(m.chat, {
    react: {
      text: '🕒',
      key: m.key,
    }
  });
  try { 
    var res = await cariresep(text);
    var hasil = res.data.map(item => `•  Title: *${item.judul}*
•  Link: 
 ( *${item.link}* )

`).join("\n");
    var name = m.sender;
    var fkonn = { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(m.chat ? { remoteJid: '0@s.whatsapp.net' } : {}) }, message: { contactMessage: { displayName: `${await conn.getName(name)}`, vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;a,;;;\nFN:${name}\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}};
    let txt = `Jika ingin melihat Detail Pembuatan bisa mengetikkan ${usedPrefix}detailresep link\n\nExample: ${usedPrefix}detailresep https://resepkoki.id/resep/xxxxxxxxxxxxx/`;
    await conn.sendMessage(m.chat, {
      text: txt + '\n\n' + hasil,
      contextInfo: {
        externalAdReply: {
          title: 'Pokii Search Recipe',
          body: 'Hasil pencarian dari ' + text, 
          thumbnailUrl: 'https://telegra.ph/file/d29646fef11e48db3b105.jpg',
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    }, { quoted: fkonn });
  } catch (error) {
    console.error(error);
    return m.reply('Terjadi kesalahan\nCode : ' + error);
  }
}

handler.command = handler.help = ['searchrecipe', 'cariresep'];
handler.tags = ['search'];

module.exports = handler;

async function cariresep(query) {
  return new Promise(async (resolve, reject) => {
    axios.get('https://resepkoki.id/?s=' + query).then(({ data }) => {
      const $ = cheerio.load(data);
      const link = [];
      const judul = [];
      const format = [];
      $('body > div.all-wrapper.with-animations > div:nth-child(5) > div > div.archive-posts.masonry-grid-w.per-row-2 > div.masonry-grid > div > article > div > div.archive-item-media > a').each(function(a, b) {
        link.push($(b).attr('href'));
      });
      $('body > div.all-wrapper.with-animations > div:nth-child(5) > div > div.archive-posts.masonry-grid-w.per-row-2 > div.masonry-grid > div > article > div > div.archive-item-content > header > h3 > a').each(function(c, d) {
        let jud = $(d).text();
        judul.push(jud);
      });
      for (let i = 0; i < link.length; i++) {
        format.push({
          judul: judul[i],
          link: link[i]
        });
      }
      const result = {
        creator: 'Axell',
        data: format.filter(v => v.link.startsWith('https://resepkoki.id/resep'))
      };
      resolve(result);
    })
    .catch(reject);
  });
}