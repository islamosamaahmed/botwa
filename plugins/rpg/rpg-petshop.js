let handler = async (m, { conn, command, args }) => {
    let type = (args[0] || '').toLowerCase();
    let user = global.db.data.users[m.sender];

    // Ensure user object properties are defined
    user.pickaxe = user.pickaxe || 0;
    user.pedang = user.pedang || 0;
    user.fishingrod = user.fishingrod || 0;
    user.kucing = user.kucing || 0;
    user.anjing = user.anjing || 0;
    user.kuda = user.kuda || 0;
    user.rubah = user.rubah || 0;
    user.robo = user.robo || 0;
    user.lion = user.lion || 0;
    user.naga = user.naga || 0;
    user.centaur = user.centaur || 0;
    user.kyubi = user.kyubi || 0;
    user.griffin = user.griffin || 0;
    user.phonix = user.phonix || 0;
    user.serigala = user.serigala || 0;

    // Pet prices
    const petPrices = {
        anjing: 100000,
        kucing: 300000,
        kuda: 500000,
        rubah: 700000,
        robo: 900000,
        lion: 1000000,
        naga: 1200000,
        centaur: 1400000,
        kyubi: 1600000,
        griffin: 1800000,
        phonix: 2000000,
        serigala: 1500000,
    };

    // Pet names mapping
    const petNames = {
        anjing: 'Anjing',
        kucing: 'Kucing',
        kuda: 'Kuda',
        rubah: 'Rubah',
        robo: 'Robo',
        lion: 'Lion',
        naga: 'Naga',
        centaur: 'Centaur',
        kyubi: 'Kyubi',
        griffin: 'Griffin',
        phonix: 'Phonix',
        serigala: 'Serigala',
    };

    const logo = `乂 *P E T - S T O R E*\n`;
    const caption = `
乂 *N O R M A L*
*[ 🐈 ]* Kucing • Price : _${petPrices.kucing}_
*[ 🐕 ]* Anjing • Price : _${petPrices.anjing}_
*[ 🐎 ]* Kuda • Price : _${petPrices.kuda}_
*[ 🦊 ]* Rubah • Price : _${petPrices.rubah}_
*[ 🤖 ]* Robo • Price : _${petPrices.robo}_

乂 *S P E C I A L*
*[ 🦁 ]* Lion • Price : _${petPrices.lion}_
*[ 🐉 ]* Naga • Price : _${petPrices.naga}_
*[ 🎠 ]* Centaur • Price : _${petPrices.centaur}_
*[ 🦊 ]* Kyubi • Price : _${petPrices.kyubi}_
*[ 🦅 ]* Griffin • Price : _${petPrices.griffin}_
*[ 🦤 ]* Phonix • Price : _${petPrices.phonix}_
*[ 🐺 ]* Serigala • Price : _${petPrices.serigala}_
`.trim();

    try {
        if (/petshop|buypet/i.test(command)) {
            if (!petPrices[type]) return await m.reply(caption);

            if (user[type] > 0) return m.reply(`Anda sudah memiliki pet ini`);

            const petPrice = petPrices[type];
            if (user.money < petPrice) return m.reply(`Uang anda kurang untuk membeli ${petNames[type]}`);

            user.money -= petPrice;
            user[type] = (user[type] || 0) + 1;
            m.reply(`Selamat anda mempunyai pet Baru! 🎉 ${petNames[type]}`);
        } else {
            return await m.reply(caption);
        }
    } catch (err) {
        m.reply("Error\n\n\n" + err.stack);
    }
};

handler.help = ['petshop', 'buypet *<pet>*'];
handler.tags = ['rpg'];
handler.command = /^(petshop|buypet)/i;

module.exports = handler;