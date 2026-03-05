import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Jesko Jets | The Sky Is No Longer The Limit',
  description: 'Premium cinematic flight experience.',
};

import Header from '@/components/layout/Header';
import Preloader from '@/components/ui/Preloader';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Preloader />
        <Header />
        {children}
      </body>
    </html>
  );
}
