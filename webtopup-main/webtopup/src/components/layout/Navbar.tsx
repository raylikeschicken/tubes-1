'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { NAV_LINKS } from '@/data/dummyData';
import { apiUrl, hasApiUrl } from '@/lib/api';
import styles from './Navbar.module.css';

export default function Navbar() {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        if (parsed?.nickname) {
          setUserName(parsed.nickname);
          setIsAdmin(parsed.role === 'admin');
          return;
        }
      } catch (error) {
        localStorage.removeItem('user');
      }
    }

    const token = localStorage.getItem('token');
    if (!token) return;

    if (!hasApiUrl()) return;

    fetch(apiUrl('/api/auth/me'), {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error('Not authenticated');
        return res.json();
      })
      .then((data) => {
        if (data.nickname) {
          setUserName(data.nickname);
          setIsAdmin(data.role === 'admin');
          localStorage.setItem('user', JSON.stringify(data));
        }
      })
      .catch(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUserName(null);
        setIsAdmin(false);
      });
  }, [isHydrated]);

  const toggleMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUserName(null);
    router.push('/');
  };

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.container}`}>
        {/* Logo */}
        <Link href="/" className={styles.logo}>
          <span className={styles.logoIcon}>DT</span>
          <span className={styles.logoText}>DimsTopup</span>
        </Link>

        {/* Desktop Nav */}
        <nav className={styles.desktopNav}>
          {NAV_LINKS.map((link) => (
            <Link key={link.label} href={link.href} className={styles.navLink}>
              {link.label}
            </Link>
          ))}
          {isAdmin && (
            <Link href="/admin" className={styles.navLink}>
              Admin
            </Link>
          )}
        </nav>

        {/* CTA & Mobile Toggle */}
        <div className={styles.actions}>
          <div className={styles.authGroup}>
            {userName ? (
              <>
                <span className={styles.userLabel}>Halo, {userName}</span>
                <button type="button" className={styles.logoutBtn} onClick={handleLogout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className={styles.loginBtn}>
                  Masuk
                </Link>
                <Link href="/register" className={styles.registerBtn}>
                  Daftar
                </Link>
              </>
            )}
          </div>

          <Link href="/#products" className={`btn btn-primary ${styles.ctaDesktop}`}>
            Top Up Sekarang
          </Link>

          <button
            className={styles.hamburger}
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <div className={`${styles.bar} ${mobileMenuOpen ? styles.barOpen1 : ''}`} />
            <div className={`${styles.bar} ${mobileMenuOpen ? styles.barOpen2 : ''}`} />
            <div className={`${styles.bar} ${mobileMenuOpen ? styles.barOpen3 : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <div className={`${styles.mobileNav} ${mobileMenuOpen ? styles.mobileNavOpen : ''}`}>
        <div className={styles.mobileNavInner}>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={styles.mobileNavLink}
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}

          <div className={styles.mobileAuthDivider} />

          <div className={styles.mobileAuthGroup}>
            {userName ? (
              <>
                <span className={styles.mobileUserLabel}>Halo, {userName}</span>
                <button
                  type="button"
                  className={styles.mobileLogoutBtn}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleLogout();
                  }}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className={styles.mobileLoginBtn}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Masuk
                </Link>
                <Link
                  href="/register"
                  className={styles.mobileRegisterBtn}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Daftar
                </Link>
              </>
            )}
          </div>

          {isAdmin && (
            <Link
              href="/admin"
              className={styles.mobileNavLink}
              onClick={() => setMobileMenuOpen(false)}
            >
              Admin
            </Link>
          )}

          <Link
            href="/#products"
            className="btn btn-primary"
            style={{ width: '100%', marginTop: '8px' }}
            onClick={() => setMobileMenuOpen(false)}
          >
            Top Up Sekarang
          </Link>
        </div>
      </div>
    </header>
  );
}
