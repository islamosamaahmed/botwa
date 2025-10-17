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
const { readFileSync } = require("fs");
const axios = require("axios");
const { all } = require("../../lib/voiceholo.js");
const { instrument } = require("../../lib/insvoice.js");

const handler = async (m, { conn, usedPrefix, command }) => {
  // Mendapatkan pesan yang di-reply atau pesan yang dikirim
  let message = m.quoted ? m.quoted : m;
  let mimetype = (m.quoted ? m.quoted : m.msg).mimetype || "";

  if (!/audio/.test(mimetype)) {
    throw `*• Example :* ${usedPrefix}${command} *[reply audio]*`;
  }

  // Memberi tahu pengguna bahwa bot sedang memproses
  conn.reply(m.chat, wait, m);

  // Mengunduh audio
  let audioBuffer = await message.download?.();

  if (!audioBuffer) {
    throw "Terjadi kesalahan saat mengunduh audio.";
  }

  const fetchAudio = async (url, options) => {
    try {
      // Menambahkan default options jika tidak ada
      options ? options : {};

      const response = await axios({
        method: "get",
        url,
        headers: {
          DNT: 1,
          "Upgrade-Insecure-Request": 1,
        },
        ...options, // Menambahkan opsi tambahan jika ada
        responseType: "arraybuffer",
      });
      return response.data;
    } catch (error) {
      throw "Terjadi kesalahan saat mengunduh audio.";
    }
  };

  // Mengubah audio menjadi suara
  let instrumentedAudio = await instrument(audioBuffer);
  let vocalAudio = await fetchAudio(instrumentedAudio.vocal);
  let outputAudio = await all(vocalAudio, command);

  // Mengirimkan suara
  conn.sendMessage(
    m.chat,
    {
      audio: {
        url: outputAudio.base64,
      },
      mimetype: "audio/mpeg",
    },
    {
      quoted: m,
    },
  );
};

handler.help = [
  "kobo",
  "zeta",
  "gura",
  "kaela",
  "pekora",
  "miko",
  "subaru",
  "korone",
  "luna",
  "anya",
  "reine",
  "calli",
  "kroni",
].map((command) => command + ` *[reply audio]*`);

handler.tags = ["ai"];

handler.command = [
  "kobo",
  "zeta",
  "gura",
  "kaela",
  "pekora",
  "miko",
  "subaru",
  "korone",
  "luna",
  "anya",
  "reine",
  "calli",
  "kroni",
];

module.exports = handler;
