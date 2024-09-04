import React from 'react';
import '../styles/globals.css';
import Header from '@/components/header/Header';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header>
          <Header />
        </header>
        <main className="max-w-[1200px] m-auto">{children}</main>
      </body>
    </html>
  );
}
