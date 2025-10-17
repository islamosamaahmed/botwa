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
 
//═══════════════◆[ ! ]◆═══════════════/*/
let { Scraper, Uploader } = require("akiraa-wb");
let fs = require("fs");
let moment = require("moment-timezone");
let cp = require("child_process");
let { promisify } = require("util");
let scrap = require(process.cwd() + "/scrape");
let nodeFetch = require("node-fetch");

//═══════ ◆ Config Owner ◆ ═══════//
global.owner = ["628×××××", "1298417×××××"]; //Jid & lid, gunakan cmd (.getlid) untuk cek lid kamu
global.mods = ["62×××××"]; // Moderator
global.prems = ["62×××××"]; // Premium
// YANG ATAS ITU UBAH JADI NOMOR LU
global.fsizedoc = "45000000000"; // default 10TB
global.fpagedoc = "19";
global.numberbot = "62×××××";
global.namedoc = "Shiroko FK Whatsapp Multi Device";
global.nameowner = "Zass Desuta";
global.nomorown = "62×××××";

//═══════ ◆ Config Bot ◆ ═══════//
global.sgc = "https://zass.cloud/komunitas";
global.sourceUrl = "https://whatsapp.com/channel/0029Vb6w7eO9sBIEUYRgeC30";
global.sig = "https://www.instagram.com/zass.id_";
global.web = "https://neolabsofficial.my.id/";
global.sgh = "https://github.com/ZassOnee";
global.swa = "wa.me/62×××××";

//═══════ ◆ Config Media ◆ ═══════//
global.gif = "https://files.catbox.moe/nzr2sj.mp4"; //Ini buat gif yang di menu
global.icon = "https://files.catbox.moe/pvo74k.jpg";
global.thumb = "https://files.catbox.moe/ogfr3v.jpg";
global.media = "https://files.catbox.moe/q3bair.jpg";

//═══════ ◆ Config Watermark ◆ ═══════//
global.namebot = "Shiroko Fork あ⁩";
global.wm = "© Shiroko Fork 2025";
global.watermark = wm;
global.wm2 = '「 Shiroko MultiDevice あ⁩ 」'
global.wm3 = '⫹⫺ Shiroko Fork'
global.wm4 = namebot;

//═══════ ◆ Config Bot ◆ ═══════//
global.version = "2";
global.idgc = "120363385138939548@g.us"; //isi pake id gc lu
global.idch = "120363421570647022@newsletter";
global.upinfo = "0029Vb6w7eO9sBIEUYRgeC30";
global.isPairing = true;
global.levelup = false;
global.menu = "button";

//═══════ ◆ Config ApiKey ◆ ═══════//
global.btc = "zz7zuBmf";
global.lann = "zassbtz";
global.lolhuman = "Akiraa";
// Login ciaatopup.my.id (gratis tanpa ktp)
global.apikey_ciaatopup = "CiaaTopup_blablabla"

//═══════ ◆ Config ◆ ═══════//
global.fetch = global.fetch || nodeFetch
global.fla =
  "https://flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=water-logo&script=water-logo&fontsize=90&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&fillTextColor=%23000&shadowGlowColor=%23000&backgroundColor=%23000&text=";
global.wait = "*Tunggu Sebentar Ya Kack ^ω^*";
global.eror = `*Mohon Maaf Server Kami Sedang Error!*`;
global.done = "```Shiroko FK 2025```";
global.salah = "Salah\n";

//═══════ ◆ Config Sticker ◆ ═══════//
global.packname = "Create By Shiroko Fork"
global.author = `YT NeoShiroko Labs`;

//═══════ ◆ Config Panel ◆ ═══════//
global.domain = "https://example.panel.com";
global.apikey = "ptla_XXXXXXXXXXXXXX";

//═══════ ◆ Config Batas ◆ ═══════//
global.multiplier = 100;
global.rpg = {
  emoticon(string) {
    string = string.toLowerCase();
    let emot = {
      exp: "✉️",
      money: "💵",
      potion: "🥤",
      diamond: "💎",
      common: "📦",
      uncommon: "🎁",
      mythic: "🗳️",
      legendary: "🗃️",
      pet: "🎁",
      sampah: "🗑",
      armor: "🥼",
      sword: "⚔️",
      kayu: "🪵",
      batu: "🪨",
      string: "🕸️",
      kuda: "🐎",
      kucing: "🐈",
      anjing: "🐕",
      petFood: "🍖",
      gold: "👑",
      emerald: "💚",
    };
    let results = Object.keys(emot)
      .map((v) => [v, new RegExp(v, "gi")])
      .filter((v) => v[1].test(string));
    if (!results.length) return "";
    else return emot[results[0][0]];
  },
};


global.doc = pickRandom([
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "application/msword",
  "application/pdf",
]);
global.fetch = require("node-fetch");
global.Func = new (require(process.cwd() + "/lib/func"))();
// global.botdate = b.tanggal(new Date());
global.axios = require("axios");
global.Uploader = Uploader;
global.cheerio = require("cheerio");

const _uptime = process.uptime() * 1000;

global.fkontak = {
  key: {
    remoteJid: "0@s.whatsapp.net",
    participant: "0@s.whatsapp.net",
    id: "",
  },
  message: {
    conversation: `*© Shiroko Fork v2.0*`,
  },
};
global.tanggal = async (numer) => {
  const myMonths = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  const myDays = [
    "Minggu",
    "Senin",
    "Selasa",
    "Rabu",
    "Kamis",
    "Jum'at",
    "Sabtu",
  ];

  const tgl = new Date(numer);
  const day = tgl.getDate();
  const bulan = tgl.getMonth();
  const thisDay = tgl.getDay();
  const thisDayName = myDays[thisDay];
  const yy = tgl.getYear();
  const year = yy < 1000 ? yy + 1900 : yy;
  const time = require("moment").tz("Asia/Jakarta").format("DD/MM HH:mm:ss");
  const d = new Date();
  const locale = "id";
  const gmt = new Date(0).getTime() - new Date("1 January 1970").getTime();
  const weton = ["Pahing", "Pon", "Wage", "Kliwon", "Legi"][
    Math.floor((d * 1 + gmt) / 84600000) % 5
  ];

  return `${thisDayName}, ${day} - ${myMonths[bulan]} - ${year}`;
};
//return a(new Date());
global.exec = async (cmd) => {
  let txt = await cp.execSync(cmd);
  return txt.toString();
};
global.Scraper = new scrap();
global.fakestatus = (txt) => {
  return {
    key: {
      remoteJid: "0@s.whatsapp.net",
      participant: "0@s.whatsapp.net",
      id: "",
    },
    message: {
      conversation: txt,
    },
  };
};

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())];
}

let file = require.resolve(__filename);
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  console.log("Update config.js");
  delete require.cache[file];
  require(file);
});
