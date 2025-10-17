const axios = require('axios');

let handler = async (m, { conn, args, text, usedPrefix, command }) => {
    let input = `• *Contoh :* ${usedPrefix + command} 123.456.789.0`;
    if (!text) return m.reply(input);

    getIPInfo(text).then(ipInfo => {
        if (ipInfo) {
            const ip = `
┌────┿ Trackip ┿────┐
│𔓘 *Ip:* ${ipInfo.ip}
│𔓘 *Hostname*: ${ipInfo.hostname}
│𔓘 *City*: ${ipInfo.city}
│𔓘 *Region*: ${ipInfo.region}
│𔓘 *Country*: ${ipInfo.country}
│𔓘 *Loc*: ${ipInfo.loc}
│𔓘 *Org*: ${ipInfo.org}
│𔓘 *Postal*: ${ipInfo.postal}
│𔓘 *Timezone:* ${ipInfo.timezone}
└─────────┿

┌────┿ Lokasi ┿────┐  
│𔓘 *Location:* ${ipInfo.loc}
│𔓘 *Coordinates:* ${ipInfo.loc}
└─────────┿`;
            m.reply(ip);
        }
    });
};

handler.help = ['trackip'];
handler.tags = ['tools'];
handler.command = /^(trackip|getipinfo)$/i;
handler.premium = true;
handler.limit = true;

module.exports = handler;

let ipinfoToken = '882ffefc502ce1';

async function getIPInfo(ip) {
    const response = await axios.get(`http://ipinfo.io/${ip}/json?token=${ipinfoToken}`);
    return response.data;
}