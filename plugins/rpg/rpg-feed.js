//© Shiroko MD 2023-2024
// • Credits : wa.me/6283187610223 [ WanRzy ]
// • Owner: 6288294872511,6283187610223

/*
• untuk siapa pun yang ketahuan menjual script ini tanpa sepengetahuan developer mohon untuk dilaporkan !
*/

let handler = async (m, { conn, args, usedPrefix, command }) => {
  const user = global.db.data.users[m.sender];
  let type = (args[0] || "").toLowerCase();
  let wm = global.wm;
  let linkgc = global.gc;
  let pp = global.thumb;
  let timebah = 600000;
  let timeda = 600000;
  let timela = 600000;
  let timega = 600000;
  let timebi = 600000;
  let timeur = 600000;
  let timenix = 600000;
  let timefin = 600000;
  let timecing = 600000;
  let rubah = user.fox;
  let kuda = user.horse;
  let kucing = user.cat;
  let anjing = user.dog;
  let fox = user.fox;
  let horse = user.horse;
  let wolf = user.wolf;
  let dragon = user.dragon;
  let cat = user.cat;
  let phonix = user.phonix;
  let kyubi = user.kyubi;
  let centaur = user.centaur;
  let griffin = user.griffin;
  let rhinoceros = user.rhinoceros;
  let lion = user.lion;
  if (typeof user.lastfeed === "undefined") {
    user.lastfeed = 0;
  }
  let baba = `*• Example :* ${usedPrefix + command} cat

*L I S T - P E T*
› cat
› fox
› horse
› lion
› rhinoceros
› dragon
› centaur
› kyubi
› griffin
› phonix
› wolf
› Kucing
› Anjing
› Rubah
› Kuda
`;
  switch (type) {
    case "fox":
      if (fox == 0) return m.reply("*Kamu tidak punya pet fox*");
      if (fox == 5) return m.reply("*Pet kamu sudah level max *");
      let wfox = new Date() - user.lastfeed;
      let wfoxa = 600000 - wfox;
      let wfoxaa = clockString(wfoxa);
      if (new Date() - user.lastfeed > 600000) {
        if (user.makananpet > 0) {
          user.makananpet -= 1;
          user.foxexp += 20;
          user.lastfeed = new Date() * 1;
          conn.reply(m.chat, `Feeding ${type} success`, m);
          setTimeout(() => {
            conn.reply(
              m.chat,
              "Waktunya memberi makan *fox*\nKarena sudah lapar..",
              m,
            );
          }, timebah);
          if (fox > 0) {
            let naiklvl = fox * 1000 - 1;
            if (user.foxexp > naiklvl) {
              user.fox += 1;
              user.foxexp -= fox * 1000;
              conn.reply(m.chat, `*Congratulations your pet fox level up*`, m);
            }
          }
        } else m.reply(`Makanan pet kamu tidak cukup`);
      } else
        m.reply(
          `Pet kamu sudah kenyang, Cobalah Untuk Memberi Dia Makan ${wfoxaa} lagi`,
        );
      break;
    case "rhinoceros":
      if (rhinoceros == 0) return m.reply("*Kamu tidak punya pet rhinoceros*");
      if (rhinoceros == 5) return m.reply("*Pet Kamu Telah Level Maximum*");
      let wbadak = new Date() - user.lastfeed;
      let wbadaka = 600000 - wbadak;
      let wbadakaa = clockString(wbadaka);
      if (new Date() - user.lastfeed > 600000) {
        if (user.makananpet > 0) {
          user.makananpet -= 1;
          user.rhinocerosexp += 15;
          user.lastfeed = new Date() * 1;
          conn.reply(m.chat, `Feeding ${type} success`, m);
          if (rhinoceros > 0) {
            let naiklvl = rhinoceros * 1000 - 1;
            if (user.rhinocerosexp > naiklvl) {
              user.rhinoceros += 1;
              user.rhinocerosexp -= rhinoceros * 100;
              conn.reply(
                m.chat,
                `*Congratulations your pet rhinoceros level up*`,
                m,
              );
            }
          }
        } else m.reply(`Makanan Pet Kamu Tidak Cukup`);
      } else
        m.reply(
          `Pet Kamu Sudah Kenyang, Cobalah Untuk Memberi Dia Makan ${wbadakaa} lagi`,
        );
      break;
    case "lion":
      if (lion == 0) return m.reply("*Kamu tidak punya pet*");
      if (lion == 5) return m.reply("*Pet Kamu Telah Level Maximum*");
      let wlion = new Date() - user.lastfeed;
      let wliona = 600000 - wlion;
      let wlionaa = clockString(wliona);
      if (new Date() - user.lionlastfeed > 600000) {
        if (user.makananpet > 0) {
          user.makananpet -= 1;
          user.lionexp += 15;
          user.lastfeed = new Date() * 1;
          conn.reply(m.chat, `Feeding ${type} success`, m);
          if (lion > 0) {
            let naiklvl = lion * 1000 - 1;
            if (user.lionexp > naiklvl) {
              user.lion += 1;
              user.lionexp -= lion * 100;
              conn.reply(m.chat, `*Congratulations your pet lion level up*`, m);
            }
          }
        } else m.reply(`Makanan Pet Kamu Tidak Cukup`);
      } else
        m.reply(
          `Pet Kamu Sudah Kenyang, Cobalah Untuk Memberi Dia Makan ${wlionaa} lagi`,
        );
      break;
    case "horse":
      if (horse == 0) return m.reply("*Kamu tidak punya pet horse*");
      if (horse == 5) return m.reply("*Pet kamu sudah level max *");
      let whorse = new Date() - user.lastfeed;
      let whorsea = 600000 - whorse;
      let whorseaa = clockString(whorsea);
      if (new Date() - user.lastfeed > 600000) {
        if (user.makananpet > 0) {
          user.makananpet -= 1;
          user.horseexp += 20;
          user.lastfeed = new Date() * 1;
          conn.reply(m.chat, `Feeding ${type} success`, m);
          setTimeout(() => {
            conn.reply(
              m.chat,
              "Waktunya memberi makan *horse*\nKarena sudah lapar..",
              m,
            );
          }, timeda);
          if (horse > 0) {
            let naiklvl = horse * 1000 - 1;
            if (user.horseexp > naiklvl) {
              user.horse += 1;
              user.horseexp -= horse * 1000;
              conn.reply(
                m.chat,
                `*Congratulations your pet horse level up*`,
                m,
              );
            }
          }
        } else m.reply(`Makanan pet kamu tidak cukup`);
      } else
        m.reply(
          `Pet kamu sudah kenyang, Cobalah Untuk Memberi Dia Makan ${whorseaa} lagi`,
        );
      break;
    case "wolf":
      if (wolf == 0) return m.reply("*Kamu tidak punya pet wolf*");
      if (wolf == 5) return m.reply("*Pet kamu sudah level max *");
      let wwolf = new Date() - user.lastfeed;
      let wwolfa = 600000 - wwolf;
      let wwolfaa = clockString(wwolfa);
      if (new Date() - user.lastfeed > 600000) {
        if (user.makananpet > 0) {
          user.makananpet -= 1;
          user.wolfexp += 15;
          user.lastfeed = new Date() * 1;
          conn.reply(m.chat, `Feeding ${type} success`, m);
          setTimeout(() => {
            conn.reply(
              m.chat,
              "Waktunya memberi makan *wolf*\nKarena sudah lapar..",
              m,
            );
          }, timela);
          if (wolf > 0) {
            let naiklvl = wolf * 10000 - 1;
            if (user.wolfexp > naiklvl) {
              user.wolf += 1;
              user.wolfexp -= wolf * 10000;
              conn.reply(m.chat, `*Congratulations your pet wolf level up*`, m);
            }
          }
        } else m.reply(`Makanan pet kamu tidak cukup`);
      } else
        m.reply(
          `Pet kamu sudah kenyang, Cobalah Untuk Memberi Dia Makan ${wwolfaa} lagi`,
        );
      break;
    case "dragon":
      if (dragon == 0) return m.reply("*Kamu tidak punya pet dragon*");
      if (dragon == 5) return m.reply("*Pet kamu sudah level max *");
      let wdragon = new Date() - user.lastfeed;
      let wdragona = 600000 - wdragon;
      let wdragonaa = clockString(wdragona);
      if (new Date() - user.lastfeed > 600000) {
        if (user.makanandragon > 0) {
          user.makanandragon -= 1;
          user.dragonexp += 10;
          user.lastfeed = new Date() * 1;
          conn.reply(m.chat, `Feeding ${type} success`, m);
          setTimeout(() => {
            conn.reply(
              m.chat,
              "Waktunya memberi makan *dragon*\nKarena sudah lapar..",
              m,
            );
          }, timega);
          if (dragon > 0) {
            let naiklvl = dragon * 10000 - 1;
            if (user.dragonexp > naiklvl) {
              user.dragon += 1;
              user.dragonexp -= dragon * 10000;
              conn.reply(
                m.chat,
                `*Congratulations your pet dragon level up*`,
                m,
              );
            }
          }
        } else m.reply(`Makanan pet kamu tidak cukup`);
      } else
        m.reply(
          `Pet kamu sudah kenyang, Cobalah Untuk Memberi Dia Makan ${wdragonaa} lagi`,
        );
      break;
    case "kyubi":
      if (kyubi == 0) return m.reply("*Kamu tidak punya pet kyubi*");
      if (kyubi == 5) return m.reply("*Pet kamu sudah level max *");
      let wkyubi = new Date() - user.lastfeed;
      let wkyubia = 600000 - wkyubi;
      let wkyubiaa = clockString(wkyubia);
      if (new Date() - user.lastfeed > 600000) {
        if (user.makanankyubi > 0) {
          user.makanankyubi -= 1;
          user.kyubiexp += 10;
          user.lastfeed = new Date() * 1;
          conn.reply(m.chat, `Feeding ${type} success`, m);
          setTimeout(() => {
            conn.reply(
              m.chat,
              "Waktunya memberi makan *Kyubi*\nKarena sudah lapar..",
              m,
            );
          }, timebi);
          if (kyubi > 0) {
            let naiklvl = kyubi * 10000 - 1;
            if (user.kyubiexp > naiklvl) {
              user.kyubi += 1;
              user.kyubiexp -= kyubi * 10000;
              conn.reply(
                m.chat,
                `*Congratulations your pet Kyubi level up*`,
                m,
              );
            }
          }
        } else m.reply(`Makanan pet kamu tidak cukup`);
      } else
        m.reply(
          `Pet kamu sudah kenyang, Cobalah Untuk Memberi Dia Makan ${wkyubiaa} lagi`,
        );
      break;
    case "centaur":
      if (centaur == 0) return m.reply("*Kamu tidak punya pet centaur*");
      if (centaur == 5) return m.reply("*Pet kamu sudah level max *");
      let wcentaur = new Date() - user.lastfeed;
      let wcentaura = 600000 - wcentaur;
      let wcentauraa = clockString(wcentaura);
      if (new Date() - user.lastfeed > 600000) {
        if (user.makanancentaur > 0) {
          user.makanancentaur -= 1;
          user.centaurexp += 10;
          user.lastfeed = new Date() * 1;
          conn.reply(m.chat, `Feeding ${type} success`, m);
          setTimeout(() => {
            conn.reply(
              m.chat,
              "Waktunya memberi makan *Centaur*\nKarena sudah lapar..",
              m,
            );
          }, timeur);
          if (centaur > 0) {
            let naiklvl = centaur * 10000 - 1;
            if (user.centaurexp > naiklvl) {
              user.centaur += 1;
              user.centaurexp -= centaur * 10000;
              conn.reply(
                m.chat,
                `*Congratulations your pet Centaur level up*`,
                m,
              );
            }
          }
        } else m.reply(`Makanan pet kamu tidak cukup`);
      } else
        m.reply(
          `Pet kamu sudah kenyang, Cobalah Untuk Memberi Dia Makan ${wcentauraa} lagi`,
        );
      break;
    case "phonix":
      if (phonix == 0) return m.reply("*Kamu tidak punya pet Phonix*");
      if (phonix == 5) return m.reply("*Pet kamu sudah level max *");
      let wphonix = new Date() - user.phonixlastfeed;
      let wphonixa = 600000 - wphonix;
      let wphonixaa = clockString(wphonixa);
      if (new Date() - user.phonixlastfeed > 600000) {
        if (user.makananphonix > 0) {
          user.makananphonix -= 1;
          user.phonixexp += 10;
          user.phonixlastfeed = new Date() * 1;
          conn.reply(m.chat, `Feeding ${type} success`, m);
          setTimeout(() => {
            conn.reply(
              m.chat,
              "Waktunya memberi makan *Phonix*\nKarena sudah lapar..",
              m,
            );
          }, timenix);
          if (phonix > 0) {
            let naiklvl = phonix * 10000 - 1;
            if (user.phonixexp > naiklvl) {
              user.phonix += 1;
              user.phonixexp -= phonix * 10000;
              conn.reply(
                m.chat,
                `*Congratulations your pet Phonix level up*`,
                m,
              );
            }
          }
        } else m.reply(`Makanan pet kamu tidak cukup`);
      } else
        m.reply(
          `Pet kamu sudah kenyang, Cobalah Untuk Memberi Dia Makan ${wphonixaa} lagi`,
        );
      break;
    case "griffin":
      if (griffin == 0) return m.reply("*Kamu tidak punya pet Griffin*");
      if (griffin == 5) return m.reply("*Pet kamu sudah level max *");
      let wgriffin = new Date() - user.griffinastclaim;
      let wgriffina = 600000 - wgriffin;
      let wgriffinaa = clockString(wgriffina);
      if (new Date() - user.lastfeed > 600000) {
        if (user.makanangriffin > 0) {
          user.makanangriffin -= 1;
          user.griffinexp += 10;
          user.lastfeed = new Date() * 1;
          conn.reply(m.chat, `Feeding ${type} success`, m);
          setTimeout(() => {
            conn.reply(
              m.chat,
              "Waktunya memberi makan *Griffin*\nKarena sudah lapar..",
              m,
            );
          }, timefin);
          if (griffin > 0) {
            let naiklvl = griffin * 10000 - 1;
            if (user.griffinexp > naiklvl) {
              user.griffin += 1;
              user.griffinexp -= griffin * 10000;
              conn.reply(
                m.chat,
                `*Congratulations your pet Greffin level up*`,
                m,
              );
            }
          }
        } else m.reply(`Makanan pet kamu tidak cukup`);
      } else
        m.reply(
          `Pet kamu sudah kenyang, Cobalah Untuk Memberi Dia Makan ${wgriffinaa} lagi`,
        );
      break;
    case "cat":
      if (cat == 0) return m.reply("*Kamu tidak punya pet cat*");
      if (cat == 5) return m.reply("*Pet kamu sudah level max *");
      let wcat = new Date() - user.lastfeed;
      let wcata = 600000 - wcat;
      let wcataa = clockString(wcata);
      if (new Date() - user.lastfeed > 600000) {
        if (user.makananpet > 0) {
          user.makananpet -= 1;
          user.catexp += 20;
          user.catlastfeed = new Date() * 1;
          conn.reply(m.chat, `Feeding ${type} success`, m);
          setTimeout(() => {
            conn.reply(
              m.chat,
              "Waktunya memberi makan *cat*\nKarena sudah lapar..",
              m,
            );
          }, timecing);
          if (cat > 0) {
            let naiklvl = cat * 1000 - 1;
            if (user.catexp > naiklvl) {
              user.cat += 1;
              user.catexp -= cat * 1000;
              conn.reply(m.chat, `*Congratulations your pet cat level up*`, m);
            }
          }
        } else m.reply(`Makanan pet kamu tidak cukup`);
      } else
        m.reply(
          `Pet kamu sudah kenyang, Cobalah Untuk Memberi Dia Makan ${wcataa} lagi`,
        );
      break;
    case "rubah":
      if (rubah == 0) return m.reply("*Kamu belum memiliki Pet Rubah*");
      if (rubah == 10) return m.reply("*Pet kamu dah lvl max*");
      let wrubah = new Date() - user.lastfeed;
      let wrubaha = 600000 - wrubah;
      let wrubahaa = clockString(wrubaha);
      if (new Date() - user.lastfeed > 600000) {
        if (user.petFood > 0) {
          user.petFood -= 1;
          user.foxexp += 20;
          user.lastfeed = new Date() * 1;
          conn.reply(m.chat, `Berhasil memberi makan pet ${type} 🦊`, m);
          if (rubah > 0) {
            let naiklvl = rubah * 100 - 1;
            if (user.foxexp > naiklvl) {
              user.fox += 1;
              user.foxexp -= rubah * 100;
              conn.reply(m.chat, `*Selamat Pet Rubah kamu naik level ✨*`, m);
            }
          }
        } else m.reply(`Makanan pet kamu tidak cukup`);
      } else
        m.reply(
          `Pet kamu sudah kenyang, Cobalah Untuk Memberi Dia Makan ${wrubahaa} lagi`,
        );
      break;
    case "kucing":
      if (kucing == 0) return m.reply("*Kamu belum memiliki Pet Kucing*");
      if (kucing == 10) return m.reply("*Pet kamu dah lvl max*");
      let wkucing = new Date() - user.catlastfeed;
      let wkucinga = 600000 - wkucing;
      let wkucingaa = clockString(wkucinga);
      if (new Date() - user.catlastfeed > 600000) {
        if (user.petFood > 0) {
          user.petFood -= 1;
          user.catngexp += 20;
          user.catlastfeed = new Date() * 1;
          conn.reply(m.chat, `Berhasil memberi makan pet ${type} 🐱`, m);
          if (kucing > 0) {
            let naiklvl = kucing * 100 - 1;
            if (user.catexp > naiklvl) {
              user.cat += 1;
              user.catngexp -= kucing * 100;
              conn.reply(m.chat, `*Selamat Pet Kucing kamu naik level ✨*`, m);
            }
          }
        } else m.reply(`Makanan pet kamu tidak cukup`);
      } else
        m.reply(
          `Pet kamu sudah kenyang, Cobalah Untuk Memberi Dia Makan ${wkucingaa} lagi`,
        );
      break;
    case "anjing":
      if (anjing == 0) return m.reply("*Kamu belum memiliki Pet Anjing*");
      if (anjing == 10) return m.reply("*Pet kamu dah lvl max*");
      let wanjing = new Date() - user.lastfeed;
      let wanjinga = 600000 - wanjing;
      let wanjingaa = clockString(wanjinga);
      if (new Date() - user.lastfeed > 600000) {
        if (user.petFood > 0) {
          user.petFood -= 1;
          user.dogexp += 20;
          user.lastfeed = new Date() * 1;
          conn.reply(m.chat, `Berhasil memberi makan pet ${type} 🐶`, m);
          if (anjing > 0) {
            let naiklvl = anjing * 100 - 1;
            if (user.dogexp > naiklvl) {
              user.dog += 1;
              user.dogexp -= anjing * 100;
              conn.reply(m.chat, `*Selamat Pet Anjing kamu naik level ✨*`, m);
            }
          }
        } else m.reply(`Makanan pet kamu tidak cukup`);
      } else
        m.reply(
          `Pet kamu sudah kenyang, Cobalah Untuk Memberi Dia Makan ${wanjingaa} lagi`,
        );
      break;
    case "kuda":
      if (kuda == 0) return m.reply("*Kamu belum memiliki Pet Kuda*");
      if (kuda == 10) return m.reply("*Pet kamu dah lvl max*");
      let wkuda = new Date() - user.lastfeed;
      let wkudaa = 600000 - wkuda;
      let wkudaaa = clockString(wkudaa);
      if (new Date() - user.lastfeed > 600000) {
        if (user.petFood > 0) {
          user.petFood -= 1;
          user.horseexp += 20;
          user.lastfeed = new Date() * 1;
          conn.reply(m.chat, `Berhasil memberi makan pet ${type} 🐴`, m);
          if (kuda > 0) {
            let naiklvl = kuda * 100 - 1;
            if (user.horseexp > naiklvl) {
              user.horse += 1;
              user.horseexp -= kuda * 100;
              conn.reply(m.chat, `*Selamat Pet Kuda kamu naik level ✨*`, m);
            }
          }
        } else m.reply(`Makanan pet kamu tidak cukup`);
      } else
        m.reply(
          `Pet kamu sudah kenyang, Cobalah Untuk Memberi Dia Makan ${wkudaaa} lagi`,
        );
      break;
    default:
      await conn.sendList(
        m.chat,
        "F E E D - P E T",
        [
          {
            title: "List Featured",
            rows: [
              {
                title: "Feed dragon",
                command: ".feed fox",
                body: "Memberi makan Fox",
              },
              {
                title: "Feed rhinoceros",
                command: ".feed rhinoceros",
                body: "Memberi makan Rhinoceros",
              },
              {
                title: "Feed lion",
                command: ".feed lion",
                body: "Memberi makan Lion",
              },
              {
                title: "Feed Horse",
                command: ".feed horse",
                body: "Memberi makan Horse",
              },
              {
                title: "Feed Wolf",
                command: ".feed wolf",
                body: "Memberi makan Wolf",
              },
              {
                title: "Feed Dragon",
                command: ".feed dragon",
                body: "Memberi makan Dragon",
              },
              {
                title: "Feed Kyubi",
                command: ".feed kyubi",
                body: "Memberi makan Kyubi",
              },
              {
                title: "Feed Centaur",
                command: ".feed centaur",
                body: "Memberi makan Centaur",
              },
              {
                title: "Feed Griffin",
                command: ".feed griffin",
                body: "Memberi makan Griffin",
              },
              {
                title: "Feed Phoenix",
                command: ".feed phoenix",
                body: "Memberi makan Phoenix",
              },
              {
                title: "Feed Cat",
                command: ".feed cat",
                body: "Memberi makan Cat",
              },
              {
                title: "Feed Rubah",
                command: ".feed rubah",
                body: "Memberi makan Rubah",
              },
              {
                title: "Feed Kuda",
                command: ".feed kuda",
                body: "Memberi makan Kuda",
              },
              {
                title: "Feed Kucing",
                command: ".feed kucing",
                body: "Memberi makan Kucing",
              },
              {
                title: "Feed Anjing",
                command: ".feed anjing",
                body: "Memberi makan Anjing",
              },
            ],
          },
        ],
        m,
        {
          body: baba,
        },
      );
  }
};
handler.help = ["feed"];
handler.tags = ["rpg"];
handler.command = /^(feed(ing)?)$/i;

module.exports = handler;

function clockString(ms) {
  let m = isNaN(ms) ? "--" : Math.floor(ms / 60000) % 60;
  let s = isNaN(ms) ? "--" : Math.floor(ms / 1000) % 60;
  return `Cooldown : *[ ${m.toString().padStart(2, 0)}:${s.toString().padStart(2, 0)} ]*`;
}
