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

const pagePre = 40;
const apiUrl = "https://www.seaart.ai/api/v1/artwork/list";

const fetchData = async (requestData) => {
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const { data } = await response.json();
    const items = data.items;

    if (!items || !Array.isArray(items) || items.length === 0) {
      throw new Error("No items found.");
    }
    const randomIndex = Math.floor(Math.random() * items.length);
    return items[randomIndex];
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

let handler = async (m, { conn, args, usedPrefix, command }) => {
  let text;
  if (args.length >= 1) {
    text = args.slice(0).join(" ");
  } else if (m.quoted && m.quoted.text) {
    text = m.quoted.text;
  } else return m.reply(`*• Example :* ${usedPrefix + command} *[prompt]*`);
  await m.reply(wait);
  const requestData = {
    page: 1,
    page_size: pagePre,
    order_by: "new",
    type: "community",
    keyword: text,
    tags: [],
  };
  try {
    const result = await fetchData(requestData);
    await conn.sendMessage(
      m.chat,
      {
        image: {
          url: result.banner.url,
        },
        caption: `*• Prompt :* ${text}`,
        mentions: [m.sender],
      },
      {
        quoted: m,
      },
    );
  } catch (error) {
    throw error;
  }
};
handler.help = ["seaart"].map((a) => a + " *[prompt]*");
handler.tags = ["ai"];
handler.command = ["seaart"];

module.exports = handler;
