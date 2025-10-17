const axios = require("axios");

const api = axios.create({
  baseURL: "https://thinkany.ai/api",
  headers: {
    "Content-Type": "application/json",
    "User-Agent":
      "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Mobile Safari/537.36",
    Referer: "https://thinkany.ai/",
  },
});

/**
 * Scraper By QanyPaw
 * Forbidden to sell and delete my wm, respect the creator
 */

async function thinkany(content) {
  try {
    const newConversationData = {
      content,
      locale: "en",
      mode: "search",
      model: "claude-3-haiku",
      source: "all",
    };
    const { data } = await api.post("/new-conversation", newConversationData);

    const chatData = {
      role: "user",
      content: data.data.content,
      conv_uuid: data.data.uuid,
      mode: data.data.mode,
      is_new: true,
      model: data.data.llm_model,
    };

    const chatResponse = await api.post("/chat", chatData);
    return chatResponse.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

let handler = async (m, { conn, args, usedPrefix, command }) => {
  let text;

  if (args.length >= 1) {
    text = args.join(" ");
  } else if (m.quoted && m.quoted.text) {
    text = m.quoted.text;
  } else {
    return m.reply(`*• Example :* ${usedPrefix + command} *[question]*`);
  }
  m.reply(wait);
  try {
    let bard = await thinkany(text);
    m.reply(bard);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

handler.help = ["thinkany", "thinkai"].map((a) => a + " *[question]*");
handler.tags = ["ai"];
handler.command = ["thinkany", "thinkai"];

module.exports = handler;
