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
const util = require("util");
const { exec } = require("child_process");

module.exports = {
  before: async (m, { conn, isOwner }) => {
    if (m.text.startsWith("=>")) {
      if (!isOwner) return;
      let { key } = await conn.sendMessage(
        m.chat,
        {
          text: "evaling...",
        },
        {
          quoted: m,
        },
      );
      try {
        const result = await eval(
          `(async () => { return ${m.text.slice(3)} })()`,
        );
        await conn.sendMessage(m.chat, {
          text: util.format(result),
          edit: key,
        });
      } catch (e) {
        await conn.sendMessage(m.chat, {
          text: util.format(e),
          edit: key,
        });
      }
      return;
    }

    if (m.text.startsWith(">")) {
      if (!isOwner) return;
      let { key } = await conn.sendMessage(
        m.chat,
        {
          text: "evaling...",
        },
        {
          quoted: m,
        },
      );
      try {
        const result = await eval(`(async() => { 
${m.text.slice(2)}
})()`);
        await conn.sendMessage(m.chat, {
          text: util.inspect(result),
          edit: key,
        });
      } catch (e) {
        await conn.sendMessage(m.chat, {
          text: util.format(e),
          edit: key,
        });
      }
      return;
    }

    if (m.text.startsWith("$")) {
      if (!isOwner) return;
      let { key } = await conn.sendMessage(
        m.chat,
        {
          text: "executed...",
        },
        {
          quoted: m,
        },
      );
      exec(m.text.slice(2), async (err, stdout) => {
        if (err)
          return await conn.sendMessage(m.chat, {
            text: util.format(err),
            edit: key,
          });
        if (stdout)
          return await conn.sendMessage(m.chat, {
            text: stdout,
            edit: key,
          });
      });
      return;
    }
  },
};
