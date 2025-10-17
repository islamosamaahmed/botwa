const {
  WAMessageStubType,
  generateWAMessage,
  areJidsSameUser,
  proto,
  isRealMessage,
} = require("@whiskeysockets/baileys");
const chalk = require("chalk");
const qs = require("qs");
const axios = require("axios");

module.exports = async (m, conn = {}, chatUpdate) => {
  let type = m.isGroup ? "GROUP CHAT" : "PRIVATE CHAT";
  let user = global.db.data.users[m.sender];
  let from = await conn.getName(m.chat);
  let number = m.sender + ` [ ${m.name} ]`;
  let isBot = m.isBaileys ? "YA" : "NO";
  let plugin = m.plugin;
  let txt = "";
  if (m.text.length >= 30) {
    txt = m.text.slice(0, 29) + "...";
  } else {
    txt = m.text;
  }
  let headers = `${chalk.yellow.bold("--------------------------------------------------")}
     ${chalk.cyan.bold("• CHAT INFORMATION")}
 ${chalk.yellow.bold("-----------------------------------------------------------")}`;
  let body = `${chalk.green.bold(`• TYPE : ${type}`)}
 ${chalk.cyan.bold(`• FROM : ${from}`)}
${chalk.blue.bold(`• NUMBER : ${number}`)}
${chalk.yellow.bold(`• CHATBOT : ${isBot}`)}
${chalk.magenta.bold(`• PLUGIN : ${plugin || ""}`)}
${chalk.yellow.bold("• EXP : " + user.exp)}
${chalk.cyan.bold("• LEVEL : " + user.level)}
${chalk.green.bold("• MIMTYPE :")} ${chalk.black(chalk.bgGreen(m.messageStubType ? WAMessageStubType[m.messageStubType] : m.mtype))}`;
  let command = `${chalk.green.bold("=======================================")}
${m.isCommand ? chalk.yellow.bold(txt) : m.error ? chalk.red.bold(txt) : chalk.white.bold(txt)}
${chalk.green.bold("=======================================")}`;
  let footer = chalk.blue.bold("SCRIPT BY ZASS");
  console.log(`${headers}\n${body}\n${command}\n${footer}`);
};

let fs = require("fs");
let file = require.resolve(__filename);
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  console.log("Update config.js");
  delete require.cache[file];
  require(file);
});
