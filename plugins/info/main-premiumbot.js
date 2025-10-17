let handler = async (m, { conn }) => {
let kaguya = `*╔═════════════════❑*\n*║      ◆ LIST PREMIUM BOT ◆*\n*║═════════════════❑*\n*║ ✾  1 Minggu : Rp.3.000*\n*║ ✾  2 Minggu : Rp.6.000*\n*║ ✾  3 Minggu : Rp.8.000*\n*║ ✾  1 Bulan  : Rp.12.000*\n*║ ✾  Permanen : [ Maintenance ]*\n*╚═════════════════❏*
_Premium bot bisa memasukkan bot ke grup jadi bisa akses fitur premium di bot_
*Fitur :*
_Downloader Tiktok, Instagram, Facebook, Dan Lain2_
*Special Fitur :*
_Otakudesu Latest, Downloader Xnxx, Hdr, Remini Dan Lain2_

*Pembayaran??*
*Dana :* Chat ketik [ .owner ]
*Via pulsa :* nambah 1k [ Lebih Mahal Dikit ]
_Chat ketik_ *[ .owner ]* _untuk membeli fitur premium_
`;

conn.sendMessage(m.chat, {
      text: kaguya,
      contextInfo: {
      externalAdReply: {
      showAdAttribution: true,
      title: `• List Harga Premium ${namebot}`,
      body: author,
      thumbnailUrl: icon,
      sourceUrl: sgc,
      mediaType: 1,
      renderLargerThumbnail: true
      }}}, { quoted: m })
}
handler.help = ['premiumbot']
handler.tags = ['info']
handler.command = /^(prem|premiumbot)$/i

module.exports = handler