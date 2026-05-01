'use client';

import React, { useEffect, useState } from 'react';
import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import { apiUrl, hasApiUrl } from '@/lib/api';
import { getLocalPurchaseHistory, PurchaseHistoryItem } from '@/lib/orderHistory';
import { formatRupiah } from '@/types';
import styles from './orders.module.css';

export default function OrdersPage() {
  const [orders, setOrders] = useState<PurchaseHistoryItem[]>([]);
  const [notice, setNotice] = useState('');
  const [loading, setLoading] = useState(true);

  const loadOrders = async () => {
    setLoading(true);
    setNotice('');

    const token = localStorage.getItem('token');
    if (token && hasApiUrl()) {
      try {
        const response = await fetch(apiUrl('/api/orders'), {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error('Gagal mengambil riwayat dari server.');

        setOrders(await response.json());
        setLoading(false);
        return;
      } catch (error) {
        setNotice(error instanceof Error ? error.message : 'Gagal mengambil riwayat dari server.');
      }
    } else {
      setNotice('Riwayat lokal ditampilkan. Login dan set API URL agar riwayat tersimpan lintas perangkat.');
    }

    setOrders(getLocalPurchaseHistory());
    setLoading(false);
  };

  useEffect(() => {
    loadOrders();
  }, []);

  return (
    <>
      <Navbar />
      <main className={styles.page}>
        <div className="container">
          <div className={styles.header}>
            <div>
              <span className={styles.eyebrow}>Pembeli</span>
              <h1>Riwayat Pembelian</h1>
              <p className={styles.subtitle}>
                Semua fake payment yang sukses akan punya status, receipt, dan catatan transaksi di sini.
              </p>
            </div>
            <button type="button" className={styles.refreshButton} onClick={loadOrders}>
              Refresh
            </button>
          </div>

          {notice && <div className={styles.notice}>{notice}</div>}

          {loading ? (
            <div className={styles.empty}>Memuat riwayat...</div>
          ) : orders.length === 0 ? (
            <div className={styles.empty}>Belum ada transaksi. Pilih produk dan lakukan fake payment dulu.</div>
          ) : (
            <div className={styles.grid}>
              {orders.map((order) => (
                <article key={order._id || order.receiptNumber} className={styles.card}>
                  <div>
                    <div className={styles.receipt}>{order.receiptNumber || order._id}</div>
                    <div className={styles.product}>{order.productName}</div>
                    <div className={styles.meta}>
                      {order.game?.toUpperCase()} - {order.gameUsername} - {order.gameUserId}
                    </div>
                    <div className={styles.date}>
                      {new Date(order.paidAt || order.createdAt).toLocaleString('id-ID')}
                    </div>
                  </div>

                  <div className={styles.statusRow}>
                    <span className={styles.status}>{order.paymentStatus}</span>
                    <span className={styles.status}>{order.orderStatus}</span>
                    <span className={styles.status}>{order.paymentMethod}</span>
                  </div>

                  <div className={styles.price}>{formatRupiah(order.finalPrice)}</div>
                </article>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
