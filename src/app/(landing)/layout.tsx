import React from 'react';
import '../../styles/globals.css';
import Header from '@/components/header/Header';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header>
        <Header />
      </header>
      <main className="m-auto">{children}</main>
    </>
  );
}