'use client';

import React from 'react';
import ProfileDropdown from './ProfileDropdown';
import { IUser } from '@/types/user';
import Link from 'next/link';
interface ProfileProps {
  user: IUser | null;
  isLoading: boolean;
}

export default function ({ user, isLoading }: ProfileProps) {

  if (isLoading) {
    return <p>...loading</p>;
  }

  if (!user) {
    return (
      <Link href="/login">
        <div>로그인</div>
      </Link>
    );
  }

  return (
    <div className="text-md-medium flex flex-row items-center gap-2">
      <ProfileDropdown user={user} isLoading={isLoading} />
    </div>
  );
}
