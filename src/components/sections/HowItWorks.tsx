import React from 'react';
import StepCard from '@/components/ui/StepCard';
import styles from './HowItWorks.module.css';

const STEPS = [
  {
    step: '01',
    icon: '01',
    title: 'Pilih Game & Nominal',
    description: 'Pilih game favorit dan nominal diamond, UC, CP, voucher, atau pass yang kamu butuhkan.',
  },
  {
    step: '02',
    icon: '02',
    title: 'Isi ID & Pilih Metode',
    description: 'Masukkan ID akun game dengan benar, lalu pilih metode pembayaran simulasi.',
  },
  {
    step: '03',
    icon: '03',
    title: 'Fake Payment Sukses',
    description: 'Sistem menampilkan loading, status sukses, receipt, dan menyimpan riwayat pembelian.',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className={`section ${styles.section}`}>
      <div className={styles.bgAccent} />
      <div className="container">
        <div className="section-header">
          <span className="section-label">Cara Order</span>
          <h2 className="section-title">3 Langkah Mudah</h2>
          <p className="section-subtitle">
            Proses order simpel, cepat, dan aman. Pembayaran dibuat sebagai simulasi tanpa koneksi bank/e-wallet.
          </p>
          <div className="glow-separator" />
        </div>

        <div className={styles.grid}>
          {STEPS.map((s, i) => (
            <StepCard
              key={s.step}
              step={s.step}
              icon={s.icon}
              title={s.title}
              description={s.description}
              isLast={i === STEPS.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
