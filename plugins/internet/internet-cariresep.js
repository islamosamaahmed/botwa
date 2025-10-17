let handler = async (m, { conn, text, usedPrefix, command }) => {
  conn.resep = conn.resep ? conn.resep : {};
  if (!text)
    throw `Masukkan nama makanan nya\n*Contoh:* ${usedPrefix + command} nasi goreng`;
  let resep = await Scraper.Api.cariresep(text);
  let hasil =
    `*± C A R I R E S E P . C O M* 
*Creator:* ${global.nameowner} 
*Pencarian:* ${text}
Silahkan Pilih nomor urutan resep dibawah ini ^^\n\n*[ HASIL  PENCARIAN ]*\n\n` +
    resep.data.map((item, index) => `*${index + 1}.* ${item.judul}`).join("\n");
  conn.reply(m.chat, hasil, m);

  conn.resep[m.sender] = resep;
};

handler.before = async (m, { conn }) => {
  conn.resep = conn.resep ? conn.resep : {};
  if (m.isBaileys) return;
  if (!conn.resep[m.sender]) return;
  if (!m.text) return;
  if (isNaN(m.text) || m.text <= 0 || m.text > conn.resep[m.sender].data.length)
    return;
  let { data, creator } = conn.resep[m.sender];
  let pilihan = data[m.text - 1].link;

  let url = await Scraper.Api.detailresep(pilihan);
  let hasil = `*± C A R I R E S E P . C O M*
*creator:* ${global.nameowner}
*Nama makanan:* ${url.data.judul || "nothing"}
*Waktu masak:* ${url.data.waktu_masak || "nothing"}
*Tingkat kesulitan:* ${url.data.tingkat_kesulitan || "nothing"}
*Bahan:* ${url.data.bahan || "nothing"}`;
  conn.sendFile(m.chat, url.data.thumb, null, hasil, m);
  delete conn.resep[m.sender];
};

handler.help = ["cariresep *[Name Food]*"];
handler.tags = ["internet"];
handler.command = ["cariresep"];

module.exports = handler;
