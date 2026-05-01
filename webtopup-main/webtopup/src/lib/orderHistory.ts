export type PurchaseHistoryItem = {
  _id: string;
  receiptNumber: string;
  productName: string;
  nominal: number;
  price: number;
  discount: number;
  finalPrice: number;
  game: string;
  gameUsername: string;
  gameUserId: string;
  paymentMethod: string;
  paymentStatus: string;
  orderStatus: string;
  notes?: string;
  createdAt: string;
  paidAt?: string;
};

const STORAGE_KEY = 'purchase_history';

export function createReceiptNumber() {
  const date = new Date();
  const stamp = date.toISOString().slice(0, 10).replace(/-/g, '');
  const random = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `RCPT-${stamp}-${random}`;
}

export function getLocalPurchaseHistory(): PurchaseHistoryItem[] {
  if (typeof window === 'undefined') return [];

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    localStorage.removeItem(STORAGE_KEY);
    return [];
  }
}

export function saveLocalPurchase(item: PurchaseHistoryItem) {
  const history = getLocalPurchaseHistory();
  localStorage.setItem(STORAGE_KEY, JSON.stringify([item, ...history]));
}
