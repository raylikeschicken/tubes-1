// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 🔷 TypeScript Types & Interfaces
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export type GameType = 'mlbb' | 'pubg' | 'freefire' | 'codm' | 'aov';
export type TopUpCategory = 'diamond' | 'gold' | 'voucher' | 'battle-pass';
export type PaymentMethod = 'bank_transfer' | 'gopay' | 'ovo' | 'linkaja' | 'dana';
export type OrderStatus = 'pending' | 'processing' | 'completed' | 'cancelled';
export type PaymentStatus = 'pending' | 'confirmed' | 'failed';

// ── Top Up Product Types ──
export interface TopUpProduct {
  id: string;
  name: string;
  nominal: number;
  price: number;
  description: string;
  icon: string;
  game: GameType;
  category: TopUpCategory;
  isPopular: boolean;
  discount: number;
  status: string;
  createdAt?: string;
  updatedAt?: string;
}

// ── Top Up Order Types ──
export interface TopUpOrder {
  id?: string;
  userId: string;
  productId: string;
  productName: string;
  nominal: number;
  price: number;
  discount: number;
  finalPrice: number;
  game: GameType;
  gameUsername: string;
  gameUserId: string;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  receiptNumber?: string;
  proofImage?: string;
  notes?: string;
  paidAt?: string;
  completedAt?: string;
  createdAt?: string;
}

export interface OrderFormData {
  gameUsername: string;
  gameUserId: string;
  selectedProductId: string;
  paymentMethod: PaymentMethod;
  notes?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  avatarUrl: string;
  game: string;
  nominal: string;
  rating: number;
  comment: string;
  date: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface NavLink {
  label: string;
  href: string;
}

// Game colors and branding
export const GAME_COLORS: Record<GameType, string> = {
  'mlbb': '#FF6B00',
  'pubg': '#3A3A3A',
  'freefire': '#FF0000',
  'codm': '#000000',
  'aov': '#00A4FF',
};

export const GAME_GRADIENTS: Record<GameType, string> = {
  'mlbb': 'linear-gradient(135deg, #FF6B00, #FFB800)',
  'pubg': 'linear-gradient(135deg, #3A3A3A, #6B6B6B)',
  'freefire': 'linear-gradient(135deg, #FF0000, #FF6B6B)',
  'codm': 'linear-gradient(135deg, #000000, #333333)',
  'aov': 'linear-gradient(135deg, #00A4FF, #00D4FF)',
};

export const CATEGORY_COLORS: Record<TopUpCategory, string> = {
  'diamond': '#E11D48',
  'gold': '#F59E0B',
  'voucher': '#10B981',
  'battle-pass': '#8B5CF6',
};

export const CATEGORY_ICONS: Record<TopUpCategory, string> = {
  'diamond': '💎',
  'gold': '💰',
  'voucher': '🎟️',
  'battle-pass': '🎁',
};

/** Format price to Rupiah */
export function formatRupiah(n: number): string {
  return 'Rp ' + n.toLocaleString('id-ID');
}
