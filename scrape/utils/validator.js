// Zass.ci License - Protect your watermark and credits!

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

const expectedProtex = `MIT License – ID

Copyright (c) 2025 ZassOneMods

▶︎ Ketentuan
- Dilarang memperjualbelikan atau mengklaim ulang sebagian maupun seluruh kode ini tanpa izin tertulis dari Developer.
- Script ini dapat digunakan, dimodifikasi, dan dibagikan ulang hanya untuk tujuan pribadi atau pengembangan.
- File wajib dicantumkan di setiap salinan atau turunan kode.

⚠︎ Penafian
Penggunaan script ini sepenuhnya menjadi tanggung jawab pengguna.
Developer dan kontributor tidak bertanggung jawab atas kerusakan, pelanggaran hukum, atau kerugian yang timbul akibat penggunaan script ini.

⚙︎ Sumber Resmi & Pembaruan
https://www.neolabsofficial.my.id

Dikembangkan oleh: NeoShiroko Labs Team`;

function protex() {
  const ProtexPath = path.join(__dirname, '../../LICENSE');

  if (!fs.existsSync(ProtexPath)) {
    for (let i = 0; i < 50; i++) {
      console.error(chalk.redBright('[ SYSTEM CRASH ] File core.meta tidak ditemukan! Dilarang keras menghapus file !'));
    }
    process.exit(1);
  }

  const content = fs.readFileSync(ProtexPath, 'utf-8').trim();

  if (!content.includes('ZassOneMods')) {
    for (let i = 0; i < 50; i++) {
      console.error(chalk.redBright('[ SYSTEM CRASH ] Core hilang atau dirusak! Jangan hapus credits bot!'));
    }
    process.exit(1);
  }

  if (content !== expectedProtex.trim()) {
    for (let i = 0; i < 100; i++) {
      console.error(chalk.redBright('[ SYSTEM CRASH ] Credits telah dimodifikasi tanpa izin developer!'));
    }
    process.exit(1);
  }
}

module.exports = { protex };