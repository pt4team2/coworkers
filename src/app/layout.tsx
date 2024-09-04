import React from 'react';
import '../styles/globals.css';
import Header from '@/components/Header';

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
        <main>{children}</main>
        <footer>푸터</footer>
      </body>
    </html>
  );
}
