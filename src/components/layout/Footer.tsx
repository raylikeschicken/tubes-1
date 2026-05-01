import React from 'react';
import Link from 'next/link';
import { NAV_LINKS } from '@/data/dummyData';
import styles from './Footer.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      {/* Top Decoration */}
      <div className={styles.decoration} />

      <div className={`container ${styles.container}`}>
        <div className={styles.grid}>
          {/* Brand Col */}
          <div className={styles.brandCol}>
          <Link href="/" className={styles.logo}>
              <span className={styles.logoIcon}>💎</span>
              <span className={styles.logoText}>DimsTopup</span>
            </Link>
            <p className={styles.desc}>
              Platform top up game terlengkap dan termurah. 
              Transaksi aman, cepat masuk, dan harga paling kompetitif.
            </p>
            <div className={styles.socials}>
              <a href="#" className={styles.socialIcon} aria-label="WhatsApp">📱</a>
              <a href="#" className={styles.socialIcon} aria-label="Instagram">📸</a>
              <a href="#" className={styles.socialIcon} aria-label="Telegram">✈️</a>
            </div>
          </div>

          {/* Links Col */}
          <div className={styles.linksCol}>
            <h4 className={styles.heading}>Menu Cepat</h4>
            <ul className={styles.linkList}>
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className={styles.link}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Col */}
          <div className={styles.linksCol}>
            <h4 className={styles.heading}>Layanan</h4>
            <ul className={styles.linkList}>
              <li><Link href="/#products" className={styles.link}>Mobile Legends</Link></li>
              <li><Link href="/#products" className={styles.link}>PUBG Mobile</Link></li>
              <li><Link href="/#products" className={styles.link}>Free Fire</Link></li>
              <li><Link href="/#products" className={styles.link}>COD Mobile</Link></li>
              <li><Link href="/#products" className={styles.link}>Arena of Valor</Link></li>
            </ul>
          </div>

          {/* Legal / Payment Col */}
          <div className={styles.paymentCol}>
            <h4 className={styles.heading}>Pembayaran Aman</h4>
            <div className={styles.paymentGrid}>
              <span className={styles.payBadge}>DANA</span>
              <span className={styles.payBadge}>OVO</span>
              <span className={styles.payBadge}>GoPay</span>
              <span className={styles.payBadge}>QRIS</span>
              <span className={styles.payBadge}>BCA</span>
              <span className={styles.payBadge}>Mandiri</span>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © {currentYear} DimsTopup. All rights reserved.
          </p>
          <p className={styles.disclaimer}>
            DimsTopup tidak berafiliasi, didukung, atau disponsori oleh publisher game terkait.
            Semua nama game dan merek dagang adalah milik pemiliknya masing-masing.
          </p>
        </div>
      </div>
    </footer>
  );
}
