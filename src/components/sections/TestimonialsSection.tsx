import React from 'react';
import styles from './TestimonialsSection.module.css';

const TESTIMONIALS = [
  {
    id: 1,
    name: 'Rizky',
    product: 'MLBB 570 Diamond',
    avatar: 'R',
    text: 'Top up cepat masuk, admin responsif, dan harganya enak buat langganan. Order pertama langsung lancar.',
    stars: 5,
    time: '2 hari lalu',
    gradient: 'linear-gradient(135deg, #FF6B6B, #C0392B)',
  },
  {
    id: 2,
    name: 'Budi',
    product: 'PUBG Mobile 300 UC',
    avatar: 'B',
    text: 'Pembayaran gampang, UC masuk tidak sampai lama. Cocok buat yang butuh top up mendadak.',
    stars: 5,
    time: '3 hari lalu',
    gradient: 'linear-gradient(135deg, #4facfe, #00f2fe)',
  },
  {
    id: 3,
    name: 'Siti',
    product: 'Free Fire 500 Diamond',
    avatar: 'S',
    text: 'Sudah beberapa kali beli di sini. Prosesnya rapi, bukti pembayaran jelas, dan diamond selalu masuk.',
    stars: 5,
    time: '4 hari lalu',
    gradient: 'linear-gradient(135deg, #43e97b, #38f9d7)',
  },
  {
    id: 4,
    name: 'Andi',
    product: 'COD Mobile 1000 CP',
    avatar: 'A',
    text: 'Pilihan produknya lengkap dan CS cepat bantu waktu aku salah input ID. Mantap.',
    stars: 4,
    time: '1 minggu lalu',
    gradient: 'linear-gradient(135deg, #fa709a, #fee140)',
  },
  {
    id: 5,
    name: 'Dewi',
    product: 'AOV 500 Voucher',
    avatar: 'D',
    text: 'Harga kompetitif dan prosesnya simpel. Tinggal pilih nominal, bayar, lalu voucher masuk.',
    stars: 5,
    time: '1 minggu lalu',
    gradient: 'linear-gradient(135deg, #a18cd1, #fbc2eb)',
  },
  {
    id: 6,
    name: 'Fajar',
    product: 'MLBB Premium Pass',
    avatar: 'F',
    text: 'Langganan buat event bulanan. Semua transaksi aman dan cepat dikonfirmasi.',
    stars: 5,
    time: '2 minggu lalu',
    gradient: 'linear-gradient(135deg, #f093fb, #f5576c)',
  },
];

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className={`section ${styles.section}`}>
      <div className={styles.bgAccent} />
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div className="section-header">
          <span className="section-label">Testimoni</span>
          <h2 className="section-title">Kata Mereka Yang Sudah Top Up</h2>
          <p className="section-subtitle">
            Ribuan player puas dengan layanan top up cepat dan aman dari kami.
          </p>
          <div className="glow-separator" />
        </div>

        <div className={styles.masonry}>
          {TESTIMONIALS.map((t) => (
            <div key={t.id} className={styles.card}>
              <div className={styles.header}>
                <div className={styles.avatar} style={{ background: t.gradient }}>
                  {t.avatar}
                </div>
                <div className={styles.userInfo}>
                  <span className={styles.username}>{t.name}</span>
                  <div className={styles.rankBadge}>{t.product}</div>
                  <div className={styles.stars}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i} style={{ opacity: i < t.stars ? 1 : 0.3 }}>*</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className={styles.bubbleContainer}>
                <div className={styles.bubble}>
                  {t.text}
                  <div className={styles.timestamp}>{t.time}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
