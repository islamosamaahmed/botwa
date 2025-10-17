const cheerio = require('cheerio');
const axios = require('axios');

let handler = async (m, {
    conn,
    text,
    command,
    usedPrefix
}) => {
    switch (command) {
        case 'goresearch':
            if (!text) return m.reply(`[ *x* ] input query\n\nuse */goresearch girl jump*`);
            try {
                m.reply("Processing..."); // Show a processing message
                const gore = await goresearch(text);
                let result = gore.data;
                let no = 1;
                let caption = `*Gore Search🔎*\n\n`;
                result.map(a => {
                    caption += `[ *${no++}* ] ⤵️\n *Judul*: ${a.judul}\n`;
                    caption += ` *Uploader*: ${a.uploader}\n`;
                    caption += ` *Link*: ${a.link}\n\n`;
                });
                conn.reply(m.chat, caption, m);
            } catch (e) {
                m.reply("An error occurred while searching.");
                console.error(e);
            }
            break;

        case 'goredl':
            if (!text) return m.reply(`[ *x* ] input link\n\nuse */goredl https://seegore.com/19-year-old-girl-stabs-her-rapist-17-times/*`);
            try {
                m.reply("Processing..."); // Show a processing message
                const result = await goredl(text);
                conn.sendFile(m.chat, result.data.link || "Error", '', `[ *WARNING* ]\nPihak Bot tidak bertanggung jawab atas video ini jadi lakukan dengan bijak !\n\n*Title*: ${result.data.judul}\n*Views*: ${result.data.views}\n*Comment*: ${result.data.comment}`, m);
            } catch (e) {
                m.reply("An error occurred while downloading the video.");
                console.error(e);
            }
            break;
    }
};

handler.help = handler.command = ['goredl', 'goresearch'];
handler.tags = ['downloader'];
handler.premium = true;

module.exports = handler;

function goredl(link) {
    return new Promise(async (resolve, reject) => {
        axios.get(link)
            .then(({ data }) => {
                const $$ = cheerio.load(data);
                const format = {
                    judul: $$('div.single-main-container > div > div.bb-col.col-content > div > div > div > div > header > h1').text(),
                    views: $$('div.single-main-container > div > div.bb-col.col-content > div > div > div > div > div.s-post-meta-block.bb-mb-el > div > div > div.col-r.d-table-cell.col-md-6.col-sm-6.text-right-sm > div > span > span.count').text(),
                    comment: $$('div.single-main-container > div > div.bb-col.col-content > div > div > div > div > div.s-post-meta-block.bb-mb-el > div > div > div.col-r.d-table-cell.col-md-6.col-sm-6.text-right-sm > div > a > span.count').text(),
                    link: $$('video > source').attr('src')
                };
                const result = {
                    creator: "Bot",
                    data: format
                };
                resolve(result);
            })
            .catch(reject);
    });
}

function goresearch(query) {
    return new Promise(async (resolve, reject) => {
        axios.get('https://seegore.com/?s=' + query).then(dataa => {
            const $$$ = cheerio.load(dataa);
            let slink = 'https://seegore.com/?s=' + query;
            axios.get(slink)
                .then(({ data }) => {
                    const $ = cheerio.load(data);
                    const link = [];
                    const judul = [];
                    const uploader = [];
                    const format = [];
                    const thumb = [];

                    $('#post-items > li > article > div.content > header > h2 > a').each(function(a, b) {
                        link.push($(b).attr('href'));
                    });
                    $('#post-items > li > article > div.content > header > h2 > a').each(function(c, d) {
                        let jud = $(d).text();
                        judul.push(jud);
                    });
                    $('#post-items > li > article > div.content > header > div > div.bb-cat-links > a').each(function(e, f) {
                        let upl = $(f).text();
                        uploader.push(upl);
                    });
                    $('#post-items > li > article > div.post-thumbnail > a > div > img').each(function(g, h) {
                        thumb.push($(h).attr('src'));
                    });

                    for (let i = 0; i < link.length; i++) {
                        format.push({
                            judul: judul[i],
                            uploader: uploader[i],
                            thumb: thumb[i],
                            link: link[i]
                        });
                    }

                    const result = {
                        creator: "Bot",
                        data: format
                    };
                    resolve(result);
                })
                .catch(reject);
        })
        .catch(reject);
    });
}