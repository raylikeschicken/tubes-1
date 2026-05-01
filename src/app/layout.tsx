import type { Metadata, Viewport } from 'next';
import './globals.css';

export const viewport: Viewport = {
  themeColor: '#0A0C12',
};

export const metadata: Metadata = {
  title: 'DimsTopup - Top Up Game Cepat, Murah & Aman',
  description:
    'Platform top up game terpercaya untuk MLBB, PUBG Mobile, Free Fire, COD Mobile, dan Arena of Valor. Proses cepat, harga hemat, dan pembayaran aman.',
  keywords: [
    'top up game',
    'top up mlbb',
    'top up mobile legends',
    'top up free fire',
    'top up pubg mobile',
    'top up cod mobile',
  ],
  openGraph: {
    title: 'DimsTopup - Top Up Game Cepat & Aman',
    description:
      'Top up game favorit dengan harga hemat, pembayaran aman, dan proses cepat.',
    type: 'website',
    locale: 'id_ID',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
