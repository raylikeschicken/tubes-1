'use client';

import React, { useMemo, useState } from 'react';
import { PAYMENT_METHODS, SUPPORTED_GAMES, TOPUP_PRODUCTS } from '@/data/dummyData';
import { apiUrl, hasApiUrl } from '@/lib/api';
import { createReceiptNumber, PurchaseHistoryItem, saveLocalPurchase } from '@/lib/orderHistory';
import { formatRupiah, PaymentMethod, TopUpProduct } from '@/types';
import styles from './TopUpSection.module.css';

type CheckoutState = {
  gameUsername: string;
  gameUserId: string;
  serverId: string;
  paymentMethod: PaymentMethod;
  notes: string;
};

const initialCheckout: CheckoutState = {
  gameUsername: '',
  gameUserId: '',
  serverId: '',
  paymentMethod: 'dana',
  notes: '',
};

function getFinalPrice(product: TopUpProduct) {
  return Math.round(product.price * (1 - product.discount / 100));
}

export default function TopUpSection() {
  const [selectedGame, setSelectedGame] = useState('mlbb');
  const [selectedProduct, setSelectedProduct] = useState<TopUpProduct | null>(null);
  const [checkout, setCheckout] = useState<CheckoutState>(initialCheckout);
  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [receipt, setReceipt] = useState<PurchaseHistoryItem | null>(null);

  const selectedGameInfo = SUPPORTED_GAMES.find((game) => game.id === selectedGame);
  const filteredProducts = useMemo(
    () => TOPUP_PRODUCTS.filter((product) => product.game === selectedGame),
    [selectedGame],
  );

  const openCheckout = (product: TopUpProduct) => {
    setSelectedProduct(product);
    setCheckout(initialCheckout);
    setStatus('');
    setReceipt(null);
  };

  const closeCheckout = () => {
    setSelectedProduct(null);
    setStatus('');
    setIsSubmitting(false);
    setReceipt(null);
  };

  const submitOrder = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedProduct) return;

    if (!checkout.gameUsername.trim() || !checkout.gameUserId.trim()) {
      setStatus('Lengkapi nickname dan User ID game dulu.');
      return;
    }

    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    const now = new Date().toISOString();
    const finalPrice = getFinalPrice(selectedProduct);
    const receiptNumber = createReceiptNumber();
    const fakeOrder: PurchaseHistoryItem = {
      _id: receiptNumber,
      receiptNumber,
      productName: selectedProduct.name,
      nominal: selectedProduct.nominal,
      price: selectedProduct.price,
      discount: selectedProduct.price - finalPrice,
      finalPrice,
      game: selectedProduct.game,
      gameUsername: checkout.gameUsername,
      gameUserId: checkout.serverId
        ? `${checkout.gameUserId} (${checkout.serverId})`
        : checkout.gameUserId,
      paymentMethod: checkout.paymentMethod,
      paymentStatus: 'confirmed',
      orderStatus: 'completed',
      notes: checkout.notes,
      createdAt: now,
      paidAt: now,
    };

    setIsSubmitting(true);
    setStatus('Memproses pembayaran...');

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setStatus('Pembayaran berhasil. Membuat receipt...');
      await new Promise((resolve) => setTimeout(resolve, 700));

      let savedOrder = fakeOrder;

      if (token && hasApiUrl()) {
        const response = await fetch(apiUrl('/api/orders'), {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            productId: selectedProduct.id,
            receiptNumber: fakeOrder.receiptNumber,
            productName: fakeOrder.productName,
            nominal: fakeOrder.nominal,
            price: fakeOrder.price,
            discount: fakeOrder.discount,
            finalPrice: fakeOrder.finalPrice,
            game: fakeOrder.game,
            gameUsername: fakeOrder.gameUsername,
            gameUserId: fakeOrder.gameUserId,
            paymentMethod: fakeOrder.paymentMethod,
            paymentStatus: fakeOrder.paymentStatus,
            orderStatus: fakeOrder.orderStatus,
            notes: fakeOrder.notes,
            paidAt: fakeOrder.paidAt,
          }),
        });

        if (!response.ok) {
          const data = await response.json().catch(() => null);
          throw new Error(data?.error || 'Transaksi berhasil, tapi gagal menyimpan ke server.');
        }

        savedOrder = await response.json();
      }

      saveLocalPurchase(savedOrder);
      setReceipt(savedOrder);
      setStatus('Pembayaran sukses. Receipt sudah dibuat.');
    } catch (error) {
      saveLocalPurchase(fakeOrder);
      setReceipt(fakeOrder);
      const message = error instanceof Error ? error.message : 'Server tidak merespons.';
      setStatus(`Pembayaran fake sukses, tetapi transaksi hanya tersimpan lokal. ${message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="products" className={`section ${styles.section}`}>
      <div className="container">
        <div className="section-header">
          <span className="section-label">Produk Kami</span>
          <h2 className="section-title">Top Up Game Favorit Kamu</h2>
          <p className="section-subtitle">
            Pilih produk, isi ID game, lakukan fake payment, lalu receipt dan riwayat pembelian langsung tersedia.
          </p>
          <div className="glow-separator" />
        </div>

        <div className={styles.gameSelector} aria-label="Pilih game">
          {SUPPORTED_GAMES.map((game) => (
            <button
              key={game.id}
              type="button"
              onClick={() => setSelectedGame(game.id)}
              className={`${styles.gameButton} ${selectedGame === game.id ? styles.active : ''}`}
              aria-pressed={selectedGame === game.id}
            >
              <span className={styles.gameIcon}>{game.abbreviation.slice(0, 2)}</span>
              <span>{game.abbreviation}</span>
            </button>
          ))}
        </div>

        <div className={styles.catalogHeader}>
          <div>
            <span className={styles.catalogEyebrow}>Katalog {selectedGameInfo?.abbreviation}</span>
            <h3>{selectedGameInfo?.label}</h3>
          </div>
          <span className={styles.catalogCount}>{filteredProducts.length} produk tersedia</span>
        </div>

        <div className={styles.grid}>
          {filteredProducts.map((product) => {
            const finalPrice = getFinalPrice(product);
            return (
              <article key={product.id} className={styles.card}>
                <div className={styles.cardHeader}>
                  <div className={styles.productMark}>{product.category.slice(0, 2).toUpperCase()}</div>
                  <div className={styles.badges}>
                    {product.isPopular && <span className={styles.badge}>Populer</span>}
                    {product.discount > 0 && <span className={styles.discount}>-{product.discount}%</span>}
                  </div>
                </div>

                <div className={styles.cardBody}>
                  <span className={styles.category}>{product.category.replace('-', ' ')}</span>
                  <h3 className={styles.name}>{product.name}</h3>
                  <p className={styles.description}>{product.description}</p>

                  <div className={styles.pricing}>
                    {product.discount > 0 && (
                      <span className={styles.originalPrice}>{formatRupiah(product.price)}</span>
                    )}
                    <span className={styles.currentPrice}>{formatRupiah(finalPrice)}</span>
                  </div>
                </div>

                <button type="button" className={styles.buyButton} onClick={() => openCheckout(product)}>
                  Beli Sekarang
                </button>
              </article>
            );
          })}
        </div>

        {filteredProducts.length === 0 && (
          <div className={styles.empty}>
            <p>Produk untuk game ini belum tersedia.</p>
          </div>
        )}
      </div>

      {selectedProduct && (
        <div className={styles.modalBackdrop} role="dialog" aria-modal="true" aria-labelledby="checkout-title">
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <div>
                <span className={styles.catalogEyebrow}>Checkout</span>
                <h3 id="checkout-title">{selectedProduct.name}</h3>
              </div>
              <button type="button" className={styles.closeButton} onClick={closeCheckout} aria-label="Tutup">
                x
              </button>
            </div>

            <div className={styles.summary}>
              <span>{selectedGameInfo?.label}</span>
              <strong>{formatRupiah(getFinalPrice(selectedProduct))}</strong>
            </div>

            {receipt ? (
              <div className={styles.receipt}>
                <div className={styles.successIcon}>OK</div>
                <h4>Pembayaran Berhasil</h4>

                {status && <p className={styles.statusText}>{status}</p>}

                <dl className={styles.receiptGrid}>
                  <div>
                    <dt>No. Receipt</dt>
                    <dd>{receipt.receiptNumber}</dd>
                  </div>
                  <div>
                    <dt>Status</dt>
                    <dd>{receipt.paymentStatus} / {receipt.orderStatus}</dd>
                  </div>
                  <div>
                    <dt>Produk</dt>
                    <dd>{receipt.productName}</dd>
                  </div>
                  <div>
                    <dt>Game ID</dt>
                    <dd>{receipt.gameUsername} - {receipt.gameUserId}</dd>
                  </div>
                  <div>
                    <dt>Metode</dt>
                    <dd>{receipt.paymentMethod}</dd>
                  </div>
                  <div>
                    <dt>Total</dt>
                    <dd>{formatRupiah(receipt.finalPrice)}</dd>
                  </div>
                </dl>

                <div className={styles.receiptActions}>
                  <a href="/orders" className={styles.historyLink}>Lihat Riwayat</a>
                  <button type="button" className={styles.buyButton} onClick={closeCheckout}>Selesai</button>
                </div>
              </div>
            ) : (
              <form className={styles.form} onSubmit={submitOrder}>
                <label>
                  Nickname Game
                  <input
                    value={checkout.gameUsername}
                    onChange={(event) => setCheckout((prev) => ({ ...prev, gameUsername: event.target.value }))}
                    placeholder="Contoh: RakaStore"
                  />
                </label>

                <div className={styles.formRow}>
                  <label>
                    User ID
                    <input
                      value={checkout.gameUserId}
                      onChange={(event) => setCheckout((prev) => ({ ...prev, gameUserId: event.target.value }))}
                      placeholder="123456789"
                    />
                  </label>
                  <label>
                    Server
                    <input
                      value={checkout.serverId}
                      onChange={(event) => setCheckout((prev) => ({ ...prev, serverId: event.target.value }))}
                      placeholder="Opsional"
                    />
                  </label>
                </div>

                <label>
                  Metode Pembayaran
                  <select
                    value={checkout.paymentMethod}
                    onChange={(event) => setCheckout((prev) => ({ ...prev, paymentMethod: event.target.value as PaymentMethod }))}
                  >
                    {PAYMENT_METHODS.map((method) => (
                      <option key={method.value} value={method.value}>
                        {method.label}
                      </option>
                    ))}
                  </select>
                </label>

                <label>
                  Catatan
                  <textarea
                    value={checkout.notes}
                    onChange={(event) => setCheckout((prev) => ({ ...prev, notes: event.target.value }))}
                    placeholder="Tulis request atau info tambahan bila ada"
                    rows={3}
                  />
                </label>

                {status && (
                  <div className={styles.paymentStatus}>
                    {isSubmitting && <span className={styles.spinner} />}
                    <p>{status}</p>
                  </div>
                )}

                <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
                  {isSubmitting ? 'Memproses Pembayaran...' : 'Bayar Sekarang'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
