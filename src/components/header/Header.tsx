'use client';

import React, { useState, useEffect, useRef } from 'react';
import ImgLogo from 'src/assets/images/img_logo.svg';
import IcMenu from 'src/assets/icons/ic-menu.svg';
import Image from 'next/image';
import Profile from './Profile';
import TeamDropdown from './TeamDropdown';
import Link from 'next/link';
import useUser from '@/hooks/useUser';
import useSessionStore from '@/store/useSessionStore';
import { IMembership } from '@/types/user';
import IcClose from '@/assets/icons/ic_x2.svg';
import AddTeamModal from '../modal/AddTeamModal';
import { useAddTeamModalStore } from '@/store/useAddTeamModalStore';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const { isModalOpen, openModal, closeModal } = useAddTeamModalStore();
  const {
    user: sessionUser,
    accessToken,
    accessTokenExpires,
  } = useSessionStore();
  const { userData, isLoading, error } = useUser(sessionUser?.id);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full bg-background-secondary">
      <div className="m-auto flex items-center justify-between gap-4 px-4 py-5 md:gap-8 md:px-6 lg:max-w-[1200px] lg:gap-10 lg:px-0">
        {userData && (
          <Image
            className="w-6 cursor-pointer md:hidden lg:hidden"
            src={IcMenu}
            alt="메뉴 아이콘"
            onClick={toggleMenu}
          />
        )}
        <Link href={`/`} className="mr-auto md:mr-0 lg:mr-0">
          <Image
            src={ImgLogo}
            className="h-8 w-[102px] lg:w-[158px]"
            alt="로고이미지"
          />
        </Link>
        <div className="mr-auto hidden md:flex md:items-center md:gap-8 lg:flex lg:items-center lg:justify-center lg:gap-10">
          <TeamDropdown user={userData} />
          <Link href="/boards">
            {userData && (
              <button className="text-lg-medium flex items-center justify-center">
                {' '}
                자유게시판
              </button>
            )}
          </Link>
        </div>
        <span>
          <Profile user={userData} isLoading={isLoading}/>
        </span>
      </div>

      {/* 메뉴 클릭했을 때, 사이드 메뉴 - 팀리스트 */}
      {isMenuOpen && (
        <div className="fixed left-0 top-0 z-50 h-full w-full bg-black bg-opacity-50">
          <div
            className="left-0 top-0 h-full w-3/4 max-w-xs bg-background-secondary p-6 shadow-lg"
            ref={dropdownRef}
          >
            <div className="flex flex-col">
              <div className="mb-[35px] flex flex-row items-center justify-center">
                <span className="text-2lg-semibold">팀 목록</span>
                <button className="ml-auto cursor-pointer" onClick={toggleMenu}>
                  <Image width={24} height={24} src={IcClose} alt="닫기 버튼" />
                </button>
              </div>
              <ul className="flex flex-col gap-2">
                {userData?.memberships.map((membership: IMembership) => (
                  <li
                    className="mt-2 flex items-center gap-1.5 rounded-[8px] py-2 pl-2 hover:bg-slate-700"
                    key={membership.group.id}
                  >
                    <Link
                      href={`/teampage/${membership.group.id}`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <div className="flex flex-row items-center gap-2">
                        <Image
                          src={membership.group.image}
                          alt="그룹 이미지"
                          width={32}
                          height={32}
                          className="h-8 w-8 rounded-[6px] object-cover"
                        />{' '}
                        <span className="text-md-medium">
                          {' '}
                          {membership.group.name}
                        </span>
                      </div>
                    </Link>
                  </li>
                ))}
                <li className="mt-2 flex items-center rounded-[8px] py-2 pl-2 text-text-primary">
                  <button onClick={openModal}>팀 추가하기</button>
                </li>
                <li className="mt-2 flex items-center rounded-[8px] py-2 pl-2 text-brand-primary">
                  <Link href={`/boards`} onClick={() => setIsMenuOpen(false)}>
                    자유게시판
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
      {isModalOpen && <AddTeamModal onClose={closeModal} />}
    </div>
  );
}
