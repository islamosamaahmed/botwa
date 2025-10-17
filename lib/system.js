const cron = require("node-cron");
const Function = require("./func.js");
const Func = new Function();
const { xeec } = require("child_process");
const util = require("util");
module.exports = async (m, conn = {}, chatUpdate) => {
  if (m.mtype === "protocolMessage") return;
  const groupMetadata = store.groupMetadata[m.chat];
  const participants = (m.isGroup ? groupMetadata.participants : []) || [];
  const user =
    (m.isGroup
      ? participants.find((u) => conn.decodeJid(u.id) === m.sender)
      : {}) || {}; // User Data
  const bot =
    (m.isGroup
      ? participants.find((u) => conn.decodeJid(u.id) === conn.user.jid)
      : {}) || {}; // Bot Data
  const isRAdmin = user?.admin === "superadmin" || false;
  const isAdmin = isRAdmin || user?.admin === "admin" || false; // Is User Admin?
  const isBotAdmin = bot?.admin || false; // Is Bot Admin?
  const isOwner = global.owner.includes(m.sender.split("@")[0]);

  cron.schedule(
    "00 01 * * *",
    () => {
      let users = global.db.data.users;
      let resetUsers = Object.entries(users).filter(
        ([user, data]) => data.limit < 10000000,
      );

      if (resetUsers.length > 0 && !messageSent) {
        let limit = 100;
        resetUsers.forEach(([user, data]) => {
          data.limit = limit;
        });
        // console.log("Reset Limit");
      }
    },
    {
      scheduled: true,
      timezone: "Asia/Jakarta",
    },
  );

  const chat = db.data.chats[m.chat];
  let detect = false;
  if (chat.antiBot) {
    if (m.isBaileys || m.id.startsWith("3EB0")) {
      if (!m.fromMe) {
        await conn.sendMessage(m.chat, {
          text: `*[ System notice ]* Detect another bot, I will kick you`,
        });
        await conn.groupParticipantsUpdate(m.chat, [m.sender], "remove");
        await conn.delay(2000);
        detect = true;
      }
    }
  }

  let linkRegex = /chat.whatsapp.com\/([0-9A-Za-z]{20,24})/i;
  if (m.isGroup) {
    let isGroupLink = linkRegex.exec(m.text);
    if (isAdmin) return;
    if (!isBotAdmin) return;
    if (chat.antiLink && isGroupLink) {
      m.reply(
        `*[ System Detected ]* you sent another group link, I will delete this`,
      );
      conn.sendMessage(m.chat, {
        delete: {
          ...m.key,
        },
      });
    }
  }

  let users = db.data.users[m.sender];
  let { currentXp, currentLevel, nextLevel, xpToLevelUp, remainingXp } =
    await Func.leveling(users.exp, global.multiplier, 100);

  if (users.level !== currentLevel) {
    users.level = currentLevel;
    users.role = await Func.role(users.level);
    m.reply(
      await Func.Styles(
        `*± L E V E L - U P !*\n\n*• Name :* ${users.name}\n*• Unlock level :* ${users.level - 1} ~> ${users.level}\n*• New role :* ${users.role}\n*• Your Exp :* ${users.exp} *[ ${remainingXp} to LevelUp ]*\n*• Exp for levelup :* ${xpToLevelUp}\n\nTingkatkan level mu dengan bermain game yang sudah tersedia !`,
      ),
      "https://files.catbox.moe/hkoant.jpg",
    );
  }
};

let chalk = require("chalk");
let fs = require("fs");
let file = require.resolve(__filename);
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  delete require.cache[file];
  if (global.reloadHandler) console.log(global.reloadHandler());
});
