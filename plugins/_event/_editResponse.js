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
  before: async (m, { conn }) => {
    if (m.isBaileys || !m.message || !m.message.editedMessage) return;
    const editedMsg = m.message.editedMessage;
    if (
      editedMsg.imageMessage ||
      editedMsg.videoMessage ||
      editedMsg.documentMessage ||
      (editedMsg.editedMessage &&
        (editedMsg.editedMessage.imageMessage ||
          editedMsg.editedMessage.videoMessage ||
          editedMsg.editedMessage.documentMessage))
    ) {
      return;
    }
    await conn.appendTextMessage(
      m,
      editedMsg.message?.protocolMessage?.editedMessage?.extendedTextMessage
        ?.text || editedMsg.extendedTextMessage?.text,
      m.chatUpdate,
    );
  },
};
