'use client';

import React, { useMemo, useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import IcArrow from 'src/assets/icons/ic_toggleDown.svg'; // 제대로 된 경로 확인 필요
import IcKebab from 'src/assets/icons/ic_kebab.svg';
import IcPlus from 'src/assets/icons/ic_plus.svg';
import { IUser } from '@/types/user';
import AddTeamModal from '../modal/AddTeamModal';
import { useAddTeamModalStore } from '@/store/useAddTeamModalStore';
import Toast from '../toast/Toast';
import { useAddTeamModalToastStore } from '@/store/useToastStore';

interface TeamDropdownProps {
  user: IUser | null;
}

export default function TeamDropdown({ user }: TeamDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { isModalOpen, openModal, closeModal } = useAddTeamModalStore();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const toggleDropdown = () => setIsOpen(!isOpen);
  const { toastVisible, toastMessage, toastType, openToast, closeToast } =
    useAddTeamModalToastStore();

  const pathname = usePathname();
  const selectedTeamId = useMemo(() => {
    const pathArray = pathname.split('/');
    return Number(pathArray[2]);
  }, [pathname]);

  const selectedGroup = useMemo(() => {
    const group = user?.memberships.find(
      (membership) => membership.group.id === selectedTeamId,
    );
    return group;
  }, [user, selectedTeamId]);

  // 외부 클릭 감지하여 드롭다운 닫기
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

  if (!user || !user.memberships) {
    return null;
  }

  return (
    <div className="relative z-20" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="text-lg-medium flex flex-row items-center justify-center gap-[11px]"
      >
        {selectedGroup?.group.name || '팀 선택'}
        <Image src={IcArrow} alt="드롭다운 화살표" width={8} height={8} />
      </button>

      {isOpen && (
        <ul className="absolute left-0 top-10 mt-2 flex w-[218px] flex-col gap-[8px] rounded-[12px] border border-background-tertiary bg-background-secondary p-4 text-sm shadow-lg">
          {user.memberships.map((membership) => (
            <li key={membership.group.id}>
              <Link
                href={`/teampage/${membership.group.id}`}
                className="flex h-[46px] items-center gap-3 rounded-[8px] p-2 hover:bg-slate-700"
                onClick={() => setIsOpen(false)}
              >
                {/* 그룹 이미지 */}
                <Image
                  src={membership.group.image}
                  alt="그룹 이미지"
                  width={32} // width와 height 지정
                  height={32}
                  className="h-8 w-8 rounded-[6px] object-cover"
                />
                <span className="text-lg-medium">{membership.group.name}</span>
              </Link>
            </li>
          ))}
          {/* 팀 추가 버튼 */}
          <li className="mt-2 flex items-center justify-center gap-1.5 rounded-[8px] border border-slate-50 py-[14px] hover:bg-slate-700">
            <button
              className="m-0 flex flex-row items-center justify-center gap-[1.5px]"
              onClick={openModal}
            >
              <Image src={IcPlus} alt="추가 버튼" width={16} height={16} />
              <span className="text-lg-medium">팀 추가하기</span>
            </button>
          </li>
        </ul>
      )}
      {isModalOpen && (
        <AddTeamModal openToast={openToast} onClose={closeModal} />
      )}
      {toastVisible && (
        <Toast
          message={toastMessage}
          type={toastType}
          closeToast={closeToast}
        />
      )}
    </div>
  );
}
