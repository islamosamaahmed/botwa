const { BingImageCreator } = require("./utils/bingimg");
const drive = require("./utils/drive");
const blackboxAIChat = require("./utils/blackboxAIChat");
const FacebookDl = require("./utils/facebook");
const ragBot = require("./utils/ragBot");
const degreeGuru = require("./utils/degreeGuru");
const tiktok = require("./utils/tt");
const chatAI = require("./utils/eai");
const aio = require("./utils/aio");
const animagine = require("./utils/animagine");
const MediaFireDL = require("./utils/mediafire");
const yans = require("./utils/yans");
const Anime = require("./utils/animelist");
const youSearch = require("./utils/youai");
const llama3 = require("./utils/llama3");
const tiktokSearch = require("./utils/tiktoksearch");
const pinterest = require("./utils/pinterest");
const pins = require("./utils/pin");
const removebg = require("./utils/rbg");
const spotifydl = require("./utils/spotifydl");
const insta = require("./utils/ige");
const twitterDl = require("./utils/twitter");
const { protex } = require("./utils/validator");

class Scraper {
  Api = require("./utils/api");
  Gpt = require("./utils/gpt");
  Random = require("./utils/random");
  Download = {
    ...require("./utils/download"),
    ytdl: require("./utils/ytdl"),
  };
  Other = require("./utils/scraper");
  Tools = require("./utils/tools");
  Ai = {
    Bingimg: BingImageCreator,
    ...require("./utils/ai.js"),
    Prodia: require("./utils/prodia.js"),
  };
  blackboxAIChat = blackboxAIChat;
  FacebookDl = FacebookDl;
  ragBot = ragBot;
  degreeGuru = degreeGuru;
  tiktok = tiktok;
  chatAI = chatAI;
  aio = aio;
  drive = drive;
  pins = pins;
  removebg = removebg;
  animagine = animagine;
  MediaFireDL = MediaFireDL;
  yans = yans;
  Anime = Anime;
  youSearch = youSearch;
  llama3 = llama3;
  tiktokSearch = tiktokSearch;
  pinterest = pinterest;
  spotifydl = spotifydl;
  insta = insta;
  twitterDl = twitterDl;
  protex = protex;
}
module.exports = Scraper;

const fs = require("fs");
let file = require.resolve(__filename);
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  delete require.cache[file];
  require(file);
});
