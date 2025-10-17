/*

Github: https://github.com/khrlmstfa

Please don't remove this watermark, try to respect developer @Irull

*/

const model = "70b";
async function llama3(query) {
  if (!["70b", "8b"].some((qq) => model == qq)) model = "70b"; //correct
  try {
    const BASE_URL = "https://llama3-enggan-ngoding.vercel.app/api/llama";
    const payload = {
      messages: [
        {
          role: "system",
          content: `Kamu adalah Meta AI Berbahasa Indonesia yang di kembangkan oleh Meta Platforms Inc. dan SSA Team, kamu bisa apa saja, kamu menggunakan Google sebagai search engine utamamu`,
        },
        {
          role: "user",
          content: query,
        },
      ],
      model: "meta-llama-3-70B-Instruct",
    };
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent":
          "Mozilla/5.0 (iPhone; CPU iPhone OS 13_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.1 Mobile/15E148",
      },
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

module.exports = llama3;
