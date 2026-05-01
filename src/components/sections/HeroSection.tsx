'use client';

import React from 'react';
import Image from 'next/image';
import styles from './HeroSection.module.css';

export default function HeroSection() {
  return (
    <section id="hero" className={styles.hero}>
      {/* Background Image */}
      <div className={styles.bgWrapper}>
        <Image
          src="/banner-dsbb.png"
          alt=""
          fill
          className={styles.bgImage}
          priority
          sizes="100vw"
          quality={90}
        />
        <div className={styles.bgOverlay} />
      </div>
      <div className={styles.bgGrid} />

      {/* Main content: 2-column layout (Text Left, Image Right) */}
      <div className={`container ${styles.content}`}>

        {/* LEFT: Text */}
        <div className={styles.textCol}>
          <div className={styles.tag}>
            <span className={styles.tagDot} />
            💎 Top Up Game Terlengkap & Terpercaya
          </div>

          <h1 className={styles.headline}>
            TOP UP <span className="gradient-text">GAME</span>
            <br />
            CEPAT &amp; AMAN
          </h1>

          <p className={styles.subheadline}>
            Top up game favorit dengan harga terbaik dan proses tercepat. 
            Ribuan pelanggan puas, garansi uang kembali 100%.
          </p>

          <div className={styles.ctas}>
            <a href="/#products" className="btn btn-primary">
              <span>⚡</span> Mulai Top Up
            </a>
            <a href="/#how-it-works" className="btn btn-outline">
              Cara Kerja
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M7 17l10-10M7 7h10v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>

        {/* RIGHT: Character Image */}
        <div className={styles.imageCol}>
          <div className={styles.imageWrapper}>
            <Image
              src="/hero-all-chars.jpg"
              alt="Game Top Up — MLBB, PUBG, Free Fire, COD Mobile"
              width={750}
              height={550}
              className={styles.heroImage}
              priority
              quality={100}
            />
            <div className={styles.imageGlow} />
          </div>
        </div>

      </div>

      {/* Stats bar */}
      <div className={styles.statsBar}>
        <div className={`container ${styles.statsContainer}`}>
          <div className={styles.stat}>
            <span className={styles.statIcon}>💰</span>
            <span className={styles.statValue}>50K+</span>
            <span className={styles.statLabel}>Transaksi Berhasil</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.stat}>
            <span className={styles.statIcon}>⭐</span>
            <span className={styles.statValue}>4.9/5</span>
            <span className={styles.statLabel}>Rating</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.stat}>
            <span className={styles.statIcon}>⚡</span>
            <span className={styles.statValue}>1 Menit</span>
            <span className={styles.statLabel}>Cepat Masuk</span>
          </div>
        </div>
      </div>
    </section>
  );
}
