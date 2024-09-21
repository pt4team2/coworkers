import React from 'react';
import ImgLogo from 'src/assets/images/img_logo.svg';
import IcMenu from 'src/assets/icons/ic-menu.svg';
import Image from 'next/image';
import Profile from './Profile';
import TeamDropdown from './TeamDropdown';
import Link from 'next/link';
import useUser from '@/hooks/useUser';
import { useSession } from 'next-auth/react';

export default function Header() {
  const { data: session } = useSession();
  const { user } = useUser(session?.user.id);

  return (
    <div className="w-full bg-background-secondary">
      <div className="m-auto flex items-center justify-between gap-4 px-4 py-5 md:gap-8 md:px-6 lg:max-w-[1200px] lg:gap-10 lg:px-0">
        <Image
          className="w-6 md:hidden lg:hidden"
          src={IcMenu}
          alt="메뉴 아이콘"
        />
          <Image
            src={ImgLogo}
            className="mr-auto h-8 w-[102px] md:mr-0 lg:mr-0 lg:w-[158px]"
            alt="로고이미지"
          />
        <div className="mr-auto hidden md:flex md:items-center md:gap-8 lg:flex lg:items-center lg:justify-center lg:gap-10">
          <TeamDropdown user={user} />
          <Link href="/boards">
            <button className="flex items-center justify-center">
              {' '}
              자유게시판
            </button>
          </Link>
        </div>
        <span>
          <Profile />
        </span>
      </div>
    </div>
  );
}
