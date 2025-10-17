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
 
const simple = require("./lib/simple.js");
const util = require("util");
const moment = require("moment-timezone");
const fs = require("fs");
const { exec } = require("child_process");
const {
  WAMessageStubType,
  generateWAMessage,
  areJidsSameUser,
  getAggregateVotesInPollMessage,
  proto,
  jidNormalizedUser,
} = require("@whiskeysockets/baileys");
const chalk = require("chalk");

const isNumber = (x) => typeof x === "number" && !isNaN(x);
const delay = (ms) =>
  isNumber(ms) && new Promise((resolve) => setTimeout(resolve, ms));

(module.exports = {
  async handler(chatUpdate) {
    //console.log(plugins)
    if (global.db.data == null) await loadDatabase();
    this.msgqueque = this.msgqueque || [];
    if (!chatUpdate) return;
    this.pushMessage(chatUpdate.messages).catch(console.error);
    let m = chatUpdate.messages[chatUpdate.messages.length - 1];
    if (!m) return;
    if (m.mtype === "protocolMessage") return;
    if (m.message?.viewOnceMessageV2)
      m.message = m.message.viewOnceMessageV2.message;
    if (m.message?.documentWithCaptionMessage)
      m.message = m.message.documentWithCaptionMessage.message;
    if (m.message?.viewOnceMessageV2Extension)
      m.message = m.message.viewOnceMessageV2Extension.message;
    if (!m) return;
    try {
      m = simple.smsg(this, m) || m;
      if (!m) return;
      m.exp = 0;
      m.limit = false;

      try {
        require("./lib/database.js")(m);
      } catch (e) {
        console.error(e);
      }
      function normalizeUserId(id) {
  if (!id) return ""
  // Kalau formatnya LID
  if (id.endsWith("@lid")) {
    // ambil angkanya doang
    let num = id.split("@")[0]
    // WA biasanya = nomor + domain
    return jidNormalizedUser(num + "@s.whatsapp.net")
  }
  // Kalau format normal atau polos
  if (id.includes("@")) return jidNormalizedUser(id)
  return jidNormalizedUser(id + "@s.whatsapp.net")
}
      const ownerList = global.owner.map(o => normalizeUserId(o))
      const senderId = normalizeUserId(m.sender)
      const isROwner = ownerList.includes(senderId)
      const isOwner = isROwner || m.fromMe
      const isMods = global.db.data.users[m.sender].moderator;
      const isPrems = global.db.data.users[m.sender].premium;
      const isBans = global.db.data.users[m.sender].banned;
      const isWhitelist = global.db.data.chats[m.chat].whitelist;
      if (m.isGroup) {
        let member = await (
          await store.fetchGroupMetadata(m.chat, conn)
        ).participants.map((a) => a.id);
        db.data.chats[m.chat].member = member;
        db.data.chats[m.chat].chat += 1;
      }
      if (
        m.messageStubType ===
        (WAMessageStubType.CALL_MISSED_VOICE ||
          WAMessageStubType.CALL_MISSED_VIDEO)
      ) {
        await conn.reply(
          m.chat,
          "*[ System Notif ]* You are call this bot, I will blockir You",
          null,
        );
        await conn.delay(1000);
        await conn.updateBlockStatus(m.chat, "block");
      }

      if (isROwner) {
        db.data.users[m.sender].premium = true;
        db.data.users[m.sender].premiumDate = "PERMANENT";
        db.data.users[m.sender].limit = "PERMANENT";
        db.data.users[m.sender].moderator = true;
      } else if (isPrems) {
        db.data.users[m.sender].limit = "PERMANENT";
      } else if (!isROwner && isBans) return;

      if (opts["queque"] && m.text && !(isMods || isPrems)) {
        let queque = this.msgqueque,
          time = 1000 * 5;

        const previousID = queque[queque.length - 1];
        queque.push(m.id || m.key.id);
        setInterval(async function () {
          if (queque.indexOf(previousID) === -1) clearInterval(this);
          else await delay(time);
        }, time);
      }
      db.data.users[m.sender].online = new Date() * 1;
      db.data.users[m.sender].chat += 1;
      if (opts["autoread"]) await this.readMessages([m.key]);
      if (opts["nyimak"]) return;
      if (
        !m.fromMe &&
        !isOwner &&
        !isPrems &&
        !isMods &&
        !isWhitelist &&
        opts["self"]
      )
        return;
      if (opts["pconly"] && m.chat.endsWith("g.us")) return;
      if (opts["gconly"] && !m.fromMe && !m.chat.endsWith("g.us")) return;
      if (opts["swonly"] && m.chat !== "status@broadcast") return;

      if (typeof m.text !== "string") {
  m.text =
    m.message?.conversation ||
    m.message?.extendedTextMessage?.text ||
    m.message?.imageMessage?.caption ||
    m.message?.videoMessage?.caption ||
    m.message?.documentMessage?.caption ||
    "";
}
      if (m.isBaileys) return;
      m.exp += Math.ceil(Math.random() * 1000);

      let usedPrefix;
      let _user =
        global.db.data &&
        global.db.data.users &&
        global.db.data.users[m.sender];

       
          const groupMetadata = store.groupMetadata[m.chat];
      const participants =
        (m.isGroup
          ? await (
              await store.groupMetadata[m.chat]
            ).participants
          : []) || [];
      const user =
        (m.isGroup
          ? participants.find((u) => conn.decodeJid(u.id) === m.sender)
          : {}) || {}; // User Data
      const bot =
        (m.isGroup
          ? participants.find((u) => conn.decodeJid(u.id) == this.user.jid)
          : {}) || {}; // Your Data
      const isRAdmin = (user && user.admin == "superadmin") || false;
      const isAdmin = isRAdmin || (user && user.admin == "admin") || false; // Is User Admin?
      const isBotAdmin = (bot && bot.admin) || false; // Are you Admin?
      for (let name in global.plugins) {
        var plugin;
        if (typeof plugins[name].code === "function") {
          var ai = plugins[name];
          plugin = ai.code;
          for (var prop in ai) {
            if (prop !== "run") {
              plugin[prop] = ai[prop];
            }
          }
        } else {
          plugin = plugins[name];
        }
        if (!plugin) continue;
        if (plugin.disabled) continue;
        if (typeof plugin.all === "function") {
          try {
            await plugin.all.call(this, m, chatUpdate);
          } catch (e) {
            console.error(e);
          }
        }
        const str2Regex = (str) => str.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&");
        let _prefix = plugin.customPrefix
          ? plugin.customPrefix
          : conn.prefix
            ? conn.prefix
            : global.prefix;
        let match = (
          _prefix instanceof RegExp // RegExp Mode?
            ? [[_prefix.exec(m.text), _prefix]]
            : Array.isArray(_prefix) // Array?
              ? _prefix.map((p) => {
                  let re =
                    p instanceof RegExp // RegExp in Array?
                      ? p
                      : new RegExp(str2Regex(p));
                  return [re.exec(m.text), re];
                })
              : typeof _prefix === "string" // String?
                ? [
                    [
                      new RegExp(str2Regex(_prefix)).exec(m.text),
                      new RegExp(str2Regex(_prefix)),
                    ],
                  ]
                : [[[], new RegExp()]]
        ).find((p) => p[1]);
        if (typeof plugin.before === "function")
          if (
            await plugin.before.call(this, m, {
              match,
              conn: this,
              participants,
              groupMetadata,
              user,
              bot,
              isROwner,
              isOwner,
              isRAdmin,
              isAdmin,
              isBotAdmin,
              isPrems,
              isBans,
              chatUpdate,
            })
          )
            continue;
        if (typeof plugin !== "function") continue;
        const q = m.quoted ? m.quoted : m;
        if (opts && match && m) {
          let result =
            ((opts?.["multiprefix"] ?? true) && (match[0] || "")[0]) ||
            ((opts?.["noprefix"] ?? false) ? null : (match[0] || "")[0]);
          usedPrefix = result;
          let noPrefix;
          if (isOwner) {
            noPrefix = !result ? m.text : m.text.replace(result, "");
          } else {
            noPrefix = !result ? "" : m.text.replace(result, "").trim();
          }
          let [command, ...args] = noPrefix.trim().split` `.filter((v) => v);
          args = args || [];
          let _args = noPrefix.trim().split` `.slice(1);
          let text = _args.join` `;
          command = (command || "").toLowerCase();
          let fail = plugin.fail || global.dfail;

          const prefixCommand = !result
            ? plugin.customPrefix || plugin.command
            : plugin.command;
          let isAccept =
            (prefixCommand instanceof RegExp && prefixCommand.test(command)) ||
            (Array.isArray(prefixCommand) &&
              prefixCommand.some((cmd) =>
                cmd instanceof RegExp ? cmd.test(command) : cmd === command,
              )) ||
            (typeof prefixCommand === "string" && prefixCommand === command);
          m.prefix = !!result;
          usedPrefix = !result ? "" : result;
          if (!isAccept) continue;
          m.plugin = name;
          m.chatUpdate = chatUpdate;
          if (
            m.chat in global.db.data.chats ||
            m.sender in global.db.data.users
          ) {
            let chat = global.db.data.chats[m.chat];
            let user = global.db.data.users[m.sender];
            if (
              name != "owner-unbanchat.js" &&
              chat &&
              chat.isBanned &&
              !isOwner
            )
              return;
            if (
              name != "group-unmute.js" &&
              chat &&
              chat.mute &&
              !isAdmin &&
              !isOwner
            )
              return;
          }

          if (db.data.settings.blockcmd.includes(command)) {
            dfail("block", m, this);
            continue;
          }
          if (plugin.rowner && plugin.owner && !(isROwner || isOwner)) {
            fail("owner", m, this);
            continue;
          }
          if (plugin.rowner && !isROwner) {
            fail("rowner", m, this);
            continue;
          }
          if (plugin.restrict) {
            fail("restrict", m, this);
            continue;
          }
          if (plugin.owner && !isOwner) {
            fail("owner", m, this);
            continue;
          }
          if (plugin.mods && !isMods) {
            fail("mods", m, this);
            continue;
          }
          if (plugin.premium && !isPrems) {
            fail("premium", m, this);
            continue;
          }
          if (plugin.banned && !isBans) {
            fail("banned", m, this);
            continue;
          }
          if (plugin.group && !m.isGroup) {
            fail("group", m, this);
            continue;
          } else if (plugin.botAdmin && !isBotAdmin) {
            fail("botAdmin", m, this);
            continue;
          } else if (plugin.admin && !isAdmin) {
            fail("admin", m, this);
            continue;
          }
          if (plugin.private && m.isGroup) {
            fail("private", m, this);
            continue;
          }
          if (plugin.register == true && _user.registered == false) {
            fail("unreg", m, this);
            continue;
          }
          let cmd;
          m.command = command;
          m.isCommand = true;
          if (m.isCommand) {
            let now = Date.now();
            if (m.command in global.db.data.respon) {
              cmd = global.db.data.respon[m.command];
              if (!isNumber(cmd.total)) cmd.total = 1;
              if (!isNumber(cmd.success)) cmd.success = m.error != null ? 0 : 1;
              if (!isNumber(cmd.last)) cmd.last = now;
              if (!isNumber(cmd.lastSuccess))
                cmd.lastSuccess = m.error != null ? 0 : now;
            } else
              cmd = db.data.respon[m.command] = {
                total: 1,
                success: m.error != null ? 0 : 1,
                last: now,
                lastSuccess: m.error != null ? 0 : now,
              };
            cmd.total += 1;
            cmd.last = now;
            if (m.error == null) {
              cmd.success += 1;
              cmd.lastSuccess = now;
            }
          }
          let xp = "exp" in plugin ? parseInt(plugin.exp) : 17;
          if (xp > 9999999999999999999999) m.reply("Ngecit -_-");
          else m.exp += xp;
          if (!_user.limit > 100 && _user.limit < 7) {
            let limit = `*「 ᴀᴄᴄᴇꜱꜱ ᴅᴀɴɪᴇᴅ 」* ᴍᴀᴀꜰ ʟɪᴍɪᴛ ᴀɴᴅᴀ ᴛᴇʟᴀʜ ʜᴀʙᴜꜱ ɴᴀᴍᴜɴ ᴊɪᴋᴀ ɪɴɢɪɴ ʟɪᴍɪᴛ ᴘᴇʀᴍᴀɴᴇɴᴛ ꜱɪʟᴀʜᴋᴀɴ ᴜᴘɢʀᴀᴅᴇ ᴋᴇ *ᴘʀᴇᴍɪᴜᴍ*`;
            conn.sendMessage(
              m.chat,
              {
                text: limit,
              },
              { quoted: m },
            );
            continue;
          }
          if (plugin.level > _user.level) {
            let level = `*「 ᴀᴄᴄᴇꜱꜱ ᴅᴀɴɪᴇᴅ 」* ᴋᴀᴍᴜ ᴘᴇʀʟᴜ ʟᴇᴠᴇʟ *[ ${plugin.level} ]*, ᴜɴᴛᴜᴋ ᴍᴇɴɢᴀᴋsᴇs ɪɴɪ, sɪʟᴀᴋᴀɴ ᴍᴀɪɴ  ᴍɪɴɪɢᴀᴍᴇs ᴀᴛᴀᴜ ʀᴘɢ ᴜɴᴛᴜᴋ ᴍᴇɴɪɴɢᴋᴀᴛᴋᴀɴ ʟᴇᴠᴇʟ ᴀɴᴅᴀ`; 
            conn.sendMessage(
              m.chat,
              {
                text: level,
              },
              { quoted: m },
            );
            continue;
          }
          let extra = {
            match,
            usedPrefix,
            noPrefix,
            _args,
            args,
            command,
            text,
            conn: this,
            participants,
            groupMetadata,
            user,
            bot,
            isROwner,
            isOwner,
            isRAdmin,
            isAdmin,
            isBotAdmin,
            isPrems,
            isBans,
            chatUpdate,
          };
          try {
            await plugin.call(this, m, extra);
            if (!isPrems) m.limit = m.limit || plugin.limit || true;
          } catch (e) {
            m.error = e;
            console.error("Error", e);
            if (e) {
              let text = util.format(e);
              conn.logger.error(text);
              if (text.match("rate-overlimit")) return;
              if (e.name) {
                for (let jid of global.owner) {
                  let data = (await conn.onWhatsApp(jid))[0] || {};
                  if (data.exists)
                    this.reply(
                      data.jid,
                      `*[ REPORT ERROR ]*
*• Name Plugins :* ${m.plugin}
*• From :* @${m.sender.split("@")[0]} *(wa.me/${m.sender.split("@")[0]})*
*• Jid Chat :* ${m.chat} 
*• Command  :* ${usedPrefix + command}

*• Error Log :*
\`\`\`${text}\`\`\`
`.trim(),
                      fkontak,
                    );
                }
                m.reply("*[ system notice ]* Terjadi kesalahan pada bot !");
              }
              m.reply(e);
            }
          } finally {
            if (typeof plugin.after === "function") {
              try {
                await plugin.after.call(this, m, extra);
              } catch (e) {
                console.error(e);
              }
            }
          }
          break;
        }
      }
    } catch (e) {
      let text = util.format(e);
      conn.logger.error(text);
      if (text.match("rate-overlimit")) return;
      console.error(chalk.red(e));
    } finally {
      if (opts["queque"] && m.text) {
        const quequeIndex = this.msgqueque.indexOf(m.id || m.key.id);
        if (quequeIndex !== -1) this.msgqueque.splice(quequeIndex, 1);
      }
      let user,
        stats = global.db.data.stats;
      if (m) {
        if (m.sender && (user = global.db.data.users[m.sender])) {
          user.exp += m.exp;
          user.limit -= m.limit * 7;
        }
        let stat;
        if (m.plugin) {
          let now = +new Date();
          if (m.plugin in stats) {
            stat = stats[m.plugin];
            if (!isNumber(stat.total)) stat.total = 1;
            if (!isNumber(stat.success)) stat.success = m.error != null ? 0 : 1;
            if (!isNumber(stat.last)) stat.last = now;
            if (!isNumber(stat.lastSuccess))
              stat.lastSuccess = m.error != null ? 0 : now;
          } else
            stat = stats[m.plugin] = {
              total: 1,
              success: m.error != null ? 0 : 1,
              last: now,
              lastSuccess: m.error != null ? 0 : now,
            };
          stat.total += 1;
          stat.last = now;
          if (m.error == null) {
            stat.success += 1;
            stat.lastSuccess = now;
          }
        }
      }
      try {
      require("./lib/print.js")(m, this, chatUpdate)
      if (global.levelup) {
      require("./lib/system.js")(m, this, chatUpdate)
      }
    } catch (e) {
      console.log(m, m.quoted, e)
    }
      if (opts["autoread"])
        await this.chatRead(
          m.chat,
          m.isGroup ? m.sender : undefined,
          m.id || m.key.id,
        ).catch(() => {});
    }
  },
  async participantsUpdate({ id, participants, action }) {
    /* case 'add':
			case 'revoked_membership_requests':
		
					break;
				case 'demote':
				case 'promote':
			
					break;
				case 'remove':
					break;*/
    if (opts["self"]) return;
    if (global.isInit) return;
    let chat = global.db.data.chats[id] || {};
    let metadata = store.groupMetadata[id];
    let text = "";
    switch (action) {
      case "add":
case "remove":
  if (chat.welcome) {
    let groupMetadata =
      store.groupMetadata[id] || store.fetchGroupMetadata(id, this);
    for (let user of participants) {
      let pp = "https://i.ibb.co/sQTkHLD/ppkosong.png";
      try {
        pp = await this.profilePictureUrl(user, "image");
      } catch (e) {}

      let text = action === "add"
        ? (chat.sWelcome || "Selamat datang, @user!")
          .replace("@user", "@" + user.split("@")[0])
          .replace("@subject", await this.getName(id))
        : (chat.sBye || "Selamat tinggal, @user!")
          .replace("@user", "@" + user.split("@")[0]);

      let buttons = action === "add"
        ? [
            { buttonId: ".intro", buttonText: { displayText: "🎉 INTRODUCTION" }, type: 1 },
          ]
        : [
            { buttonId: ".sayonara", buttonText: { displayText: "🕊️ SAYONARA" }, type: 1 },
          ];

      await conn.sendMessage(id, {
        image: { url: pp },
        caption: text,
        footer: wm,
        buttons: buttons,
        viewOnce: true,
        headerType: 4,
      });
    }
  }
  break;
      case "promote":
      case "demote":
        for (const participant of metadata.participants) {
          let mem = jidNormalizedUser(participant.id);
          if (participants.includes(mem)) {
            participant.admin = action === "promote" ? "admin" : null;
          }
        }
        break;
    }
  },
  async deleteUpdate(message) {
    try {
      const { fromMe, id, participant } = message;
      if (fromMe) return;
      let msg = await this.serializeM(await this.loadMessage(id));
      if (!msg || !msg.message) return;
      //let chat = db.data?.chats[(msg.key?.remoteJid || participant || msg.chat)] || {};
      //f (!chat.antiDelete) return;
      const mtype = await getContentType(msg.message);
      if (mtype === "conversation") {
        msg.message.extendedTextMessage = { text: msg.message[mtype] };
      }
      await this.reply(
        msg.key?.remoteJid || participant || msg.chat,
        `*[ System notice ]* delete message detected !`,
        fkontak,
      );
      await this.copyNForward(
        msg.key?.remoteJid || participant || msg.chat,
        msg || null,
        false,
      ).catch((e) => console.log(e, msg));
    } catch (e) {
      console.error(e);
    }
  },
  async pollUpdate(message) {
    for (const { key, update } of message) {
      if (message.pollUpdates) {
        const pollCreation = this.loadMessage(key.id);
        if (pollCreation) {
          const pollMessage = await getAggregateVotesInPollMessage({
            message: pollCreation.message,
            pollUpdates: pollCreation.pollUpdates,
          });
          message.pollUpdates[0].vote = pollMessage;
          console.log(pollMessage);
        }
      }
    }
  },
}),
  (global.dfail = (type, m, conn) => {
    let msg = {
      rowner: '*「 ᴀᴄᴄᴇꜱꜱ ᴅᴀɴɪᴇᴅ 」* • ᴄᴏᴍᴍᴀɴᴅ ɪɴɪ ʜᴀɴʏᴀ ᴜɴᴛᴜᴋ ᴅᴇᴠᴇʟᴏᴘᴇʀ ʙᴏᴛ',
     owner:  '*「 ᴀᴄᴄᴇꜱꜱ ᴅᴀɴɪᴇᴅ 」* • ᴄᴏᴍᴍᴀɴᴅ ɪɴɪ ʜᴀɴʏᴀ ᴜɴᴛᴜᴋ ᴅᴇᴠᴇʟᴏᴘᴇʀ ʙᴏᴛ',
      mods:  '*「 ᴀᴄᴄᴇꜱꜱ ᴅᴀɴɪᴇᴅ 」* • ᴄᴏᴍᴍᴀɴᴅ ɪɴɪ ʜᴀɴʏᴀ ᴜɴᴛᴜᴋ ᴍᴏᴅᴇʀᴀᴛᴏʀ ʙᴏᴛ',
      group:  '*「 ᴀᴄᴄᴇꜱꜱ ᴅᴀɴɪᴇᴅ 」* • ᴄᴏᴍᴍᴀɴᴅ ɪɴɪ ʜᴀɴʏᴀ ʙɪsᴀ ᴅɪᴘᴀᴋᴀɪ ᴅɪᴅᴀʟᴀᴍ ɢʀᴏᴜᴘ',
      private:  '*「 ᴀᴄᴄᴇꜱꜱ ᴅᴀɴɪᴇᴅ 」* • ᴄᴏᴍᴍᴀɴᴅ ɪɴɪ ʜᴀɴʏᴀ ʙɪsᴀ ᴅɪᴘᴀᴋᴀɪ ᴅɪᴘʀɪᴠᴀᴛᴇ ᴄʜᴀᴛ',
      admin: '*「 ᴀᴄᴄᴇꜱꜱ ᴅᴀɴɪᴇᴅ 」* • ᴄᴏᴍᴍᴀɴᴅ ɪɴɪ ʜᴀɴʏᴀ ᴜɴᴛᴜᴋ ᴀᴅᴍɪɴ ɢʀᴏᴜᴘ',
      botAdmin: '*「 ᴀᴄᴄᴇꜱꜱ ᴅᴀɴɪᴇᴅ 」* • ᴄᴏᴍᴍᴀɴᴅ ɪɴɪ ʜᴀɴʏᴀ ʙɪsᴀ ᴅɪɢᴜɴᴀᴋᴀɴ ᴋᴇᴛɪᴋᴀ ʙᴏᴛ ᴍᴇɴᴊᴀᴅɪ ᴀᴅᴍɪɴ',
      block: `*sᴏʀʀʏ ᴄᴏᴍᴍᴀɴᴅ ʜᴀs ʙᴇᴇɴ ʙʟᴏᴄᴋᴇᴅ*`,
      unreg: '*ʏᴏᴜ ᴀʀᴇ ɴᴏᴛ ʀᴇɢɪsᴛᴇʀᴇᴅ ʏᴇᴛ* • ᴋᴇᴛɪᴋ  .daftar ᴜɴᴛᴜᴋ ʙɪsᴀ ᴍᴇɴɢɢᴜɴᴀᴋᴀɴ ғɪᴛᴜʀ ɪɴɪ',
      premium:  '*「 ᴀᴄᴄᴇꜱꜱ ᴅᴀɴɪᴇᴅ 」* • ᴄᴏᴍᴍᴀɴᴅ ɪɴɪ ʜᴀɴʏᴀ ᴜɴᴛᴜᴋ ᴘʀᴇᴍɪᴜᴍ ᴜsᴇʀ',
    }[type];
    if (msg)
      return conn.sendMessage(
        m.chat,
        {
          text: msg,
          contextInfo: {
            mentionedJid: conn.parseMention(msg),
            groupMentions: [],
            isForwarded: true,
            businessMessageForwardInfo: {
            businessOwnerJid: global.owner[0] + "@s.whatsapp.net",
            },
            forwardingScore: 256,
            externalAdReply: {
              title: "[ ACCESS DANIED ]",
              body: wm,
              thumbnailUrl: thumb,
              sourceUrl: null,
              mediaType: 1,
              renderLargerThumbnail: false,
            },
          },
        },
        { quoted: m },
      );
  });

let file = require.resolve(__filename);
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  console.log(chalk.redBright("Update 'handler.js'"));
  delete require.cache[file];
  if (global.reloadHandler) console.log(global.reloadHandler());
});
