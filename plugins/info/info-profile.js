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

const { createCanvas, loadImage, registerFont } = require("canvas");
let bar = (min, max) => {
  const progress = (min / max) * 10;
  const filledBars = Math.floor(progress);
  const emptyBars = 10 - filledBars;

  const bar = "[" + "█".repeat(filledBars) + "▒".repeat(emptyBars) + "]";

  return bar;
};

let handler = async (m, { conn, text, usedPrefix, command }) => {
  const num = m.quoted?.sender || m.mentionedJid?.[0] || m.sender;
  const user = db.data.users[num];
  try {
    let pp = await conn
      .profilePictureUrl(num, "image")
      .catch((e) => "https://files.catbox.moe/ifx2y7.png");
    let name = user.name;
    let umur = user.age;
    let register = user.registered ? "✓" : "x";
    let premium = user.premium ? "✓" : "x";
    let limit = isNaN(user.limit) ? user.limit : Func.formatNumber(user.limit);
    let premiumDate = isNaN(user.premiumDate)
      ? user.premiumDate
      : `${(await Func.toDate(user.premiumDate)) || "Nothing expired"}`;
    let { currentXp, currentLevel, nextLevel, xpToLevelUp, remainingXp } =
      Func.leveling(user.exp, global.multiplier, 100);
    const text = user.name;
    const blurRadius = 89;
    const fontFilePath = "Comic Sans";
    const fontSize = 80;
    const width = 800;
    const height = 400;
    const backgroundImageUrl = "https://files.catbox.moe/5v0dfu.jpg";
    let bio;
    try {
      bio = await (await conn.fetchStatus(num)).status;
    } catch (e) {
      bio = "no bio yet";
    }
    const level = user.level;
    let photo = await backgroundText(
      text,
      blurRadius,
      fontFilePath,
      fontSize,
      width,
      height,
      backgroundImageUrl,
      pp,
      level,
      bio,
    );
    let caption = `
┌─⭓「 *PROFILE USER* 」
│ *• Name :* ${name}
│ *• Age :* ${user.age}
│ *• Tag :* @${num.split("@")[0]}
│ *• Url :* wa.me/${num.split("@")[0]}
│ *• Register :* ${register}
│ *• Limit :* ${user.limit}
│ *• Role :* ${user.role}
│ *• Level :* ${user.level}
│ *• Premium :* ${premium}
│ *• Exp :* ${Func.formatNumber(user.exp)}
│ *• Money :* ${Func.formatNumber(user.money)}
│ *• Progress :* ${bar(user.exp, xpToLevelUp)} ${Math.floor((user.exp / xpToLevelUp) * 100)}%
└───────────────⭓

*• Last Register :*
${require("moment-timezone")(user.regTime).tz("Asia/Jakarta").format("YYYY/MM/DD HH:mm:ss")} *[ ${await getUptime(user.regTime)} ]*`;
    m.reply(caption, photo);
  } catch (e) {
    throw e;
  }
};
handler.help = ["profile"];
handler.tags = ["info"];
handler.command = ["profile", "me", "infome", "akun", "infoprofile"];
handler.register = true;

module.exports = handler;

async function getUptime(startTime) {
  let currentTime = Date.now();
  let uptime = currentTime - startTime;
  let seconds = Math.floor(uptime / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);
  let days = Math.floor(hours / 24);

  hours %= 24;
  minutes %= 60;
  seconds %= 60;
  let dSeconds = seconds < 1 ? "" : seconds + " Detik";
  let dMinutes = minutes < 1 ? "" : minutes + " Menit";
  let dHours = hours < 1 ? "" : hours + " Jam";
  let dDays = days < 1 ? "" : days + " Hari";
  return dDays + dHours + dMinutes + dSeconds;
}

registerFont("./database/Good Bakwan.otf", {
  family: "Comic Sans",
});
async function createCircularAvatar(avatarUrl, size) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext("2d");

  const avatarImage = await loadImage(avatarUrl);

  ctx.beginPath();
  ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.clip();

  ctx.drawImage(avatarImage, 0, 0, size, size);

  ctx.strokeStyle = "#fff";
  ctx.lineWidth = 4;
  ctx.stroke();

  return canvas;
}

async function backgroundText(
  text,
  blurRadius,
  font,
  fontSize,
  width,
  height,
  imageUrl,
  avatarUrl,
  level,
  bio,
) {
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");

  const backgroundImage = await loadImage(imageUrl);
  ctx.drawImage(backgroundImage, 0, 0, width, height);

  ctx.filter = `blur(${blurRadius}px)`;

  const avatarSize = 200;
  const avatarImage = await createCircularAvatar(avatarUrl, avatarSize);

  const avatarX = (width - avatarSize) / 2;
  const avatarY = (height - avatarSize) / 3;
  ctx.drawImage(avatarImage, avatarX, avatarY, avatarSize, avatarSize);

  ctx.font = `22px ${font}`;
  ctx.lineWidth = 4;
  ctx.strokeStyle = "#000";
  ctx.textBaseline = "bottom";
  ctx.textAlign = "center";
  ctx.fillStyle = "#fff";
  ctx.strokeText(bio, width / 2, width / 2.2);
  ctx.fillText(bio, width / 2, width / 2.2);

  ctx.font = `${fontSize}px ${font}`;
  ctx.lineWidth = 4;
  ctx.strokeStyle = "#000";
  ctx.textBaseline = "bottom";
  ctx.textAlign = "center";
  ctx.fillStyle = "#fff";

  ctx.strokeText(text, width / 2, width / 2.4);
  ctx.fillText(text, width / 2, width / 2.4);

  ctx.font = `40px ${font}`;
  ctx.lineWidth = 2;
  ctx.strokeStyle = "#000";
  ctx.fillStyle = "#fff";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.strokeText(`Level: ${level}`, 10 * 2, 5 * 2);
  ctx.fillText(`Level: ${level}`, 10 * 2, 5 * 2);

  return canvas.toBuffer();
}
