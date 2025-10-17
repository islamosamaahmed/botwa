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
  help: ["flux"].map((a) => a + " *[Prompt]*"),
  tags: ["ai"],
  command: ["flux"],
  code: async (
    m,
    {
      conn,
      usedPrefix,
      command,
      text,
      isOwner,
      isAdmin,
      isBotAdmin,
      isPrems,
      chatUpdate,
    },
  ) => {
    if (!text) throw `*• Contoh :* ${usedPrefix + command} *[prompt]*`;
    m.reply(wait);
    let data = await flux(text);
    for (let i of data) {
      conn.sendMessage(
        m.chat,
        {
          image: {
            url: i.url,
          },
          caption: `*• Prompt :* ${text}`,
        },
        {
          quoted: m,
        },
      );
    }
  },
};

async function flux(prompt) {
  try {
    const postResponse = await fetch(
      "https://christianhappy-flux-1-schnell.hf.space/call/infer",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: [prompt, 0, true, 800, 800, 1],
        }),
      },
    );

    if (!postResponse.ok) throw new Error("POST request failed");

    const { event_id: eventId } = await postResponse.json();
    let result = null;
    let retries = 0;
    const maxRetries = 10;

    while (!result && retries < maxRetries) {
      const getResponse = await fetch(
        `https://christianhappy-flux-1-schnell.hf.space/call/infer/${eventId}`,
      );
      if (getResponse.ok) {
        result = await getResponse.text();
      }
      if (!result) {
        retries++;
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }
    }

    if (!result) throw new Error("Gagal mengambil hasil");

    let textData = result;
    let lines = textData.split("\n");
    let jsonData = null;

    for (let line of lines) {
      if (line.startsWith("data:")) {
        jsonData = JSON.parse(line.substring(6));
        break;
      }
    }
    return jsonData;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
