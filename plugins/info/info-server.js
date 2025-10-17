const axios = require('axios');
const os = require('os');

let handler = async (m, { conn }) => {
  try {
    const response = await axios.get('http://ip-api.com/json/');
    const serverInfo = response.data;

    conn.chatRead(m.chat);
    conn.sendMessage(m.chat, {
      react: {
        text: '⏳',
        key: m.key,
      }
    });

    let serverMessage = `•  *S E R V E R*\n\n`;
    const osInfo = os.platform();
    const totalRAM = Math.floor(os.totalmem() / (1024 * 1024));
    const freeRAM = Math.floor(os.freemem() / (1024 * 1024));
    const uptime = os.uptime();
    const uptimeFormatted = formatUptime(uptime);
    const processor = os.cpus()[0].model;

    serverMessage += `┌  ◦  OS : ${osInfo}\n`;
    serverMessage += `│  ◦  RAM : ${freeRAM} MB / ${totalRAM} MB\n`;
    serverMessage += `│  ◦  Country : ${serverInfo.country}\n`;
    serverMessage += `│  ◦  CountryCode : ${serverInfo.countryCode}\n`;
    serverMessage += `│  ◦  Region : ${serverInfo.region}\n`;
    serverMessage += `│  ◦  RegionName : ${serverInfo.regionName}\n`;
    serverMessage += `│  ◦  City : ${serverInfo.city}\n`;
    serverMessage += `│  ◦  Zip : ${serverInfo.zip}\n`;
    serverMessage += `│  ◦  Lat : ${serverInfo.lat}\n`;
    serverMessage += `│  ◦  Lon : ${serverInfo.lon}\n`;
    serverMessage += `│  ◦  Timezone : ${serverInfo.timezone}\n`;
    serverMessage += `│  ◦  ISP : ${serverInfo.isp}\n`;
    serverMessage += `│  ◦  Org : ${serverInfo.org}\n`;
    serverMessage += `│  ◦  AS : ${serverInfo.as}\n`;
    serverMessage += `│  ◦  Query : HIDDEN\n`;
    serverMessage += `│  ◦  Uptime : ${uptimeFormatted}\n`;
    serverMessage += `└  ◦  Processor : ${processor}`;

    // Create the fake reply with contextInfo
    await conn.sendMessage(m.chat, {
        text: serverMessage,
        contextInfo: {
            externalAdReply: {
                mediaType: 1,
                title: namebot,
                thumbnailUrl: 'https://telegra.ph/file/e64a2612fe7dda57be962.jpg',
                renderLargerThumbnail: true,
                sourceUrl: ''
            },
            forwardedNewsletterMessageInfo: {
                newsletterJid: idch,
                newsletterName: `Powered By ${nameowner}`
            }
        }
    }, { quoted: {
        key: { fromMe: false, participant: '0@s.whatsapp.net', remoteJid: 'status@broadcast' },
        message: {
            conversation: getWIBTime()
        }
    }});
  } catch (e) {
    console.log(e);
  }
};

function formatUptime(uptime) {
  let seconds = Math.floor(uptime % 60);
  let minutes = Math.floor((uptime / 60) % 60);
  let hours = Math.floor((uptime / (60 * 60)) % 24);
  let days = Math.floor(uptime / (60 * 60 * 24));

  let formattedUptime = '';
  if (days > 0) formattedUptime += `${days} days `;
  if (hours > 0) formattedUptime += `${hours} hours `;
  if (minutes > 0) formattedUptime += `${minutes} minutes `;
  if (seconds > 0) formattedUptime += `${seconds} seconds`;

  return formattedUptime.trim();
}

function getWIBTime() {
    const offset = 7; // WIB is UTC+7
    let date = new Date();
    let utc = date.getTime() + (date.getTimezoneOffset() * 60000);
    let wibDate = new Date(utc + (3600000 * offset));
    let hours = wibDate.getHours();
    let minutes = wibDate.getMinutes();
    let seconds = wibDate.getSeconds();
    let ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    let strTime = hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0') + ampm;
    return strTime;
}

handler.command = ['server'];
handler.tags = ['info'];
handler.help = ['server'];

module.exports = handler;