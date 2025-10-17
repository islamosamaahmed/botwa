const moment = require("moment-timezone");
const PhoneNumber = require("awesome-phonenumber");
const fs = require("fs");
const os = require("os");
const freeMemory = os.freemem();
const totalMemory = os.totalmem();
const usedMemory = totalMemory - freeMemory;
const Fungsi = require(process.cwd() + "/lib/func");
const Func = new Fungsi();
const formatSize = (size) => {
  function round(value, precision) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
  }
  var megaByte = 1024 * 1024;
  var gigaByte = 1024 * megaByte;
  var teraByte = 1024 * gigaByte;
  if (size < 1024) {
    return size + " B";
  } else if (size < megaByte) {
    return round(size / 1024, 1) + " KB";
  } else if (size < gigaByte) {
    return round(size / megaByte, 1) + " MB";
  } else if (size < teraByte) {
    return round(size / gigaByte, 1) + " GB";
  } else {
    return round(size / teraByte, 1) + " TB";
  }
  return "";
};
module.exports = {
  help: ["menu"].map((a) => a + " *[view main menu]*"),
  tags: ["main"],
  command: ["menu"],
  code: async (m, { conn, usedPrefix, command, args }) => {
    const perintah = args[0] || "tags";
    const tagCount = {};
    const tagHelpMapping = {};
    const user = global.db.data.users[m.sender];

    Object.keys(global.plugins)
      .filter((plugin) => !plugin.disabled)
      .forEach((plugin) => {
        const tagsArray = Array.isArray(global.plugins[plugin].tags)
          ? global.plugins[plugin].tags
          : [];

        if (tagsArray.length > 0) {
          const helpArray = Array.isArray(global.plugins[plugin].help)
            ? global.plugins[plugin].help
            : [global.plugins[plugin].help];

          tagsArray.forEach((tag) => {
            if (tag) {
              if (tagCount[tag]) {
                tagCount[tag]++;
                tagHelpMapping[tag].push(...helpArray);
              } else {
                tagCount[tag] = 1;
                tagHelpMapping[tag] = [...helpArray];
              }
            }
          });
        }
      });

    let help = Object.values(global.plugins)
      .filter((plugin) => !plugin.disabled)
      .map((plugin) => {
        return {
          help: Array.isArray(plugin.tags) ? plugin.help : [plugin.help],
          tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
          prefix: "customPrefix" in plugin,
          limit: plugin.limit,
          premium: plugin.premium,
          enabled: !plugin.disabled,
        };
      });

    if (perintah === "tags") {
      const daftarTag = Object.keys(tagCount)
        .sort()
        .join(`\n│ • *${usedPrefix + command}*`);
      const more = String.fromCharCode(8206);
      const readMore = more.repeat(4001);
      let _mpt;
      if (process.send) {
        process.send("uptime");
        _mpt =
          (await new Promise((resolve) => {
            process.once("message", resolve);
            setTimeout(resolve, 1000);
          })) * 1000;
      }
      let mpt = clockString(_mpt);
      let name = m.pushName || conn.getName(m.sender);
      let prn = thumb;
      let fitur = Object.values(plugins)
        .filter((v) => v.help && !v.disabled)
        .map((v) => v.help)
        .flat(1);
      let syaii =
      global.menu === "button"
          ?`${namebot} Adalah sistem otomatis whatsApp yang dapat membantu anda dalam hal apapun di WhatsApp!

saya di desain oleh Seorang Developer hebat yang mengembangkan bot whatsApp berbasis Javascript ini dengan menyajikan beberapa fitur seperti *AI*, *DOWNLOADER*, *GAME*, dan lainnya

▧  *「 INFO BOT 」*
│ • *Name :* ${namebot}
│ • *Running on :* ${process.env.USER === "container" ? "panel" : os.hostnams === "root" ? "vps" : "terminal"}
│ • *Total User :* ${Func.formatNumber(Object.keys(db.data.users).length)}
│ • *Total Chat :* ${Func.formatNumber(Object.keys(conn.chats).length)}
│ • *Total group :* ${Func.formatNumber(Object.keys(store.groupMetadata).length)}
│ • *Total Memory :* ${formatSize(totalMemory)}
│ • *Free Memory :* ${formatSize(freeMemory)}
│ • *Used Memory :* ${formatSize(usedMemory)}
└───···

▧  *「 INFO USER 」*
│ • *Name :* ${m.name}
│ • *Device :* ${m.device}
│ • *Register :* ${user.registered ? "✓" : "x"}
│ • *Premium :* ${user.premium ? "✓" : "x"}
│ • *Banned :* ${user.banned ? "✓" : "x"}
└───···
`: 
`${namebot} Adalah sistem otomatis whatsApp yang dapat membantu anda dalam hal apapun di WhatsApp!

saya di desain oleh Seorang Developer hebat yang mengembangkan bot whatsApp berbasis Javascript ini dengan menyajikan beberapa fitur seperti *AI*, *DOWNLOADER*, *GAME*, dan lainnya

▧  *「 INFO BOT 」*
│ • *Name :* ${namebot}
│ • *Running on :* ${process.env.USER === "container" ? "panel" : os.hostnams === "root" ? "vps" : "terminal"}
│ • *Total User :* ${Func.formatNumber(Object.keys(db.data.users).length)}
│ • *Total Chat :* ${Func.formatNumber(Object.keys(conn.chats).length)}
│ • *Total group :* ${Func.formatNumber(Object.keys(store.groupMetadata).length)}
│ • *Total Memory :* ${formatSize(totalMemory)}
│ • *Free Memory :* ${formatSize(freeMemory)}
│ • *Used Memory :* ${formatSize(usedMemory)}
└───···

▧  *「 INFO USER 」*
│ • *Name :* ${m.name}
│ • *Device :* ${m.device}
│ • *Register :* ${user.registered ? "✓" : "x"}
│ • *Premium :* ${user.premium ? "✓" : "x"}
│ • *Banned :* ${user.banned ? "✓" : "x"}
└───···

▧  *「 LIST MENU 」*
│ • .menu all
│ • .menu ${daftarTag}
└───···`;

      if (global.menu === "simple") {
        conn.reply(m.chat, syaii, fkontak);
      } else if (global.menu === "doc") {
        conn.sendMessage(
          m.chat,
          {
            document: {
              url: "https://wa.me/" + conn.user.jid.split("@")[0],
            },
            caption: syaii,
            mimetype: "text/html",
            fileName: wm,
            contextInfo: {
              mentionedJid: conn.parseMention(syaii),
              isForwarded: true,
              businessMessageForwardInfo: {
                businessOwnerJid: conn.user.jid,
              },
              externalAdReply: {
                title: wm,
                body: null,
                thumbnailUrl: thumb,
                sourceUrl: sgc,
                mediaType: 1,
                renderLargerThumbnail: true,
              },
            },
          },
          {
            quoted: fkontak,
          },
        );
      } else if (global.menu === "gif") {
        conn.sendMessage(
          m.chat,
          {
            video: {
              url: gif,
            },
            gifPlayback: true,
            gifAttribution: ~~(Math.random() * 2),
            caption: syaii,
            contextInfo: {
              mentionedJid: conn.parseMention(syaii),
              externalAdReply: {
                title: wm,
                body: null,
                thumbnailUrl: thumb,
                sourceUrl: sgc,
                mediaType: 1,
                renderLargerThumbnail: true,
              },
            },
          },
          {
            quoted: fkontak,
          },
        );
      } else if (global.menu === "payment") {
        await conn.relayMessage(
          m.chat,
          {
            requestPaymentMessage: {
              currencyCodeIso4217: "USD",
              amount1000:
                Object.values(plugins)
                  .filter((v) => v.help && !v.disabled)
                  .map((v) => v.help)
                  .flat(1).length * 1000,
              requestFrom: m.sender,
              noteMessage: {
                extendedTextMessage: {
                  text: syaii,
                  contextInfo: {
                    mentionedJid: conn.parseMention(syaii),
                    externalAdReply: {
                    },
                  },
                },
              },
            },
          },
          {
            usedJid: conn.user.jid,
            quoted: fkontak,
            upload: conn.waUploadToServer,
          },
        );
      } else if (global.menu === "edit") {
        const arr = [
          "➳ *L*",
          "➳ *L O*",
          "➳ *L O A*",
          "➳ *L O A D*",
          "➳ *L O A D I*",
          "➳ *L O A D I N*",
          "➳ *L O A D I N G*",
          "➳ *L O A D I N G .*",
          "➳ *L O A D I N G . .*",
          "➳ *L O A D I N G . . .*",
          "➳ *L O A D I N G . .*",
          "➳ *L O A D I N G .*",
          "➳ *L O A D I N G*",
          "➳ *W E L C O M E  T O  S H I R O K O  F K*",
          syaii,
        ];

        let { key } = await conn.sendMessage(
          m.chat,
          {
            image: {
              url: thumb,
            },
            caption: `➳ *Please Waif...*`,
            contextInfo: {
              mentionedJid: conn.parseMention(syaii),
              isForwarded: true,
              businessMessageForwardInfo: {
                businessOwnerJid: conn.user.jid,
              },
            },
          },
          {
            quoted: fkontak,
          },
        );
        for (let i = 0; i < arr.length; i++) {
          await conn.sendMessage(
            m.chat,
            {
              image: {
                url: "https://wa.me",
              },
              caption: arr[i],
              edit: key,
              contextInfo: {
                mentionedJid: conn.parseMention(syaii),
                isForwarded: true,
                businessMessageForwardInfo: {
                  businessOwnerJid: conn.user.jid,
                },
              },
            },
            {
              quoted: fkontak,
            },
          );
        }
      } else if (global.menu === "button") {      
      if (global.menu === "button") {
  const list = Object.keys(tagCount);
  let array = [];

  for (let i of list) {
    array.push({
      header: `( Menu ${i} )`,
      title: `Click to view command ${i}`,
      description: "",
      id: `${usedPrefix + command} ${i}`,
    });
  }

  const sections = [
    {
      title: 'INFORMATION BOT',
      rows: [
        {
          header: '• User Bot',
          title: 'View user bot',
          description: '',
          id: `${usedPrefix}user`,
        },
        {
          header: '• Server Info',
          title: 'View server information',
          description: '',
          id: `${usedPrefix}ping`,
        },
        {
          header: '• Script Bot',
          title: 'Click for get source code',
          description: '',
          id: `${usedPrefix}sc`,
        },
      ],
    },
    {
      title: 'LIST CATEGORY',
      rows: array,
    },
    {
      title: 'INFORMATION BOT',
      rows: [
        {
          header: '• Menu All',
          title: 'View All features',
          description: '',
          id: `${usedPrefix + command} all`,
        },
        {
          header: '• Sewa Bot',
          title: 'get price shop boy',
          description: '',
          id: `${usedPrefix}sewabot`,
        },
        {
          header: '• Premium Bot',
          title: 'Who contributed to this bot?',
          description: '',
          id: `${usedPrefix}premiumbot`,
        },
      ],
    },
  ];

  conn.sendMessage(
    m.chat,
    {
      buttons: [
        {
          buttonId: 'action',
          buttonText: {
            displayText: 'Open Menu'
          },
          type: 4,
          nativeFlowInfo: {
            name: 'single_select',
            paramsJson: JSON.stringify({
              title: 'Select an option',
              sections: sections,
            }),
          },
        },                
        {
    buttonId: `${usedPrefix}donasi`,
    buttonText: { 
      displayText: 'DONASI' 
    }
  }, {
    buttonId: `${usedPrefix}owner`,
    buttonText: {
      displayText: "OWNER"
    }
  }
],              
      viewOnce: true,
      headerType: 4, // HeaderType for thumbnail
      document: fs.readFileSync("./package.json"),
      fileName: wm,
      caption: syaii,
      footer: wm,
      mimetype: 'application/pdf',
      fileLength: 99999999,
      pageCount: 2025,        
      contextInfo: {
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: idch,
          serverMessageId: null,
          newsletterName: wm2
        },
        externalAdReply: {
          title: `S H I R O K O - F K`,
          body: '',
          thumbnailUrl: global.media,
          sourceUrl: web,
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    }
  );
}
      } else {
        conn.sendMessage(
          m.chat,
          {
            text: syaii,
            contextInfo: {
              mentionedJid: conn.parseMention(syaii),
              externalAdReply: {
                title: wm,
                body: null,
                thumbnailUrl: thumb,
                sourceUrl: sgc,
                mediaType: 1,
                renderLargerThumbnail: true,
              },
            },
          },
          {
            quoted: fkontak,
          },
        );
      }
    } else if (tagCount[perintah]) {
      const daftarHelp = tagHelpMapping[perintah]
        .map((helpItem, index) => {
          return `${helpItem}`;
        })
        .join(`\n│ • ` + "");
      let syaii = Func.Styles(`
▧  *「 MENU ${perintah.toUpperCase()} 」*
│ • ${daftarHelp}
└───···
`);

      if (global.menu === "simple") {
        conn.reply(m.chat, syaii, fkontak);
      } else if (global.menu === "doc") {
        conn.sendMessage(
          m.chat,
          {
            document: {
              url: "https://wa.me/" + conn.user.jid,
            },
            caption: syaii,
            mimetype: "text/html",
            fileName: wm,
            contextInfo: {
              mentionedJid: conn.parseMention(syaii),
              isForwarded: true,
              businessMessageForwardInfo: {
                businessOwnerJid: conn.user.jid,
              },
              externalAdReply: {
                title: wm,
                body: null,
                thumbnailUrl: thumb,
                sourceUrl: sgc,
                mediaType: 1,
                renderLargerThumbnail: true,
              },
            },
          },
          {
            quoted: fkontak,
          },
        );
      } else if (global.menu === "gif") {
        conn.sendMessage(
          m.chat,
          {
            video: {
              url: gif,
            },
            gifPlayback: true,
            gifAttribution: ~~(Math.random() * 2),
            caption: syaii,
            contextInfo: {
              mentionedJid: conn.parseMention(syaii),
              externalAdReply: {
                title: wm,
                body: null,
                thumbnailUrl: thumb,
                sourceUrl: sgc,
                mediaType: 1,
                renderLargerThumbnail: true,
              },
            },
          },
          {
            quoted: fkontak,
          },
        );
      } else if (global.menu === "payment") {
        await conn.relayMessage(
          m.chat,
          {
            requestPaymentMessage: {
              currencyCodeIso4217: "USD",
              amount1000:
                Object.values(plugins)
                  .filter((v) => v.help && !v.disabled)
                  .map((v) => v.help)
                  .flat(1).length * 1000,
              requestFrom: m.sender,
              noteMessage: {
                extendedTextMessage: {
                  text: syaii,
                  contextInfo: {
                    mentionedJid: conn.parseMention(syaii),
                    stanzaId: m.key.id,
                    remoteJid: m.isGroup ? m.sender : m.key.remoteJid,
                    participant: m.key.participant || m.sender,
                    fromMe: m.fromMe,
                    quotedMessage: m.message,
                    externalAdReply: {
                    },
                  },
                },
              },
            },
          },
          {},
        );
      } else if (global.menu === "edit") {
        const arr = [
          "➳ *L*",
          "➳ *L O*",
          "➳ *L O A*",
          "➳ *L O A D*",
          "➳ *L O A D I*",
          "➳ *L O A D I N*",
          "➳ *L O A D I N G*",
          "➳ *L O A D I N G .*",
          "➳ *L O A D I N G . .*",
          "➳ *L O A D I N G . . .*",
          "➳ *L O A D I N G . .*",
          "➳ *L O A D I N G .*",
          "➳ *L O A D I N G*",
          "➳ *W E L C O M E  T O  S H I R O K O  F K*",
          syaii,
        ];

        let { key } = await conn.sendMessage(
          m.chat,
          {
            image: {
              url: thumb,
            },
            caption: `➳ *Please Waif...*`,
            contextInfo: {
              mentionedJid: conn.parseMention(syaii),
              isForwarded: true,
              businessMessageForwardInfo: {
                businessOwnerJid: conn.user.jid,
              },
            },
          },
          {
            quoted: fkontak,
          },
        );
        for (let i = 0; i < arr.length; i++) {
          await conn.sendMessage(
            m.chat,
            {
              image: {
                url: thumb,
              },
              caption: arr[i],
              edit: key,
              contextInfo: {
                mentionedJid: conn.parseMention(syaii),
                isForwarded: true,
                businessMessageForwardInfo: {
                  businessOwnerJid: conn.user.jid,
                },
              },
            },
            {
              quoted: fkontak,
            },
          );
        }
      } else if (global.menu === "button") {
        if (global.menu === "button") {
    conn.sendMessage(m.chat, {
        footer: wm,
        buttons: [
            {
                buttonId: `${usedPrefix}sewabot`,
                buttonText: { displayText: 'Sewa Bot' },
                type: 1
            },
            {
                buttonId: `${usedPrefix}owner`,
                buttonText: { displayText: 'Owner' },
                type: 1
            }
        ],
        viewOnce: true,
        headerType: 4, // HeaderType for thumbnail
        document: fs.readFileSync("./package.json"),
        fileName: wm,
        mimetype: 'application/pdf',
        fileLength: 99999999,
        pageCount: 2025,
        caption: syaii,
        contextInfo: {
            forwardingScore: 999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: idch,
                serverMessageId: null,
                newsletterName: wm2
            },
            externalAdReply: {
                title: `S H I R O K O - F K`,
                body: '',
                thumbnailUrl: global.media,
                sourceUrl: web,
                mediaType: 1,
                renderLargerThumbnail: true
            }
        }
    });
}
      } else {
        conn.sendMessage(
          m.chat,
          {
            text: syaii,
            contextInfo: {
              mentionedJid: conn.parseMention(syaii),
              externalAdReply: {
                title: wm,
                body: null,
                thumbnailUrl: thumb,
                sourceUrl: sgc,
                mediaType: 1,
                renderLargerThumbnail: true,
              },
            },
          },
          {
            quoted: fkontak,
          },
        );
      }
    } else if (perintah === "all") {
      let name = m.pushName || conn.getName(m.sender);
      const more = String.fromCharCode(8206);
      const readMore = more.repeat(4001);
      let number = 0;
      const allTagsAndHelp = Object.keys(tagCount)
        .map((tag) => {
          const daftarHelp = tagHelpMapping[tag]
            .map((helpItem, index, i) => {
              return `${usedPrefix + helpItem}`;
            })
            .join("\n│ • " + "");
          return Func.Styles(`
▧  *「 MENU ${tag.toUpperCase()} 」*
│ • ${daftarHelp}
└───···`);

        })
        .join("\n");
      let syaii = `${namebot} Adalah sistem otomatis whatsApp yang dapat membantu anda dalam hal apapun di WhatsApp!

saya di desain oleh Seorang Developer hebat yang mengembangkan bot whatsApp berbasis Javascript ini dengan menyajikan beberapa fitur seperti *AI*, *DOWNLOADER*, *GAME*, dan lainnya

▧  *「 INFO BOT 」*
│ • *Name :* ${conn.user.name}
│ • *Running on :* ${process.env.USER === "container" ? "panel" : os.hostnams === "root" ? "vps" : "terminal"}
│ • *Total User :* ${Func.formatNumber(Object.keys(db.data.users).length)}
│ • *Total Chat :* ${Func.formatNumber(Object.keys(conn.chats).length)}
│ • *Total group :* ${Func.formatNumber(Object.keys(store.groupMetadata).length)}
│ • *Total Memory :* ${formatSize(totalMemory)}
│ • *Free Memory :* ${formatSize(freeMemory)}
│ • *Used Memory :* ${formatSize(usedMemory)}
└───···

▧  *「 INFO USER 」*
│ • *Name :* ${m.name}
│ • *Device :* ${m.device}
│ • *Register :* ${user.registered ? "✓" : "x"}
│ • *Premium :* ${user.premium ? "✓" : "x"}
│ • *Banned :* ${user.banned ? "✓" : "x"}
└───···

${readMore}
${allTagsAndHelp}`;

      if (global.menu === "simple") {
        conn.reply(m.chat, syaii, fkontak);
      } else if (global.menu === "doc") {
        conn.sendMessage(
          m.chat,
          {
            document: {
              url: "https://wa.me/" + conn.user.jid,
            },

            caption: syaii,
            mimetype: "text/html",
            fileName: wm,
            contextInfo: {
              mentionedJid: conn.parseMention(syaii),
              isForwarded: true,
              businessMessageForwardInfo: {
                businessOwnerJid: conn.user.jid,
              },
              externalAdReply: {
                title: wm,
                body: null,
                thumbnailUrl: thumb,
                sourceUrl: sgc,
                mediaType: 1,
                renderLargerThumbnail: true,
              },
            },
          },
          {
            quoted: fkontak,
          },
        );
      } else if (global.menu === "gif") {
        conn.sendMessage(
          m.chat,
          {
            video: {
              url: gif,
            },
            gifPlayback: true,
            gifAttribution: ~~(Math.random() * 2),
            caption: syaii,
            contextInfo: {
              mentionedJid: conn.parseMention(syaii),
              externalAdReply: {
                title: wm,
                body: null,
                thumbnailUrl: thumb,
                sourceUrl: sgc,
                mediaType: 1,
                renderLargerThumbnail: true,
              },
            },
          },
          {
            quoted: fkontak,
          },
        );
      } else if (global.menu === "payment") {
        await conn.relayMessage(
          m.chat,
          {
            requestPaymentMessage: {
              currencyCodeIso4217: "USD",
              amount1000:
                Object.values(plugins)
                  .filter((v) => v.help && !v.disabled)
                  .map((v) => v.help)
                  .flat(1).length * 1000,
              requestFrom: m.sender,
              noteMessage: {
                extendedTextMessage: {
                  text: syaii,
                  contextInfo: {
                    mentionedJid: conn.parseMention(syaii),
                    stanzaId: m.key.id,
                    remoteJid: m.isGroup ? m.sender : m.key.remoteJid,
                    participant: m.key.participant || m.sender,
                    fromMe: m.fromMe,
                    quotedMessage: m.message,
                    externalAdReply: {
                    },
                  },
                },
              },
            },
          },
          {},
        );
      } else if (global.menu === "edit") {
        const arr = [
          "➳ *L*",
          "➳ *L O*",
          "➳ *L O A*",
          "➳ *L O A D*",
          "➳ *L O A D I*",
          "➳ *L O A D I N*",
          "➳ *L O A D I N G*",
          "➳ *L O A D I N G .*",
          "➳ *L O A D I N G . .*",
          "➳ *L O A D I N G . . .*",
          "➳ *L O A D I N G . .*",
          "➳ *L O A D I N G .*",
          "➳ *L O A D I N G*",
          "➳ *W E L C O M E  T O  S H I R O K O  F K*",
          syaii,
        ];

        let { key } = await conn.sendMessage(
          m.chat,
          {
            document: {
              url: "https://wa.me/" + conn.user.jid,
            },
            caption: `➳ *Please Waif...*`,
            mimetype: "text/html",
            fileName: wm,
            contextInfo: {
              mentionedJid: conn.parseMention(syaii),
              isForwarded: true,
              businessMessageForwardInfo: {
                businessOwnerJid: conn.user.jid,
              },
              externalAdReply: {
                title: wm,
                body: null,
                thumbnailUrl: thumb,
                sourceUrl: sgc,
                mediaType: 1,
                renderLargerThumbnail: true,
              },
            },
          },
          {
            quoted: fkontak,
          },
        );
        for (let i = 0; i < arr.length; i++) {
          await conn.sendMessage(
            m.chat,
            {
              image: {
                url: thumb,
              },
              caption: arr[i],
              mimetype: "text/html",
              fileName: wm,
              edit: key,
              contextInfo: {
                mentionedJid: conn.parseMention(syaii),
                isForwarded: true,
                businessMessageForwardInfo: {
                  businessOwnerJid: conn.user.jid,
                },
                externalAdReply: {
                  title: wm,
                  body: null,
                  thumbnailUrl: thumb,
                  sourceUrl: sgc,
                  mediaType: 1,
                  renderLargerThumbnail: true,
                },
              },
            },
            {
              quoted: fkontak,
            },
          );
        }
     } else if (global.menu === "button") {
        if (global.menu === "button") {
    conn.sendMessage(m.chat, {
        footer: wm,
        buttons: [
            {
                buttonId: `${usedPrefix}sewabot`,
                buttonText: { displayText: 'Sewa Bot' },
                type: 1
            },
            {
                buttonId: `${usedPrefix}owner`,
                buttonText: { displayText: 'Owner' },
                type: 1
            }
        ],
        viewOnce: true,
        headerType: 4, // HeaderType for thumbnail
        document: fs.readFileSync("./package.json"),
        fileName: wm,
        mimetype: 'application/pdf',
        fileLength: 99999999,
        pageCount: 2025,
        caption: syaii,
        contextInfo: {
            forwardingScore: 999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: idch,
                serverMessageId: null,
                newsletterName: wm2
            },
            externalAdReply: {
                title: `S H I R O K O - F K`,
                body: '',
                thumbnailUrl: global.media,
                sourceUrl: web,
                mediaType: 1,
                renderLargerThumbnail: true
            }
        }
    });
}
      } else {
        conn.sendMessage(
          m.chat,
          {
            text: syaii,
            contextInfo: {
              mentionedJid: conn.parseMention(syaii),
              externalAdReply: {
                title: namebot,
                body: null,
                thumbnailUrl: thumb,
                sourceUrl: sgc,
                mediaType: 1,
                renderLargerThumbnail: true,
              },
            },
          },
          {
            quoted: fkontak,
          },
        );
      }
    } else {
      await conn.reply(
        m.chat,
        `*[ MENU ${perintah.toUpperCase()} NOT FOUND ]*\n> • _Ketik *.menu* untuk melihat semua kategori menu atau keitk *.menu all* untuk melihat semua fitur_`,
        m,
      );
    }
  },
  register: true,
};

function clockString(ms) {
  let h = isNaN(ms) ? "--" : Math.floor(ms / 3600000);
  let m = isNaN(ms) ? "--" : Math.floor(ms / 60000) % 60;
  let s = isNaN(ms) ? "--" : Math.floor(ms / 1000) % 60;
  return [h, m, s].map((v) => v.toString().padStart(2, 0)).join(":");
}
