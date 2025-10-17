let handler = async (
  m,
  { conn, isAdmin, isOwner, args, usedPrefix, command },
) => {
  let isClose = {
    open: "not_announcement",
    buka: "not_announcement",
    on: "not_announcement",
    1: "not_announcement",
    close: "announcement",
    tutup: "announcement",
    off: "announcement",
    0: "announcement",
  }[args[0] || ""];

  if (isClose === undefined) {
    let caption = `*• Example :* ${usedPrefix + command} buka 1h\n*• Example :* ${usedPrefix + command} tutup 30m\n\nSatuan waktu:\n- s = detik\n- m = menit\n- h = jam\n- d = hari`;
    m.reply(caption);
    throw false;
  }

  // Parsing durasi
  let duration = args[1] || "";
  let match = duration.match(/^(\d+)([smhd])$/i); // contoh 10s, 5m, 2h, 1d
  let timeoutset = 0;

  if (match) {
    let value = parseInt(match[1]);
    let unit = match[2].toLowerCase();

    switch (unit) {
      case "s":
        timeoutset = value * 1000;
        break;
      case "m":
        timeoutset = value * 60 * 1000;
        break;
      case "h":
        timeoutset = value * 60 * 60 * 1000;
        break;
      case "d":
        timeoutset = value * 24 * 60 * 60 * 1000;
        break;
    }
  } else if (duration) {
    return m.reply(
      `❌ Format salah!\nGunakan angka + satuan tanpa spasi.\n\nContoh:\n- ${usedPrefix + command} buka 1h\n- ${usedPrefix + command} tutup 30m\n- ${usedPrefix + command} tutup 45s`,
    );
  }

  await conn.groupSettingUpdate(m.chat, isClose);
  m.reply(
    `✅ Grup berhasil di *${
      isClose == "announcement" ? "tutup" : "buka"
    }*${timeoutset ? `, akan otomatis berubah setelah *${toReadableTime(timeoutset)}*` : ""}`,
  );

  if (timeoutset) {
    setTimeout(async () => {
      await conn.groupSettingUpdate(
        m.chat,
        `${isClose == "announcement" ? "not_announcement" : "announcement"}`,
      );
      conn.reply(
        m.chat,
        `⏰ Waktu habis!\nGrup sekarang *${
          isClose == "announcement" ? "dibuka, semua member bisa chat" : "ditutup, hanya admin yang bisa chat"
        }*.`,
      );
    }, timeoutset);
  }
};

handler.help = ["grouptime", "gctime"].map(
  (a) => a + " *[buka/tutup duration]*",
);
handler.tags = ["group"];
handler.command = ["gctime", "grouptime"];
handler.botAdmin = true;
handler.group = true;
handler.admin = true;

module.exports = handler;

// Convert ms → format Indonesia
function toReadableTime(ms) {
  let seconds = Math.floor(ms / 1000);
  let days = Math.floor(seconds / (3600 * 24));
  let hours = Math.floor((seconds % (3600 * 24)) / 3600);
  let minutes = Math.floor((seconds % 3600) / 60);
  let secs = Math.floor(seconds % 60);

  let str = [];
  if (days) str.push(`${days} hari`);
  if (hours) str.push(`${hours} jam`);
  if (minutes) str.push(`${minutes} menit`);
  if (secs) str.push(`${secs} detik`);
  return str.join(", ");
}