const axios = require("axios");
const cheerio = require("cheerio");
const qs = require("qs");
const _ = require("lodash");

// Fungsi untuk mengambil data dari LetmeGpt
const LetmeGpt = async (query) => {
  const encodedQuery = encodeURIComponent(query);
  const url = `https://letmegpt.com/search?q=${encodedQuery}`;

  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    return $("#gptans").text() || null;
  } catch (error) {
    console.error("Error fetching LetmeGpt data:", error);
    throw error;
  }
};

// Fungsi untuk menghasilkan ID acak
const generateRandomID = (length) => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  return _.sampleSize(chars, length).join("");
};

// Fungsi untuk mengambil data dari leptonAi
const leptonAi = async (query) => {
  try {
    const client = axios.create({
      baseURL: "https://search.lepton.run/api/",
      headers: { "Content-Type": "application/json" },
    });
    const requestId = generateRandomID(10);
    const payload = { query, rid: requestId };
    const response = await client.post("query", payload);
    const match = response.data.match(
      /__LLM_RESPONSE__([\s\S]*?)__RELATED_QUESTIONS__/,
    );

    if (match?.[1]) {
      return match[1].trim();
    } else {
      throw new Error("No LLM response found.");
    }
  } catch (error) {
    console.error("Error fetching leptonAi response:", error);
    throw new Error("Error fetching LLM response: " + error.message);
  }
};

// Fungsi untuk bertanya ke SimSimi
const Simsimi = async (query) => {
  const url = "https://simsimi.vn/web/simtalk";
  try {
    const response = await axios.post(
      url,
      `text=${encodeURIComponent(query)}&lc=id`,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          Accept: "application/json, text/javascript, */*; q=0.01",
          "X-Requested-With": "XMLHttpRequest",
          "User-Agent":
            "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Mobile Safari/537.36",
          Referer: "https://simsimi.vn/",
        },
      },
    );
    return response.data.success || null;
  } catch (error) {
    console.error("Error asking SimSimi:", error);
    throw error;
  }
};

// Fungsi untuk bertanya ke GoodyAI
const GoodyAI = async (message) => {
  try {
    const response = await axios.post(
      "https://www.goody2.ai/send",
      {
        message,
        debugParams: null,
      },
      {
        headers: {
          Accept: "*/*",
          "Accept-Encoding": "gzip, deflate, br, zstd",
          "Accept-Language": "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7,af;q=0.6",
          "Content-Type": "application/json",
          Origin: "https://www.goody2.ai",
          Referer: "https://www.goody2.ai/chat",
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
        },
        responseType: "stream",
      },
    );

    return new Promise((resolve, reject) => {
      let result = "";
      response.data.on("data", (chunk) => {
        const lines = chunk.toString().split("\n");
        lines.forEach((line) => {
          if (line.startsWith('data: {"content":')) {
            try {
              const content = JSON.parse(line.slice(6)).content;
              result += content;
            } catch (jsonError) {
              console.error("Error parsing JSON:", jsonError);
            }
          }
        });
      });
      response.data.on("end", () => resolve(result));
      response.data.on("error", reject);
    });
  } catch (error) {
    console.error("Error asking GoodyAI:", error);
    throw error;
  }
};

// Fungsi untuk bertanya ke CgtAi
const CgtAi = async (message) => {
  try {
    const payload = {
      conversation_uuid: 100,
      text: message,
      sent_messages: 1,
    };
    const response = await axios.post(
      "https://www.timospecht.de/wp-json/cgt/v1/chat",
      qs.stringify(payload),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          Accept: "*/*",
          "X-Requested-With": "XMLHttpRequest",
        },
      },
    );
    return response.data?.data?.message;
  } catch (error) {
    console.error("Error fetching CgtAi data:", error);
    throw new Error("Terjadi kesalahan:", error);
  }
};

// Fungsi untuk bertanya ke thinkany
const thinkany = async (message) => {
  try {
    const response = await axios.post(
      "https://thinkany.ai/api/chat",
      {
        role: "user",
        content: message,
        conv_uuid: 100,
        mode: "search",
        is_new: true,
        model: "claude-3-haiku",
      },
      { headers: { "Content-Type": "application/json" } },
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching thinkany data:", error);
    throw error;
  }
};

// Fungsi untuk bertanya ke Degree Guru
const degreeguru = async (userMessage, systemMessage) => {
  try {
    const response = await fetch("https://degreeguru.vercel.app/api/guru", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: [
          {
            role: "system",
            content: systemMessage || "You The best Ai Degereeguru !",
          },
          { role: "user", content: userMessage },
        ],
      }),
    });
    if (!response.ok) throw new Error("Network response was not ok");
    return await response.text();
  } catch (error) {
    console.error("Error calling Degree Guru API:", error.message);
    throw error;
  }
};

// Fungsi untuk bertanya ke Ragbot
const ragbot = async (userMessage, systemMessage) => {
  try {
    const response = await fetch("https://ragbot-starter.vercel.app/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: [
          { role: "system", content: systemMessage || "I'am Ragbot 😀💪" },
          { role: "user", content: userMessage },
        ],
        useRag: true,
        llm: "gpt-3.5-turbo",
        similarityMetric: "cosine",
      }),
    });
    if (!response.ok) throw new Error("Network response was not ok");
    return await response.text();
  } catch (error) {
    console.error("Error calling Ragbot API:", error.message);
    throw error;
  }
};

// Fungsi untuk bertanya ke StoicAI
const stoicai = async (userMessage, systemMessage) => {
  try {
    const response = await fetch("https://app.stoiccord.com/api/completion", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: [
          { role: "system", content: systemMessage || "Hello 😀😊" },
          { role: "user", content: userMessage },
        ],
      }),
    });
    if (!response.ok) throw new Error("Network response was not ok");
    return await response.text();
  } catch (error) {
    console.error("Error calling stoic API:", error.message);
    throw error;
  }
};

// Fungsi untuk bertanya ke stoicgpt
const stoicgpt = async (userMessage, systemMessage) => {
  try {
    const response = await fetch("https://app.stoiccord.com/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: [
          { role: "system", content: systemMessage || "👋 Hello" },
          { role: "user", content: userMessage },
        ],
      }),
    });
    if (!response.ok) throw new Error("Network response was not ok");
    return await response.text();
  } catch (error) {
    console.error("Error calling stoic API:", error.message);
    throw error;
  }
};

module.exports = {
  LetmeGpt,
  leptonAi,
  Simsimi,
  GoodyAI,
  CgtAi,
  thinkany,
  degreeguru,
  ragbot,
  stoicai,
  stoicgpt,
};
