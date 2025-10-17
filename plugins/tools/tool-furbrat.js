const axios = require('axios');

const furbrat = async (text) => {
  try {
    return await new Promise((resolve, reject) => {
      if (!text) return reject("🚩 Missing text input!");
      axios
        .get("https://fastrestapis.fasturl.link/tool/furbrat", {
          params: { text },
          responseType: "arraybuffer",
        })
        .then((res) => {
          const image = Buffer.from(res.data);
          if (image.length <= 10240) return reject("🚩 Failed to generate Furbrat!");
          return resolve({
            success: true,
            image,
          });
        })
        .catch((err) => reject(err.message));
    });
  } catch (e) {
    return {
      success: false,
      errors: e,
    };
  }
};

let handler = async (m, { conn, args }) => {
  if (!args[0]) throw `🚩 *Example:* !halo aku ultramen`;
  
  const text = args.join(' ');

  try {
    const response = await furbrat(text);
    if (response.success) {
      await conn.sendFile(m.chat, response.image, 'furbrat.jpg', `🍟 *Furbrat Generated Successfully!*\n\nText: ${text}`, m);
    } else {
      throw response.errors || "🚩 An unknown error occurred!";
    }
  } catch (error) {
    throw `🚩 Error: ${error}`;
  }
};

handler.help = ['furbrat <text>'];
handler.tags = ['tools', 'fun'];
handler.command = /^(furbrat)$/i;

module.exports = handler;