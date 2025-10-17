/*═══════════════════════════════════════════════════════
 *  ⌬  YT NeoShiroko Labs
 *═══════════════════════════════════════════════════════
 *  🌐  Website     : https://www.neolabsofficial.my.id
 *  ⌨︎  Developer   : https://zass.cloud
 *  ▶︎  YouTube     : https://www.youtube.com/@zassci_desu
 *  ⚙︎  Panel Murah : pteroku-desu.zass.cloud
 *
 *  ⚠︎  Mohon untuk tidak menghapus watermark ini
 *═══════════════════ © 2025 Zass Desuta ─════════════════════
 */
module.exports = {
  help: ["profile"], //nama fitur kamu
  usage: "", //deskripsi singkat
  command: ["profile"], //untuk eksekusi fitur nya
  category: ["info"], //fitur kamu termasuk kategori apa?
  run: async (m, { kgy, usedPrefix, command, text }) => {
    let q = m.quoted ? m.quoted : m;
    let user = db.data.users[q.sender];
    let pp = await kgy
      .profilePictureUrl(q.sender, "image")
      .catch((e) => "https://files.catbox.moe/7b0ib7.jpg");
    let cap = Func.Styles(`┌─⭓「 *PROFILE USER* 」
│ *• Status :* ${uptime(user.online)}
│ *• Nama :* ${user.name}
│ *• Umur :* ${user.age}
│ *• Limit :* ${user.limit}
│ *• Money :* ${Func.formatNumber(user.money)}
│ *• Level :* ${user.level}
│ *• Role :* ${user.role}
│ *• Total hit :* ${user.hit || 0}
└───────────────⭓

*[ ${user.premium ? "✓" : "x"} ]* Status premium
*[ ${user.banned ? "✓" : "x"} ]* Status banned`);
    if (pp) {
      m.reply(cap, pp);
    } else m.reply(cap);
  },
  wait: true, //menampilkan pesan menunggu
  owner: false, //Fitur ini Khusus owner
  group: false, //Fitur ini khusus didalam group
  private: false, //Fitur ini khusus di private chat
  botadmin: false, //Fitur ini khusus ketikan bot menjadi admin
  premium: false, //Fitur ini khusus pengguna premium
  error: 0, //Menghitung total Error ( Jangan di ubah )
  update: Date.now(), //kapan terakhir fitur ini di perbarui? ( Jangan di ubah )
  description: "Menampilkan informasi anda",
};

/*====[ FUNCTION ]=====*/
function uptime(ms) {
  const currentTime = Date.now();
  const startTime = new Date(ms).getTime();
  const elapsedTime = currentTime - startTime;
  const seconds = Math.floor(elapsedTime / 1000) % 60;
  const minutes = Math.floor(elapsedTime / (1000 * 60)) % 60;
  const hours = Math.floor(elapsedTime / (1000 * 60 * 60)) % 24;
  const days = Math.floor(elapsedTime / (1000 * 60 * 60 * 24));
  let uptimeString = "";
  if (days > 0) {
    uptimeString += `${days} hari`;
  }
  if (hours > 0) {
    uptimeString += `${hours} jam `;
  }
  if (minutes > 0) {
    uptimeString += `${minutes} menit `;
  }
  uptimeString += `${seconds} detik `;
  if (seconds > 10) {
    return "Terakhir aktif : " + uptimeString;
  } else return "sedang aktif!";
}
