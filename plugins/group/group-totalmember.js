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

module.exports = {
  help: ["totalmem", "askot"].map((a) => a + " *[total member]*"),
  tags: ["group"],
  command: ["totalmem", "askot"],
  group: true,
  code: async (
    m,
    {
      conn,
      usedPrefix,
      command,
      text,
      isOwner,
      isAdmin,
      isBotAdmin,
      isPrems,
      chatUpdate,
    },
  ) => {
    let PhoneNum = require("awesome-phonenumber");
    let regionNames = new Intl.DisplayNames(["en"], {
      type: "region",
    });
    let data = store.groupMetadata[m.chat];
    let participants = data.participants;

    let countryMembers = {};
    for (let participant of participants) {
      let phoneNumber = "+" + participant.id.split("@")[0];
      let regionCode = PhoneNum(phoneNumber).getRegionCode("internasional");
      let country = regionNames.of(regionCode);
      if (!countryMembers[country]) {
        countryMembers[country] = [];
      }
      countryMembers[country].push(participant.id);
    }

    let countryCounts = Object.keys(countryMembers).map((country) => ({
      name: country,
      total: countryMembers[country].length,
      jid: countryMembers[country],
    }));

    let totalSum = countryCounts.reduce(
      (acc, country) => acc + country.total,
      0,
    );
    let totalRegion = Object.keys(countryMembers).length;

    let hasil = countryCounts.map(({ name, total, jid }) => ({
      name,
      total,
      jid,
      percentage: ((total / totalSum) * 100).toFixed(2) + "%",
    }));

    let cap = `┌─⭓「 *TOTAL MEMBER* 」
│ *• Name :* ${data.subject}
│ *• Total :* ${participants.length}
│ *• Total Region :* ${totalRegion}
└───────────────⭓

┌─⭓「 *REGION MEMBER* 」
${hasil
  .sort((b, a) => a.total - b.total)
  .map(
    (a) => `│ *• Region :* ${a.name} *[ ${a.percentage} ]*
│ *• Total :* ${a.total} ${a.jid[0].startsWith("62") === true ? "" : `\n│ *• Jid :*\n${a.jid.map((i) => "│ @" + i.split("@")[0]).join("\n")}`}`,
  )
  .join("\n├───────────────⭓\n")}
└───────────────⭓`;
    conn.reply(m.chat, cap, fakestatus("*[ Total member ]*"));
  },
};
