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

let moment = require("moment-timezone");

module.exports = {
  help: ["daftar", "register", "reg", ",verify"].map(
    (a) => a + " *[name.age]*",
  ),
  tags: ["info"],
  command: ["daftar", "register", "reg", ",verify"],
  code: async (m, { conn, text, usedPrefix, command }) => {
    conn.captcha = conn.captcha || {};
    const user = db.data.users[m.sender];
    if (user.registered) throw "*[ YOU ALREADY REGISTERED ]*";
    if (!text) throw `*• Example :* ${usedPrefix + command} *[name.age]*`;
    try {
      const pp = await conn
        .profilePictureUrl(m.sender, "image")
        .catch((e) => "https://telegra.ph/file/241b747767455c4bcfc7b.jpg");
      let [name, age] = text.split(".");
      if (isNaN(age)) throw `*[ ! ] Input Number for age*`;
      if (age < 5) throw `*[ ! ] You are too young*`;
      if (age > 50) throw `*[ ! ] You're too old*`;
      let id = await Func.makeId(25);
      if (global.captcha && !conn.captcha[m.sender] && !user.registered) {
        let otp = Func.makeId(7);
        let cap = `*[ Process Verification ]*
*• Name :* ${name}
*• Age :* ${age}
*• Registered :* false 

Selesaikan verifikasi anda dengan mengetik kode sesuai yang ada pada gambar
      `;
        conn.sendMessage(
          m.chat,
          {
            image: await captcha(otp),
            caption: cap,
          },
          {
            quoted: m,
          },
        );
        conn.captcha[m.sender] = {
          code: otp,
          name: name,
          age: age,
        };
      } else {
        user.registered = true;
        user.age = age;
        user.name = name;
        user.regTime = Date.now();
        user.sn = "Ak-" + id;
        let key = await conn.sendMessage(
          m.chat,
          {
            image: {
              url: pp,
            },
            caption: "*[ PROCESS VERIFY.... ]*",
          },
          {
            quoted: m,
          },
        );
        await conn.sendMessage(
          m.chat,
          {
            image: {
              url: pp,
            },
            caption: `*[ VERIFY  SUCCESS ]*
*• Name:* ${user.name} *[ @${m.sender.split("@")[0]} ]*
*• Age:* ${user.age} y/o
*• ID:* Ak-${id}
*• Register Time :* ${moment.tz(user.regTime, "Asia/Jakarta").format("YYYY-MM-DD HH:mm:ss")}

*✅ Terima kasih telah mendaftar diri dengan bot ini, kami akan menyimpan semua data Anda dengan baik di database kami tanpa kehilangan apa pun*`,
            edit: key.key,
            contextInfo: {
              mentionedJid: [m.sender],
            },
          },
          {
            quoted: m,
          },
        );
        delete conn.captcha[m.sender];
      }
    } catch (e) {
      throw e;
    }
  },
  before: async (m, { conn }) => {
    conn.captcha = conn.captcha ? conn.captcha : {};
    if (!m.text) return;
    if (!conn.captcha[m.sender]) return;
    let { code, name, age } = conn.captcha[m.sender];
    if (m.text.toLowerCase() === code.toLowerCase()) {
      await conn.appendTextMessage(m, `.daftar ${name}.${age}`, m.chatUpdate);
    }
  },
};

async function captcha(id) {
  let { createCanvas, loadImage } = require("canvas");
  let canvas = createCanvas(2500, 1000);
  var ctx = canvas.getContext("2d");
  ctx.drawImage(
    await loadImage("https://files.catbox.moe/t4g3ds.jpg"),
    0,
    0,
    2500,
    1000,
  );
  ctx.font = "250px Comic Sans";
  ctx.fillStyle = "#000000";
  ctx.lineWidth = 5;
  ctx.strokeStyle = "#000000";
  ctx.textAlign = "center";
  ctx.strokeText(id, 2500 / 2, 1000 / 2);
  ctx.fillText(id, 2500 / 2, 1000 / 2);
  return canvas.toBuffer();
}
