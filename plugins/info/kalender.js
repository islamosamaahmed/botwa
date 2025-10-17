const { createCanvas } = require('canvas');
const moment = require('moment-timezone');

let handler = async (m, { conn, text }) => {
  const timezone = 'Asia/Jakarta';
  const currentDate = moment.tz(timezone);
  const currentMonth = currentDate.month();
  const currentYear = currentDate.year();
  const today = currentDate.date();
  const currentHour = currentDate.hour();
  const isDaytime = currentHour >= 6 && currentHour < 18;

  const canvasWidth = 1500;
  const canvasHeight = 900;

  const months = ['januari', 'februari', 'maret', 'april', 'mei', 'juni', 'juli', 'agustus', 'september', 'oktober', 'november', 'desember'];
  let queryMonth = months.findIndex(month => month.toLowerCase() === text.toLowerCase());
  if (queryMonth === -1) queryMonth = currentMonth;

  const displayDate = moment.tz(timezone).month(queryMonth).startOf('month');
  const monthName = months[queryMonth];
  const year = currentYear;

  function getLunarDate(date) {
    const lunarOffset = Math.floor((date.getFullYear() - 1900) * 365.25);
    const lunarYear = Math.floor(lunarOffset / 354.37) + 1900;
    const lunarMonth = Math.floor((lunarOffset % 354.37) / 29.5) + 1;
    const lunarDay = Math.floor((lunarOffset % 29.5)) + 1;
    const animals = ['Tikus','Kerbau','Harimau','Kelinci','Naga','Ular','Kuda','Kambing','Monyet','Ayam','Anjing','Babi'];
    const elements = ['Logam','Tanah','Api','Kayu','Air'];
    const animal = animals[(lunarYear - 1900) % 12];
    const element = elements[Math.floor(((lunarYear - 1900) % 10) / 2)];
    return { year: lunarYear, month: lunarMonth, date: lunarDay, animal, element };
  }

  function getJavaneseDate(date) {
    const javaCycle = Math.floor((date.getFullYear() - 1633) / 8);
    const javaYear = 1555 + (javaCycle * 8) + Math.floor((date.getMonth() + date.getDate()) / 35.5);
    const pasaran = ['Legi','Pahing','Pon','Wage','Kliwon'];
    const wuku = ['Sinta','Landep','Wukir','Kurantil','Tolu','Gumbreg','Warigalit','Warigagung','Julungwangi','Sungsang',
                  'Galungan','Kuningan','Langkir','Mandhasiya','Julungpujut','Pahang','Kuruwelut','Marakeh','Tambir','Medangkungan',
                  'Maktal','Wuye','Manahil','Prangbakat','Bala','Wugu','Wayang','Kulawu','Dukut','Watugunung'];
    const pasaranIndex = Math.floor((date.getTime() / 86400000 + 2) % 5);  
    const wukuIndex = Math.floor((date.getTime() / 86400000 + 5) % 30);
    return { year: javaYear, pasaran: pasaran[pasaranIndex], wuku: wuku[wukuIndex] };
  }

  const holidayColors = {
    Nasional: '#238636',
    Keagamaan: '#8957e5',
    Pendidikan: '#3fb950', 
    Sosial: '#d29922',
    Budaya: '#ec6547',
    Lingkungan: '#1f6feb',
    Kesehatan: '#fa4549'
  };

  function generateHolidays(year) {
    return [
      {date: `${year}-01-01`, description: `Tahun Baru ${year} Masehi`, type: 'Nasional'},
      {date: `${year}-01-22`, description: `Tahun Baru Imlek`, type: 'Keagamaan'},
      {date: `${year}-02-08`, description: `Hari Lahan Basah Sedunia`, type: 'Lingkungan'},
      {date: `${year}-02-11`, description: `Hari Internasional Perempuan dan Anak Perempuan dalam Sains`, type: 'Sosial'},
      {date: `${year}-02-14`, description: `Hari Donor Darah Sedunia`, type: 'Kesehatan'}, 
      {date: `${year}-02-15`, description: `Pemilihan Umum`, type: 'Nasional'},
      {date: `${year}-02-18`, description: `Isra Mi'raj`, type: 'Keagamaan'},
      {date: `${year}-02-20`, description: `Hari Pekerja Sosial Nasional`, type: 'Sosial'},
      {date: `${year}-02-21`, description: `Hari Bahasa Ibu Internasional`, type: 'Pendidikan'},
      {date: `${year}-03-03`, description: `Hari Penyelamatan Hidupan Liar`, type: 'Lingkungan'},
      {date: `${year}-03-08`, description: `Hari Perempuan Internasional`, type: 'Sosial'},
      {date: `${year}-03-10`, description: `Hari Raya Nyepi`, type: 'Keagamaan'},
      {date: `${year}-03-21`, description: `Hari Sindrom Down Sedunia`, type: 'Kesehatan'},
      {date: `${year}-03-22`, description: `Hari Air Sedunia`, type: 'Lingkungan'},
      {date: `${year}-03-29`, description: `Jumat Agung`, type: 'Keagamaan'},
      {date: `${year}-03-31`, description: `Hari Paskah`, type: 'Keagamaan'},
      {date: `${year}-04-02`, description: `Hari Autisme Sedunia`, type: 'Kesehatan'},
      {date: `${year}-04-07`, description: `Hari Kesehatan Sedunia`, type: 'Kesehatan'},
      {date: `${year}-04-10`, description: `Hari Raya Idul Fitri`, type: 'Keagamaan'},
      {date: `${year}-04-11`, description: `Hari Raya Idul Fitri`, type: 'Keagamaan'},
      {date: `${year}-04-21`, description: `Hari Kartini`, type: 'Nasional'},
      {date: `${year}-04-22`, description: `Hari Bumi`, type: 'Lingkungan'},
      {date: `${year}-04-23`, description: `Hari Buku Sedunia`, type: 'Pendidikan'},
      {date: `${year}-05-01`, description: `Hari Buruh Internasional`, type: 'Nasional'},
      {date: `${year}-05-02`, description: `Hari Pendidikan Nasional`, type: 'Pendidikan'},
      {date: `${year}-05-20`, description: `Hari Kebangkitan Nasional`, type: 'Nasional'},
      {date: `${year}-05-22`, description: `Hari Biodiversitas Internasional`, type: 'Lingkungan'},
      {date: `${year}-05-23`, description: `Hari Waisak`, type: 'Keagamaan'},
      {date: `${year}-05-29`, description: `Hari Pasukan Penjaga Perdamaian Internasional`, type: 'Sosial'},
      {date: `${year}-05-31`, description: `Hari Tanpa Tembakau Sedunia`, type: 'Kesehatan'},
      {date: `${year}-06-01`, description: `Hari Lahir Pancasila`, type: 'Nasional'},
      {date: `${year}-06-05`, description: `Hari Lingkungan Hidup Sedunia`, type: 'Lingkungan'},
      {date: `${year}-06-12`, description: `Hari Buruh Anak Internasional`, type: 'Sosial'},
      {date: `${year}-06-17`, description: `Hari Raya Idul Adha`, type: 'Keagamaan'},
      {date: `${year}-06-21`, description: `Hari Musik Sedunia`, type: 'Budaya'},
      {date: `${year}-07-07`, description: `Tahun Baru Islam`, type: 'Keagamaan'},
      {date: `${year}-07-14`, description: `Hari Pajak`, type: 'Nasional'},
      {date: `${year}-07-18`, description: `Hari Nelson Mandela Internasional`, type: 'Sosial'},
      {date: `${year}-08-17`, description: `Hari Kemerdekaan RI`, type: 'Nasional'},
      {date: `${year}-08-19`, description: `Hari Kemanusiaan Sedunia`, type: 'Sosial'},
      {date: `${year}-09-08`, description: `Hari Literasi Internasional`, type: 'Pendidikan'},
      {date: `${year}-09-21`, description: `Hari Perdamaian Internasional`, type: 'Sosial'},
      {date: `${year}-09-27`, description: `Hari Pariwisata Sedunia`, type: 'Budaya'},
      {date: `${year}-09-28`, description: `Hari Rabies Sedunia`, type: 'Kesehatan'},
      {date: `${year}-09-30`, description: `Hari Batik Nasional`, type: 'Budaya'},
      {date: `${year}-10-01`, description: `Hari Kesaktian Pancasila`, type: 'Nasional'},
      {date: `${year}-10-05`, description: `Hari Guru Sedunia`, type: 'Pendidikan'},
      {date: `${year}-10-22`, description: `Hari Santri Nasional`, type: 'Pendidikan'},
      {date: `${year}-10-28`, description: `Hari Sumpah Pemuda`, type: 'Nasional'},
      {date: `${year}-11-10`, description: `Hari Pahlawan`, type: 'Nasional'},
      {date: `${year}-11-14`, description: `Hari Diabetes Sedunia`, type: 'Kesehatan'},
      {date: `${year}-11-25`, description: `Hari Guru Nasional`, type: 'Pendidikan'},
      {date: `${year}-12-01`, description: `Hari AIDS Sedunia`, type: 'Kesehatan'},
      {date: `${year}-12-10`, description: `Hari Hak Asasi Manusia`, type: 'Sosial'},
      {date: `${year}-12-22`, description: `Hari Ibu`, type: 'Nasional'},
      {date: `${year}-12-25`, description: `Hari Natal`, type: 'Keagamaan'},
      {date: `${year}-12-29`, description: `Hari Keanekaragaman Hayati Indonesia`, type: 'Lingkungan'}
    ].map(h => ({...h, color: holidayColors[h.type]}));
  }

  const holidays = generateHolidays(year);
  const holidaysThisMonth = holidays.filter(holiday => moment(holiday.date).month() === queryMonth);

  const daysInMonth = displayDate.daysInMonth();
  const firstDayOfMonth = displayDate.day();

  const canvas = createCanvas(canvasWidth, canvasHeight);
  const ctx = canvas.getContext('2d');

  const theme = isDaytime ? {
    bg: '#0d1117',
    card: '#161b22',
    border: '#21262d',
    text: '#c9d1d9',
    muted: '#8b949e',
    accent: '#f85149',
    calendar: {
      header: '#21262d',
      today: '#388bfd1a',
      todayBorder: '#1f6feb'
    }
  } : {
    bg: '#0d1117', 
    card: '#161b22',
    border: '#30363d',
    text: '#c9d1d9',
    muted: '#8b949e',
    accent: '#f85149',
    calendar: {
      header: '#161b22',
      today: '#388bfd1a',
      todayBorder: '#1f6feb'  
    }
  };

  ctx.fillStyle = theme.bg;
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  const margin = 40;
  const terminalWidth = canvasWidth - (margin * 2);
  const terminalHeight = canvasHeight - (margin * 2);
  ctx.fillStyle = theme.card;
  roundRect(ctx, margin, margin, terminalWidth, terminalHeight, 10);
  const titleBarHeight = 30;
  ctx.fillStyle = theme.calendar.header;
  roundRect(ctx, margin, margin, terminalWidth, titleBarHeight, {tl: 10, tr: 10, br: 0, bl: 0});
  const buttonSize = 12;
  const buttonMargin = 8;
  ['#ff5f57', '#febc2e', '#28c840'].forEach((color, i) => {
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(margin + buttonMargin + (i * (buttonSize + buttonMargin)) + buttonSize/2,
            margin + titleBarHeight/2, buttonSize/2, 0, Math.PI * 2);
    ctx.fill();
  });

  const contentStartY = margin + titleBarHeight + 60;
  
  ctx.font = 'bold 36px Menlo';
  ctx.textAlign = 'center';
  ctx.fillStyle = theme.text;
  ctx.fillText(`${monthName.toUpperCase()} ${year}`, canvasWidth/2, contentStartY);

  const lunarDate = getLunarDate(new Date(year, queryMonth, 1));
  const javaDate = getJavaneseDate(new Date(year, queryMonth, 1));

  ctx.font = '16px Menlo';
  ctx.fillStyle = theme.muted;
  ctx.fillText(`Tahun ${lunarDate.animal} ${lunarDate.element} - ${lunarDate.date}/${lunarDate.month}/${lunarDate.year}`, canvasWidth/2, contentStartY + 40);
  ctx.fillText(`Penanggalan Jawa: Tahun ${javaDate.year} - ${javaDate.wuku} ${javaDate.pasaran}`, canvasWidth/2, contentStartY + 70);

  const daysOfWeek = ['MINGGU', 'SENIN', 'SELASA', 'RABU', 'KAMIS', 'JUMAT', 'SABTU'];
  const cellWidth = terminalWidth/7;
  const cellHeight = Math.min(60, (terminalHeight - 300) / 6);
  
  const calendarStartY = contentStartY + 120;
  
  ctx.textAlign = 'center';
  daysOfWeek.forEach((day, index) => {
    ctx.font = '500 16px Menlo';
    ctx.fillStyle = day === 'MINGGU' ? theme.accent : theme.muted;
    ctx.fillText(day, margin + (index * cellWidth) + cellWidth/2, calendarStartY);
  });

  let x = margin + cellWidth/2;
  let y = calendarStartY + 60;

  for (let i = 0; i < firstDayOfMonth; i++) {
    x += cellWidth;
  }

  for (let date = 1; date <= daysInMonth; date++) {
    const currentDay = (firstDayOfMonth + date - 1) % 7;
    const holiday = holidaysThisMonth.find(h => moment(h.date).date() === date);
    const javaDay = getJavaneseDate(new Date(year, queryMonth, date));

    if (queryMonth === currentMonth && date === today) {
      ctx.fillStyle = theme.calendar.today;
      ctx.beginPath();
      ctx.arc(x, y-10, 25, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.strokeStyle = theme.calendar.todayBorder;
      ctx.lineWidth = 2;
      ctx.stroke();
    }

    ctx.font = 'bold 18px Menlo';
    ctx.fillStyle = holiday || currentDay === 0 ? theme.accent : theme.text;
    ctx.fillText(date.toString(), x, y);

    ctx.font = '11px Menlo';
    ctx.fillStyle = theme.muted;
    ctx.fillText(javaDay.pasaran, x, y+25);

    if (holiday) {
      ctx.beginPath();
      ctx.arc(x, y+35, 3, 0, Math.PI * 2);
      ctx.fillStyle = holiday.color;
      ctx.fill();
    }

    x += cellWidth;
    if ((date + firstDayOfMonth) % 7 === 0) {
      x = margin + cellWidth/2;
      y += cellHeight;
    }
  }

  const legendStartY = Math.min(y + 80, canvasHeight - margin - 120);
  
  ctx.textAlign = 'left';
  ctx.font = 'bold 18px Menlo';
  ctx.fillStyle = theme.text;
  ctx.fillText('KETERANGAN:', margin + 20, legendStartY);

  let legendY = legendStartY + 30;
  Object.entries(holidayColors).forEach(([type, color]) => {
    ctx.beginPath();
    ctx.arc(margin + 30, legendY, 4, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();

    ctx.font = '14px Menlo';
    ctx.fillStyle = theme.text;
    ctx.fillText(type, margin + 45, legendY + 4);
    legendY += 25;
  });

  const eventStartY = legendStartY;
  ctx.textAlign = 'left';
  ctx.font = 'bold 18px Menlo';
  ctx.fillStyle = theme.text;
  ctx.fillText('HARI LIBUR & PERAYAAN:', canvasWidth/2, eventStartY);

  let eventY = eventStartY + 30;
  holidaysThisMonth.forEach(holiday => {
    ctx.beginPath();
    ctx.arc(canvasWidth/2 + 10, eventY, 4, 0, Math.PI * 2);
    ctx.fillStyle = holiday.color;
    ctx.fill();

    ctx.font = '14px Menlo';
    ctx.fillStyle = theme.text;
    ctx.fillText(
      `${moment(holiday.date).format('DD MMMM')} - ${holiday.description}`,
      canvasWidth/2 + 25,
      eventY + 4
    );
    eventY += 25;
  });

  function roundRect(ctx, x, y, width, height, radius) {
    if (typeof radius === 'undefined') radius = 5;
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
    ctx.fill();
  }

  const buffer = canvas.toBuffer();
  await conn.sendMessage(m.chat, {
    image: buffer,
    caption: `Kalender: ${monthName.charAt(0).toUpperCase() + monthName.slice(1)} ${year}`
  });
};

handler.help = ['kalender [bulan]'];
handler.tags = ['tools'];
handler.command = ['kalender', 'calendar'];

module.exports = handler;