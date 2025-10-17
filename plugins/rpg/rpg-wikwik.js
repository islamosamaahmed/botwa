//© Shiroko MD 2023-2024
// • Credits : wa.me/6283187610223 [ WanRzy ]
// • Owner: 6288294872511,6283187610223

/*
• untuk siapa pun yang ketahuan menjual script ini tanpa sepengetahuan developer mohon untuk dilaporkan !
*/
let syaii = async (m, { conn, text }) => {
  if (!text)
    return m.reply(
      "masukan nama yang ingin di wikwik oleh mu contoh\nwikwik angel sen",
    );
  const petarung = [
    "Freya",
    "kimihime",
    "Senyamiku",
    "Megumi",
    "Tsunade",
    "Hinata",
  ];
  const totalRounds = 8;
  const petarung2 = text;
  let ronde = 1;
  let nyawaPetarung1 = 200;
  let nyawaPetarung2 = 200;

  let result = `🫶 wikwik antara ${m.name} dan ${petarung2} dimulai! 🫦\n\n`;

  while (ronde <= totalRounds && nyawaPetarung1 > 0 && nyawaPetarung2 > 0) {
    const pukulan = [
      "ajulgedang",
      "gayamarmot",
      "gayaroket",
      "gayakucing",
      "gayakatak",
    ];

    const pilihanPetarung1 =
      pukulan[Math.floor(Math.random() * pukulan.length)];
    const pilihanPetarung2 =
      pukulan[Math.floor(Math.random() * pukulan.length)];

    const damagePetarung1 = Math.floor(Math.random() * 50) + 1;
    const damagePetarung2 = Math.floor(Math.random() * 50) + 1;

    result += `🫦💦 Ronde ${ronde}\n`;
    result += `${m.name} stamina: ${nyawaPetarung1}\n`;
    result += `${petarung2} stamina: ${nyawaPetarung2}\n`;
    result += `${m.name}: ${pilihanPetarung1}\n`;
    result += `${petarung2}: ${pilihanPetarung2}\n\n`;

    if (pilihanPetarung1 === pilihanPetarung2) {
      result += `⚔️ wikwik sedang berlangsung melakukan gaya yang sama! blom ada yang keluar sama sekali.\n`;
    } else {
      result += `💦 ${m.name} melakukan ${pilihanPetarung1} dan ${petarung2} melakukan ${pilihanPetarung2}!\n`;
      nyawaPetarung1 -=
        pilihanPetarung2 === "jab" ? damagePetarung1 : damagePetarung1 + 10;
      nyawaPetarung2 -=
        pilihanPetarung1 === "jab" ? damagePetarung2 : damagePetarung2 + 10;
      result += `💔 ${m.name} menerima jilmek ${nyawaPetarung1 >= 0 ? damagePetarung1 : 0}!\n`;
      result += `💔 ${petarung2} menerima spong ${nyawaPetarung2 >= 0 ? damagePetarung2 : 0}!\n\n--------------------------------------------------\n`;
    }

    ronde++;
  }

  result += `\n⏱️ wikwik akhirnya berakhir!\n`;
  result += `${m.name} stamina akhir: ${nyawaPetarung1}\n`;
  result += `${petarung2} stamina akhir: ${nyawaPetarung2}\n`;

  if (nyawaPetarung1 > nyawaPetarung2) {
    result += `👙 ${m.name} memenangkan pertandingan dengan keluar cairan yang lebih banyak!\n`;
  } else if (nyawaPetarung2 > nyawaPetarung1) {
    result += `🩲 ${petarung2} memenangkan pertandingan dengan keluar cairan yang lebih banyak!\n`;
  } else {
    result += `👙💦 Pertandingan berakhir imbang! Kedua yang wikwik memiliki stamina yang sama.\n`;
  }

  await m.reply(`${result}`);
};
syaii.help = syaii.command = ["wikwik"];

module.exports = syaii;
