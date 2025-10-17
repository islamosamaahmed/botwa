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

const { WAMessageStubType } = require("@whiskeysockets/baileys");

async function before(m) {
  if (!m.messageStubType || !m.isGroup) return;
  const chat = global.db.data.chats[m.chat];
  const messages = {
    21: `Change the Group Subject`,
    22: `Change the Group Icon`,
    23: `Change group invite link`,
    24: `Change Description Group To \n\n${m.messageStubParameters[0]}`,
    25: `Set to *${m.messageStubParameters[0] == "on" ? "Admin Only" : "All Participant"}* Can Change Group Description.`,
    26: `Change group Announcement Settings`,
    26: `Set to *${m.messageStubParameters[0] == "on" ? "Closed" : "Opened"}* Group!\nNow ${m.messageStubParameters[0] == "on" ? "Admin Only" : "All Participant"} can send message.`,
    27: m.sender.startsWith("62")
      ? `Added @${m.messageStubParameters[0].split("@")[0]}`
      : `@${m.messageStubParameters[0].split("@")[0]} Join Via Link group`,
    28: `Kicked @${m.messageStubParameters[0].split("@")[0]}`,
    29: `Promoted @${m.messageStubParameters[0].split("@")[0]} To Admin.`,
    30: `Demoted @${m.messageStubParameters[0].split("@")[0]} From Admin.`,
    70: `Invite Sent To Group`,
    71: `Request to Join the Group`,
    72: `Change Ephemeral To *@${m.messageStubParameters[0]}*`,
    74: `Sent ViewOnce Message`,
    21: `Change Subject Group To:\n *${m.messageStubParameters[0]}*`,
  };

  const messageType = messages[m.messageStubType];
  if (messageType) {
    await this.reply(
      m.chat,
      `${messageType}`,
      fakestatus("*[ Group Notification ]*"),
      {
        contextInfo: {
          mentionedJid:
            m.messageStubParameters[0] !== undefined
              ? [m.sender, m.messageStubParameters[0]]
              : [m.sender],
        },
      },
    );
  }
}

module.exports = {
  before,
};
