let handler = async (m, { conn, text, usedPrefix, command }) => {
  conn.reply(
    m.chat,
    `📍𝑰𝑵𝑻𝑹𝑶𝑶 𝑴𝑬𝑴 𝑩𝑨𝑹𝑼📍
╭─ׅ──ֹ━━━ׅ━⁞ ✶ ⁞━ׅ━━━ֹ──ׅ─╮
╠━ *𝐍𝐚𝐦𝐚*  ︎ ︎: 
╠━ *𝐔𝐦𝐮𝐫* ︎ ︎ ︎: 
╠━ *𝐊𝐞𝐥𝐚𝐬* ︎ ︎ ︎: 
╠━ *𝐂𝐨/𝐂𝐞* ︎ ︎: 
╠━ *𝐀𝐬𝐤𝐨𝐭*  ︎ ︎: 
╠━ *𝐇𝐨𝐛𝐢* ︎ ︎ ︎ ︎ ︎: 
╠━ *𝐒𝐭𝐚𝐭𝐮𝐬* : 
╠━ *𝐀𝐠𝐚𝐦𝐚* : 
╰────────────────╯
∘₊✧──────☆───────✧₊∘
> *_NOTE/CATATAN_*:
> ● *Status = Jomblo/Pacaran*
> ● *Askot = Asal Kota*
> ● *Agama Boleh Di Privat*
> ● *Jangan Lupa Baca Desk Gc*
∘₊✧──────☆───────✧₊∘

╭︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎︎─ ︎ ︎     ︎ ︎──── ︎  ︎ ︎︎ ︎ ︎  ︎─╮
︎ ︎  ︎    𝐒𝐀𝐋𝐊𝐄𝐍 𝐀𝐋𝐋
╰︎─ ︎ ︎ ︎ ︎ ︎  ︎ ︎──── ︎ ︎ ︎  ︎ ︎ ︎ ︎─╯`,
    fkontak,
  );
};
handler.help = ["intro"].map((a) => a + " *[introduction ys]*");
handler.tags = ["group"];
handler.command = ["intro"];

module.exports = handler;
