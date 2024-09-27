'use client';

import React from 'react';
import Image from 'next/image';
import IcProfile from 'src/assets/icons/ic_profile.svg';
// import { teamMockData } from '@/data/mockData';
import { useSession } from 'next-auth/react';
import ProfileDropdown from './ProfileDropdown';

export default function () {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <div>Loading...</div>; // 세션 로드 중일 때
  }

  if (!session) {
    return <div>로그인이 필요합니다.</div>; // 세션 없을 때
  }
  return (
    <div className="text-md-medium flex flex-row items-center gap-2">
      <ProfileDropdown />
    </div>
  );
}
