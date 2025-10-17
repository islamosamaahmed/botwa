const axios = require("axios");

async function luminai(q) {
  try {
    const response = await axios.post("https://luminai.my.id", {
      content: q,
    });
    return response.data.result;
  } catch (error) {
    console.error("Error fetching:", error);
    throw error;
  }
}

luminai("question")
  .then((result) => {
    return "Result:", result;
  })
  .catch((error) => {
    return "Error:", error;
  });
module.exports = luminai;
