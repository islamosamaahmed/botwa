let handler = async (m, { conn, text, usedPrefix, command }) => {
  conn.sendCopy(m.chat, [["copy link !", `${sgc}`]], m, {
    body: `Join to official group to get more Information : *[ ${sgc} ]*`,
  });
  conn.groupMetadata = async (jid) => {
    return store.groupMetadata[jid];
  };
};
handler.help = ["gcbot"].map((a) => a + " *[official group bot]*");
handler.tags = ["info"];
handler.command = ["gcbot"];

module.exports = handler;
