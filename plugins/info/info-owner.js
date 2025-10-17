let moment = require("moment-timezone");
let PhoneNum = require("awesome-phonenumber");
let regionNames = new Intl.DisplayNames(["en"], {
    type: "region",
});

let handler = async (m, {
    conn,
    text,
    usedPrefix,
    command
}) => {
    let nomor = global.owner;
    let array = [];
    for (let i of nomor) {
        let nama = await conn.getName(i + "@s.whatsapp.net");
        array.push([i, nama]);
    }

    let caption = `*[ Halo Kak Ini Owner Ku Jangan Di Spam Ya ]*`;

    let reply = await conn.sendContact(m.chat, array, m);
    await conn.sendMessage(
        m.chat, {
            text: caption,
            mentions: conn.parseMention(caption),
        }, {
            quoted: reply,
        },
    );
};

handler.help = ["owner", "creator"].map((a) => a + " *[Contact Owner]*");
handler.tags = ["info"];
handler.command = ["owner", "creator"];

module.exports = handler;