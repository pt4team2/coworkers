'use client';

import React, { useState } from 'react';
import '../styles/globals.css';
import Header from '@/components/header/Header';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
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
            <main>{children}</main>
          </Providers>
        </body>
      </html>
    </QueryClientProvider>
  );
}
