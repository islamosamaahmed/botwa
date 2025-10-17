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
  help: ["txt2img"].map((a) => a + " *[prompt]*"),
  tags: ["ai"],
  command: ["txt2img"],
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
    const Prodia = new Scraper["Ai"].Prodia(prodia.key);

    if (!text)
      throw `*• Example :* ${usedPrefix + command} *[prompt]*

*Custom generated*
--model *[change model]*
--sampler *[change sampler]*`;
    let keyword = text.split(" ")[0];
    let data = text.slice(keyword.length + 1);
    if (!db.data.msgs[m.sender]) {
      db.data.msgs[m.sender] = {
        model: "mechamix_v10.safetensors [ee685731]",
        sampler: "DPM++ 2M Karras",
      };
    }
    if (keyword === "--model") {
      let model = await Prodia.model();
      if (!data)
        throw `*Enter Model* type *1 ~> ${model.length}* to change the model
${model.map((a, i) => `*${i + 1}.* ${a.split(".")[0]}`).join("\n")}`;
      if (isNaN(data))
        throw `*Enter Model* type *1 ~> ${model.length}* to change the model
${model.map((a, i) => `*${i + 1}.* ${a.split(".")[0]}`).join("\n")}`;
      if (parseInt(data) > model.length)
        throw `*Enter Model* type *1 ~> ${model.length}* to change the model
${model.map((a, i) => `*${i + 1}.* ${a.split(".")[0]}`).join("\n")}`;
      db.data.msgs[m.sender].model = model[data - 1];
      m.reply(
        `Successfully changed model to *${model[data - 1].split(".")[0]}*`,
      );
    } else if (keyword === "--sampler") {
      let model = await Prodia.samplers();
      if (!data)
        throw `*Enter Sampler* type *1 ~> ${model.length}* to change the sampler
${model.map((a, i) => `*${i + 1}.* ${a}`).join("\n")}`;
      if (isNaN(data))
        throw `*Enter Sampler* type *1 ~> ${model.length}* to change the sampler
${model.map((a, i) => `*${i + 1}.* ${a}`).join("\n")}`;
      if (parseInt(data) > model.length)
        throw `*Enter Sampler* type *1 ~> ${model.length}* to change the sampler
${model.map((a, i) => `*${i + 1}.* ${a}`).join("\n")}`;
      db.data.msgs[m.sender].sampler = model[data - 1];
      m.reply(`Successfully changed sampler to *${model[data - 1]}*`);
    } else {
      let { key } = await conn.sendMessage(
        m.chat,
        {
          text: "proses generate...",
        },
        {
          quoted: m,
        },
      );
      let json = {
        ...db.data.msgs[m.sender],
        prompt: text,
        negative_prompt: "blur, nsfw, bad quality, bad anatomy, black",
        style_preset: "anime",
        upscale: true,
        steps: 20,
        seed: Math.floor(Math.random() * 200000000),
        cfg_scale: 7,
        width: 400,
        height: 800,
      };
      let hasil = await Prodia.generateImage(json);
      await conn.sendMessage(m.chat, {
        text: `Successfully generated image
*• Prompt :* ${json.prompt}
*• Model :* ${json.model}
*• Seed :* ${json.seed}
*• Sampler :* ${json.sampler}`,
        edit: key,
      });
      await conn.sendMessage(
        m.chat,
        {
          image: {
            url: hasil.imageUrl,
          },
        },
        {
          quoted: m,
        },
      );
    }
  },
};
