'use client';

import React from 'react';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import IcProfile from '@/assets/icons/ic_profile.svg';
import Link from 'next/link';
import { IUser } from '@/types/user';

interface ProfileDropdownProps {
  user: IUser;
}
export default function ProfileDropdown({ user }: ProfileDropdownProps) {
  if (!user) {
    return <div>유저 정보가 없습니다.</div>; // user가 null일 경우 예외 처리
  }
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const toggleDropdown = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative z-30" ref={dropdownRef}>
      <button onClick={toggleDropdown}>
        <div className="flex flex-row items-center justify-center gap-[8px]">
          {user?.image ? (
            <Image
              width={28}
              height={28}
              src={user?.image}
              alt="이미지"
              className="h-[28px] w-[28px] rounded-full object-cover"
            />
          ) : (
            <Image
              className="w-6 md:w-4 lg:w-4"
              src={IcProfile}
              alt="사용자 프로필"
            />
          )}
          <span className="text-md-medium hidden lg:block">
            {user.nickname}
          </span>
        </div>
      </button>
      {isOpen && (
        <ul className="text-lg-regular absolute right-0 top-10 z-30 mt-2 flex h-[184px] w-[135px] flex-col justify-center gap-[8px] rounded-[12px] border border-background-tertiary bg-background-secondary p-[14px] text-sm shadow-lg">
          <li className="rounded-[8px] bg-background-secondary p-2 text-center hover:bg-slate-700">
            마이 히스토리
          </li>
          <Link className="mg-0" href="/reset-password">
            <li className="items-center justify-between rounded-[8px] bg-background-secondary p-2 text-center hover:bg-slate-700">
              계정 설정
            </li>
          </Link>
          <li className="items-center justify-between rounded-[8px] bg-background-secondary p-2 text-center hover:bg-slate-700">
            팀 참여
          </li>
          <li className="items-center justify-between rounded-[8px] bg-background-secondary p-2 text-center hover:bg-slate-700">
            로그아웃
          </li>
        </ul>
      )}
    </div>
  );
}
