const WebSocket = require('ws');
const fs = require('fs');

let handler = async (m, { conn, usedPrefix, command }) => {
    let q = m.quoted ? m.quoted : m;
    let mime = (q.msg || q).mimetype || '';
    if (/audio|video/.test(mime)) {
        let media = await q.download?.();
        m.reply('Tunggu sebentar...');
        let wss = "wss://yanzbotz-waifu-yanzbotz.hf.space/queue/join";

        function generateRandomLetters(length) {
            let result = "";
            const alphabetLength = 26;

            for (let i = 0; i < length; i++) {
                const randomValue = Math.floor(Math.random() * alphabetLength);
                const randomLetter = String.fromCharCode("a".charCodeAt(0) + randomValue);
                result += randomLetter;
            }

            return result;
        }

        const zeta = async (audio) => {
            return new Promise(async (resolve, reject) => {
                let name = Math.floor(Math.random() * 100000000000000000) +
                    (await generateRandomLetters(5)) +
                    ".mp4";
                let result = {};
                let send_has_payload = {
                    fn_index: 0,
                    session_hash: "xyuk2cf684b"
                };
                let send_data_payload = {
                    fn_index: 0,
                    data: [
                        {
                            data: "data:audio/mpeg;base64," + audio.toString("base64"),
                            name: name
                        },
                        10,
                        "pm",
                        0.6,
                        false,
                        "",
                        "en-US-AnaNeural-Female"
                    ],
                    event_data: null,
                    session_hash: "xyuk2cf684b"
                };
                const ws = new WebSocket(wss);
                ws.onopen = function () {
                    console.log("Connected to websocket");
                };

                ws.onmessage = async function (event) {
                    let message = JSON.parse(event.data);

                    switch (message.msg) {
                        case "send_hash":
                            ws.send(JSON.stringify(send_has_payload));
                            break;

                        case "send_data":
                            console.log("Processing your audio....");
                            ws.send(JSON.stringify(send_data_payload));
                            break;

                        case "process_completed":
                            result.base64 = "https://yanzbotz-waifu-yanzbotz.hf.space/file=" +
                                message.output.data[1].name;
                            break;
                    }
                };

                ws.onclose = function (event) {
                    if (event.code === 1000) {
                        console.log("Process completed");
                    } else {
                        m.reply("Err: WebSocket Connection Error:\n");
                    }
                    resolve(result);
                };
            });
        };

        let abcd = await zeta(await media);

        conn.sendFile(m.chat, abcd.base64, "", "", m);
    } else {
        m.reply(`Video/audio with caption *${usedPrefix + command}*`);
    }
};

handler.help = ["zetavoice *Reply video/audio*"];
handler.limit = true;
handler.register = true;
handler.command = ["zetavoice"];
handler.tags = ["ai"];

module.exports = handler;