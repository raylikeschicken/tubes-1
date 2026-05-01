import { TopUpProduct, Testimonial, FaqItem, NavLink } from '@/types';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 📌 Navigation Links
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const NAV_LINKS: NavLink[] = [
  { label: 'Beranda', href: '/#hero' },
  { label: 'Produk', href: '/#products' },
  { label: 'Cara Order', href: '/#how-it-works' },
  { label: 'Riwayat', href: '/orders' },
  { label: 'Testimoni', href: '/#testimonials' },
  { label: 'FAQ', href: '/#faq' },
];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 💎 Top Up Products
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const TOPUP_PRODUCTS: TopUpProduct[] = [
  // ── Mobile Legends: Bang Bang (MLBB) - Diamond ──
  {
    id: 'mlbb-diamond-1',
    name: '17 Diamond',
    nominal: 17,
    price: 4000,
    description: 'Paket diamond kecil untuk pemula',
    icon: '💎',
    game: 'mlbb',
    category: 'diamond',
    isPopular: false,
    discount: 0,
    status: 'active',
  },
  {
    id: 'mlbb-diamond-2',
    name: '38 Diamond',
    nominal: 38,
    price: 8500,
    description: 'Paket diamond standar',
    icon: '💎',
    game: 'mlbb',
    category: 'diamond',
    isPopular: false,
    discount: 0,
    status: 'active',
  },
  {
    id: 'mlbb-diamond-3',
    name: '70 Diamond',
    nominal: 70,
    price: 15000,
    description: 'Paket diamond populer',
    icon: '💎',
    game: 'mlbb',
    category: 'diamond',
    isPopular: true,
    discount: 5,
    status: 'active',
  },
  {
    id: 'mlbb-diamond-4',
    name: '140 Diamond',
    nominal: 140,
    price: 28000,
    description: 'Paket hemat lebih banyak',
    icon: '💎',
    game: 'mlbb',
    category: 'diamond',
    isPopular: true,
    discount: 5,
    status: 'active',
  },
  {
    id: 'mlbb-diamond-5',
    name: '285 Diamond',
    nominal: 285,
    price: 55000,
    description: 'Paket besar dengan diskon lumayan',
    icon: '💎',
    game: 'mlbb',
    category: 'diamond',
    isPopular: false,
    discount: 8,
    status: 'active',
  },
  {
    id: 'mlbb-diamond-6',
    name: '570 Diamond',
    nominal: 570,
    price: 108000,
    description: 'Paket XL hemat maksimal',
    icon: '💎',
    game: 'mlbb',
    category: 'diamond',
    isPopular: false,
    discount: 10,
    status: 'active',
  },

  // ── Mobile Legends: Bang Bang (MLBB) - Battle Pass ──
  {
    id: 'mlbb-bp-1',
    name: 'Premium Pass',
    nominal: 1,
    price: 7000,
    description: 'Buka akses premium battle pass',
    icon: '🎁',
    game: 'mlbb',
    category: 'battle-pass',
    isPopular: true,
    discount: 0,
    status: 'active',
  },

  // ── PUBG Mobile - UC ──
  {
    id: 'pubg-uc-1',
    name: '60 UC',
    nominal: 60,
    price: 8000,
    description: 'Unknown Cash untuk PUBG Mobile',
    icon: '🎮',
    game: 'pubg',
    category: 'voucher',
    isPopular: false,
    discount: 0,
    status: 'active',
  },
  {
    id: 'pubg-uc-2',
    name: '300 UC',
    nominal: 300,
    price: 38000,
    description: 'Paket UC standar',
    icon: '🎮',
    game: 'pubg',
    category: 'voucher',
    isPopular: true,
    discount: 5,
    status: 'active',
  },
  {
    id: 'pubg-uc-3',
    name: '660 UC',
    nominal: 660,
    price: 82000,
    description: 'Paket UC hemat',
    icon: '🎮',
    game: 'pubg',
    category: 'voucher',
    isPopular: false,
    discount: 8,
    status: 'active',
  },

  // ── Free Fire - Diamond ──
  {
    id: 'ff-diamond-1',
    name: '50 Diamond',
    nominal: 50,
    price: 5000,
    description: 'Diamond kecil Free Fire',
    icon: '💎',
    game: 'freefire',
    category: 'diamond',
    isPopular: false,
    discount: 0,
    status: 'active',
  },
  {
    id: 'ff-diamond-2',
    name: '100 Diamond',
    nominal: 100,
    price: 9500,
    description: 'Paket diamond standar',
    icon: '💎',
    game: 'freefire',
    category: 'diamond',
    isPopular: true,
    discount: 5,
    status: 'active',
  },
  {
    id: 'ff-diamond-3',
    name: '500 Diamond',
    nominal: 500,
    price: 45000,
    description: 'Paket XL hemat',
    icon: '💎',
    game: 'freefire',
    category: 'diamond',
    isPopular: false,
    discount: 10,
    status: 'active',
  },

  // ── Call of Duty Mobile - CP ──
  {
    id: 'codm-cp-1',
    name: '500 CP',
    nominal: 500,
    price: 25000,
    description: 'COD Points untuk Call of Duty Mobile',
    icon: '🎯',
    game: 'codm',
    category: 'voucher',
    isPopular: true,
    discount: 0,
    status: 'active',
  },
  {
    id: 'codm-cp-2',
    name: '1000 CP',
    nominal: 1000,
    price: 48000,
    description: 'Paket CP besar',
    icon: '🎯',
    game: 'codm',
    category: 'voucher',
    isPopular: false,
    discount: 5,
    status: 'active',
  },

  // ── Arena of Valor - Voucher ──
  {
    id: 'aov-voucher-1',
    name: '100 Voucher',
    nominal: 100,
    price: 10000,
    description: 'Voucher Arena of Valor',
    icon: '🎟️',
    game: 'aov',
    category: 'voucher',
    isPopular: false,
    discount: 0,
    status: 'active',
  },
  {
    id: 'aov-voucher-2',
    name: '500 Voucher',
    nominal: 500,
    price: 48000,
    description: 'Paket voucher hemat',
    icon: '🎟️',
    game: 'aov',
    category: 'voucher',
    isPopular: true,
    discount: 8,
    status: 'active',
  },
];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 💬 Testimonials
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'testi-1',
    name: 'Ahmad Rasyid',
    avatarUrl: '',
    game: 'MLBB',
    nominal: '140 Diamond',
    rating: 5,
    comment: 'Top up langsung masuk! Ga perlu tunggu lama, proses cepat banget. Pasti order lagi ke sini.',
    date: '2026-04-20',
  },
  {
    id: 'testi-2',
    name: 'Siti Marya',
    avatarUrl: '',
    game: 'Free Fire',
    nominal: '500 Diamond',
    rating: 5,
    comment: 'Udah 5x order di sini, harga terbaik dan pelayanan terjamin. CS-nya juga super ramah!',
    date: '2026-04-18',
  },
  {
    id: 'testi-3',
    name: 'Budi Santoso',
    avatarUrl: '',
    game: 'PUBG Mobile',
    nominal: '300 UC',
    rating: 4,
    comment: 'Lancar, ga ada masalah. Cuma semoga harganya bisa lebih murah lagi ya 😄',
    date: '2026-04-15',
  },
  {
    id: 'testi-4',
    name: 'Linda Kusuma',
    avatarUrl: '',
    game: 'MLBB',
    nominal: '570 Diamond',
    rating: 5,
    comment: 'Belinya pas promo, dapat diskon 10%! Sangat menguntungkan. Recommended untuk semua player MLBB!',
    date: '2026-04-12',
  },
  {
    id: 'testi-5',
    name: 'Rendra Wijaya',
    avatarUrl: '',
    game: 'COD Mobile',
    nominal: '1000 CP',
    rating: 5,
    comment: 'Udah main COD sejak lama, top up di sini paling aman dan terpercaya sejauh ini.',
    date: '2026-04-10',
  },
  {
    id: 'testi-6',
    name: 'Eka Priyanti',
    avatarUrl: '',
    game: 'Arena of Valor',
    nominal: '500 Voucher',
    rating: 5,
    comment: 'Harga kompetitif, prosesnya cepat, dan semua transaksi aman. Mantap!',
    date: '2026-04-08',
  },
];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ❓ FAQ Items
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'Bagaimana cara membeli top up?',
    answer: 'Cukup pilih game dan nominal yang ingin dibeli, masukkan ID akun, pilih metode pembayaran, dan lakukan pembayaran. Top up akan masuk ke akun Anda dalam beberapa menit setelah pembayaran dikonfirmasi.',
  },
  {
    id: 'faq-2',
    question: 'Berapa lama proses top up?',
    answer: 'Proses top up biasanya langsung masuk dalam hitungan menit sampai maksimal 1 jam setelah pembayaran dikonfirmasi. Kami bekerja 24/7 untuk memastikan transaksi Anda lancar.',
  },
  {
    id: 'faq-3',
    question: 'Metode pembayaran apa saja yang tersedia?',
    answer: 'Kami menerima berbagai metode pembayaran: Transfer Bank (BCA, BRI, BNI, Mandiri), GoPay, OVO, DANA, LinkAja, dan QRIS. Pilih sesuai kenyamanan Anda.',
  },
  {
    id: 'faq-4',
    question: 'Bagaimana jika top up tidak masuk ke akun saya?',
    answer: 'Jika top up tidak masuk dalam 1 jam, segera hubungi customer service kami via WhatsApp atau live chat. Tim kami akan membantu mengecek dan menyelesaikan masalah dengan cepat.',
  },
  {
    id: 'faq-5',
    question: 'Apakah akun saya aman saat top up?',
    answer: 'Ya, akun Anda 100% aman. Kami hanya memerlukan ID dan nomor server akun Anda, bukan password. Semua transaksi dienkripsi dan dijamin keamanannya.',
  },
  {
    id: 'faq-6',
    question: 'Apakah ada biaya tambahan atau hidden cost?',
    answer: 'Tidak ada! Harga yang terlihat adalah harga final. Tidak ada biaya admin atau biaya tersembunyi lainnya. Apa yang Anda bayar adalah yang akan Anda terima.',
  },
  {
    id: 'faq-7',
    question: 'Bagaimana cara mendapatkan bonus atau promo?',
    answer: 'Kami sering mengadakan promo menarik dengan diskon hingga 15%. Follow sosial media kami untuk update promo terbaru. Daftar juga untuk mendapat notifikasi promo eksklusif.',
  },
  {
    id: 'faq-8',
    question: 'Apakah ada garansi jika ada masalah?',
    answer: 'Tentu! Jika ada masalah dengan top up Anda, kami memberikan garansi uang kembali 100% atau akan kami ulang tanpa biaya tambahan. Kepuasan pelanggan adalah prioritas kami.',
  },
];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 🎮 Supported Games
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const SUPPORTED_GAMES = [
  {
    id: 'mlbb',
    label: 'Mobile Legends: Bang Bang',
    emoji: '🎮',
    abbreviation: 'MLBB',
  },
  {
    id: 'pubg',
    label: 'PUBG Mobile',
    emoji: '🏃',
    abbreviation: 'PUBG',
  },
  {
    id: 'freefire',
    label: 'Free Fire',
    emoji: '🔫',
    abbreviation: 'FF',
  },
  {
    id: 'codm',
    label: 'Call of Duty Mobile',
    emoji: '🎯',
    abbreviation: 'COD',
  },
  {
    id: 'aov',
    label: 'Arena of Valor',
    emoji: '⚔️',
    abbreviation: 'AOV',
  },
];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 💳 Payment Methods
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const PAYMENT_METHODS = [
  { value: 'bank_transfer', label: 'Transfer Bank', icon: '🏦' },
  { value: 'gopay', label: 'GoPay', icon: '💚' },
  { value: 'ovo', label: 'OVO', icon: '🟣' },
  { value: 'dana', label: 'DANA', icon: '💳' },
  { value: 'linkaja', label: 'LinkAja', icon: '📱' },
];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 🌟 How It Works Steps
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const HOW_IT_WORKS = [
  {
    id: '1',
    title: 'Pilih Game & Nominal',
    description: 'Pilih game favorit Anda dan nominal diamond/voucher yang diinginkan',
    icon: '📱',
  },
  {
    id: '2',
    title: 'Masukkan ID Akun',
    description: 'Masukkan ID akun dan nomor server game Anda dengan benar',
    icon: '🔐',
  },
  {
    id: '3',
    title: 'Pilih Metode Pembayaran',
    description: 'Pilih dari berbagai metode pembayaran yang tersedia',
    icon: '💳',
  },
  {
    id: '4',
    title: 'Lakukan Pembayaran',
    description: 'Ikuti instruksi pembayaran dan selesaikan transaksi',
    icon: '✅',
  },
  {
    id: '5',
    title: 'Top Up Masuk',
    description: 'Top up Anda akan masuk dalam hitungan menit',
    icon: '🎁',
  },
];
