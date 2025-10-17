let handler = async (m, { conn, usedPrefix }) => {
    let user = global.db.data.users[m.sender];
    let __timers = (new Date - user.lastgrab);
    let _timers = (10800000 - __timers);
    let timers = clockString(_timers);
    let name = await conn.getName(m.sender);

    if (user.stamina < 10) return m.reply(`Stamina anda tidak cukup\nharap isi stamina anda dengan *${usedPrefix}eat*`);
    if (_timers > 0) return m.reply(`Kamu masih kelelahan\nHarap tunggu ${timers} lagi`);

    let rndm1 = Math.floor(Math.random() * 3);
    let rndm2 = Math.floor(Math.random() * 5);
    let rndm3 = Math.floor(Math.random() * 5);
    let rndm4 = Math.floor(Math.random() * 3);
    let rndm5 = Math.floor(Math.random() * 50);
    let rndm6 = Math.floor(Math.random() * 30);
    let rndm7 = Math.floor(Math.random() * 10);
    let rndm8 = Math.floor(Math.random() * 50);
    let rndm9 = Math.floor(Math.random() * 20);

    let ran1 = rndm1 * 10;
    let ran2 = rndm2 * 10;
    let ran3 = rndm3 * 10;
    let ran4 = rndm4 * 10;
    let ran5 = rndm5 * 10;
    let ran6 = rndm6 * 10;
    let ran7 = rndm7 * 10;
    let ran8 = rndm8 * 10;
    let ran9 = rndm9 * 10;

    let hmsil1 = ran1;
    let hmsil2 = ran2;
    let hmsil3 = ran3;
    let hmsil4 = ran4;
    let hmsil5 = ran5;
    let hmsil6 = ran6;
    let hmsil7 = ran7;
    let hmsil8 = ran8;
    let hmsil9 = ran9;

    let jln = `
⬛⬛⬛⬛⬛⬛⬛⬛🚶⬛
⬛⬜⬜⬜⬛⬜⬜⬜⬛⬛
⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛
🏘️🏘️🏘️🏘️🌳🌳🏘️ 🌳🌳🌳

✔️ ${name} Wait....
`;

    let jln2 = `
⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛
⬛⬜⬜⬜⬛⬜⬜⬜⬛🚶
⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛
🏘️🏘️🏘️🏘️🌳🌳🏘️ 🌳🌳🌳

➕ ${name} Menemukan Area....
`;

    let jln3 = `
⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛
⬛⬜⬜⬛⬛⬜⬜⬜⬛⬛
⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛
🏘️🏘️🏘️🏘️🌳🌳🏘️ 🌳🌳🚶

➕ ${name} Mulai Megrab....
`;

    let jln4 = `
⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛
⬛⬜⬜⬛⬛⬜⬜⬜⬛⬛
⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛
🏘️🏘️🏘️🏘️🌳🌳🏘️ 🚶

➕ ${name}
💹 Menerima gaji....
`;

    let hsl = `
*《 Hasil grab ${name} 》*

*💎 = [ ${hmsil1} ] Diamond*
*⛓️ = [ ${hmsil2} ] Iron*
*🪙 = [ ${hmsil3} ] Gold*
*💚 = [ ${hmsil4} ] Emerald*
*🪨 = [ ${hmsil5} ] Rock*
*🌕 = [ ${hmsil6} ] Clay*
*🕳️ = [ ${hmsil7} ] Coal*
*🌑 = [ ${hmsil8} ] Sand*
*✉️ = [ ${hmsil9} ] Exp*

_Stamina anda berkurang_ -10
`;

    user.diamond += hmsil1;
    user.iron += hmsil2;
    user.gold += hmsil3;
    user.emerald += hmsil4;
    user.rock += hmsil5;
    user.clay += hmsil6;
    user.coal += hmsil7;
    user.sand += hmsil8;
    user.exp += hmsil9;
    user.stamina -= 10;

    if (typeof conn.loadingMsg !== 'function') {
        conn.loadingMsg = async (chat, initMsg, resultMsg, steps, m) => {
            await m.reply(initMsg);
            for (let step of steps) {
                await new Promise(resolve => setTimeout(resolve, 1000));
                await m.reply(step);
            }
            await m.reply(resultMsg);
        };
    }

    await conn.loadingMsg(m.chat, `🔍 ${name} Mencari Area Grab.....`, hsl, [jln, jln2, jln3, jln4], m);
    user.lastgrab = new Date().getTime();
};

handler.help = ['grab'];
handler.tags = ['rpg'];
handler.command = /^(taksi|taxy|grab|megrab)$/i;

module.exports = handler;

function clockString(ms) {
    let d = isNaN(ms) ? '--' : Math.floor(ms / 86400000);
    let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000) % 24;
    let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60;
    let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60;
    return [`${d} *Days ☀️*`, `${h} *Hours 🕐*`, `${m} *Minutes ⏰*`, `${s} *Seconds ⏱️*`].map(v => v.toString().padStart(2, 0)).join(' ');
}