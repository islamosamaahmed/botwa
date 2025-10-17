const axios = require('axios');

const bingimgSearch = async (query) => {
  try {
    const response = await axios.get(`https://restapi.apibotwa.biz.id/api/bingimg?message=${encodeURIComponent(query)}`);
    const data = response.data;

    if (data.status === 200 && data.data && data.data.response) {
      return data.data.response;  
    } else {
      return 'Gambar tidak ditemukan untuk pencarian ini. Coba kata kunci lain.';
    }
  } catch (error) {
    console.error('Terjadi kesalahan:', error);
    return 'Terjadi kesalahan saat memproses permintaan. Coba lagi nanti.';
  }
};

var handler = async (m, { conn, text }) => {
  if (!text) throw 'Masukkan kata kunci pencarian gambar!';

  conn.reply(m.chat, 'Mencari gambar di Bing... Silakan tunggu sebentar...', m);

  const imageUrl = await bingimgSearch(text);

  if (imageUrl && imageUrl !== 'Gambar tidak ditemukan untuk pencarian ini.') {
    conn.sendFile(m.chat, imageUrl, 'image.jpg', `Gambar untuk pencarian: ${text}`, m);
  } else {
    conn.reply(m.chat, imageUrl, m); 
  }
};

handler.help = ['bingimg <query>'];
handler.tags = ['search'];
handler.command = /^(bingimg)$/i;

module.exports = handler;