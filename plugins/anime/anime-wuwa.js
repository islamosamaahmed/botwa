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
  help: ["wuthering", "wuwa"].map((a) => a + " *[chara name]*"),
  tags: ["anime"],
  command: ["wuthering", "wuwa"],
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
    let chara = [
      "Calcharo",
      "Encore",
      "Jianxin",
      "Jiyan",
      "Lingyang",
      "Rover",
      "Verina",
      "Yinlin",
      "Aalto",
      "Baizhi",
      "Chixia",
      "Danjin",
      "Mortefi",
      "Sanhua",
      "Taoqi",
      "Yangyang",
      "Yuanwu",
    ];
    let capital = (txt) => {
      return txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase();
    };

    if (!text) {
      throw `*• Example :* ${usedPrefix + command} *[chara name]*
*List characters in database :*
${chara.map((a) => "• " + a).join("\n")}`;
    }

    if (!chara.includes(capital(text))) {
      throw `*• Example :* ${usedPrefix + command} *[chara name]*

*List characters in database :*
${chara.map((a) => "• " + a).join("\n")}`;
    }

    m.reply(wait);

    let characters = await (
      await fetch(`https://api.resonance.rest/characters/${capital(text)}`)
    ).json();
    let a = await (
      await fetch(`https://api.resonance.rest/weapons/${characters.weapon}`)
    ).json();
    let weapon = [];

    for (let i of a.weapons) {
      let data = await (
        await fetch(
          `https://api.resonance.rest/weapons/${characters.weapon}/${i}`,
        )
      ).json();
      weapon.push(data);
    }
    let hasil = weapon
      .filter((a) => {
        return typeof a.name === "string";
      })
      .map(
        (a) => `
        • Name: ${a.name}
        • Type: ${a.type}
        • Rarity: ${a.rarity}
        ${
          typeof a.stats.atk === "string"
            ? `• Stats Info:
            • ATK: ${a.stats.atk}
            • Substats: ${a.stats.substat.name || "Nothing!"} [${a.stats.substat.value || "Nothing!"}]
          `
            : ""
        }
        ${
          typeof a.skill.name === "string"
            ? `• Skill Info:
            • Name: ${a.skill.name || "Nothing!"}
            • Description: ${a.skill.description || "Nothing!"}
          `
            : ""
        }
    `,
      )
      .join("\n");
    let cap = `*[ WUTHERING - CHARACTERS ]*
    *• Name :* ${characters.name}
    *• Quote :* ${characters.quote}
    *• Attributes :* ${characters.attribute}
    *• Weapons :* ${characters.weapon}
    *• Rarity :* ${characters.rarity}
    *• Class :* ${characters.class}
    *• Birth Place :* ${characters.birthplace}
    *• Birthday :* ${characters.birthday}

    *[ ${characters.weapon.toUpperCase()} - INFO ]*
${hasil}`;
    conn.sendMessage(
      m.chat,
      {
        image: {
          url: `https://api.resonance.rest/characters/${capital(text)}/portrait`,
        },
        caption: cap,
      },
      {
        quoted: m,
      },
    );
  },
};
