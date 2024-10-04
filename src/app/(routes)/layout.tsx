import React from 'react';
import '../../styles/globals.css';
import Header from '@/components/header/Header';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header>
        <Header />
      </header>
      <main className="m-auto max-w-[1200px] px-4 md:px-6 lg:px-0">
        {children}
      </main>
    </>
  );
}
