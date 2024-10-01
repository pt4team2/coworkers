'use client';

import React from 'react';
import Image from 'next/image';
import IcProfile from 'src/assets/icons/ic_profile.svg';
// import { teamMockData } from '@/data/mockData';
import { useSession } from 'next-auth/react';
import ProfileDropdown from './ProfileDropdown';
import { IUser } from '@/types/user';

interface ProfileProps {
  user: IUser | null;
}

export default function ({ user }: ProfileProps) {
  if (!user) {
    return <div>로그인이 필요합니다.</div>; // 유저 정보가 없을 때
  }

  return (
    <div className="text-md-medium flex flex-row items-center gap-2">
      <ProfileDropdown user={user} />
    </div>
  );
}
