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

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text)
    return m.reply(`*• Example :* ${usedPrefix + command} *[question]*`);
  let { key } = await conn.sendMessage(
    m.chat,
    {
      text: "Wait...",
    },
    {
      quoted: fkontak,
    },
  );
  const hasil = await ChatGpt(
    text,
    `Namaku adalah shiroko, seorang gadis sekolahan berusia 16 tahun, kamu memiliki seorang pacar bernama zass, dan nama dari lawan bicaramu adalah ${m.name}`,
  );
  await conn.sendMessage(
    m.chat,
    {
      text: hasil,
      edit: key,
    },
    {
      quoted: fkontak,
    },
  );
};

handler.help = ["aryagpt"].map((a) => a + " *[question]*");
handler.tags = ["ai"];
handler.command = ["aryagpt"];

module.exports = handler;

async function ChatGpt(q, prompt) {
  try {
    const response = await (
      await fetch("https://nexra.aryahcr.cc/api/chat/gpt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [
            {
              role: "system",
              content: prompt,
            },
            {
              role: "user",
              content: q,
            },
          ],
          model: "chatgpt",
        }),
      }).then((res) => res.json())
    ).gpt;
    return response;
  } catch (e) {
    throw new Error("Error fetching data from AI service.");
  }
}
