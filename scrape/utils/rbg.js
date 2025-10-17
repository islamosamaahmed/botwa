const axios = require("axios");

/*
  Created by https://github.com/ztrdiamond !
  Source: https://whatsapp.com/channel/0029VagFeoY9cDDa9ulpwM0T
  "Aku janji jika hapus watermark ini maka aku rela miskin hingga 7 turunan"
*/

async function removebg(buffer) {
  try {
    if (!buffer) return { status: false, message: "undefined reading buffer" };
    return await new Promise((resolve, reject) => {
      const image = buffer.toString("base64");
      axios
        .post(
          "https://us-central1-ai-apps-prod.cloudfunctions.net/restorePhoto",
          {
            image: `data:image/png;base64,${image}`,
            model:
              "fb8af171cfa1616ddcf1242c093f9c46bcada5ad4cf6f2fbe8b81b330ec5c003",
          },
        )
        .then((res) => {
          const data = res.data?.replace(`"`, "");
          console.log(res.status, data);
          if (!data) return reject("failed removebg image");
          resolve({
            status: true,
            image: data,
          });
        })
        .catch(reject);
    });
  } catch (e) {
    return { status: false, message: e };
  }
}

module.exports = removebg;
