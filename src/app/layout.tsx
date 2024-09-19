'use client';

import React from 'react';
import '../styles/globals.css';
import Header from '@/components/header/Header';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import Providers from '@/components/auth/Providers';


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <html lang="ko">
        <body>
          <Providers>
            <header>
              <Header/>
            </header>
          <main className="m-auto max-w-[1200px] px-4 md:px-6 lg:px-0">
            {children}
          </main>
          </Providers>
        </body>
      </html>
    </QueryClientProvider>
  );
}
