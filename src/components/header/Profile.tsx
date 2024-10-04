'use client';

import React from 'react';
import Image from 'next/image';
import IcProfile from 'src/assets/icons/ic_profile.svg';
// import { teamMockData } from '@/data/mockData';
import { useSession } from 'next-auth/react';
import ProfileDropdown from './ProfileDropdown';
import { IUser } from '@/types/user';
import Link from 'next/link';
interface ProfileProps {
  user: IUser | null;
}

export default function ({ user }: ProfileProps) {
  if (!user) {
    return (
      <Link href="/login">
        <div>로그인</div>
      </Link>
    ); // 유저 정보가 없을 때
  }

  return (
    <div className="text-md-medium flex flex-row items-center gap-2">
      <ProfileDropdown user={user} />
    </div>
  );
}
