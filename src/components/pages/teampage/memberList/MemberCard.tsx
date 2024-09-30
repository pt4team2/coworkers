'use client';

import Image from 'next/image';
import IcKebeb from '@/assets/icons/ic_kebab.svg';
import ImgMember from '@/assets/images/img_memberProfile.svg';
import { useProfileModalStore } from '@/store/useProfileModalStore';
import ProfileModal from '@/components/modal/ProfileModal';
import React, { useState } from 'react';
import { TeamMember } from '@/types/Group';

interface MemberCardProps {
  member: TeamMember;
}

export default function MemberCard({ member }: MemberCardProps) {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <div>
      {/* 모바일 */}
      <div className="flex h-[68px] w-full flex-row items-center justify-between gap-[6px] rounded-[16px] bg-background-secondary px-[16px] py-[12px] md:hidden lg:hidden">
        <div className="flex w-4/5 flex-col gap-[6px]">
          <div className="flex flex-row items-center gap-2">
            {member?.userImage ? (
              <div className="flex items-center justify-center">
                <Image
                  width={24}
                  height={24}
                  src={member?.userImage}
                  alt="이미지"
                  className="mg-0 block h-[24px] w-[24px] rounded-full object-cover"
                />
              </div>
            ) : (
              <Image
                width={24}
                height={24}
                src={ImgMember}
                alt="멤버 프로필이미지"
              />
            )}

            <span className="text-md-medium">{member.userName}</span>
          </div>
          <span className="text-xs-regular truncate text-text-secondary">
            {member.userEmail}
          </span>
        </div>
        <button onClick={() => openModal()}>
          <Image width={16} height={16} src={IcKebeb} alt="케밥 아이콘" />
        </button>
        {isModalOpen && <ProfileModal onClose={closeModal} member={member} />}
      </div>

      {/* 태블릿, 데스크탑 */}
      <div className="hidden h-[73px] w-full flex-row justify-between rounded-[16px] bg-background-secondary px-[24px] py-[20px] md:flex lg:flex">
        <div className="text-0 flex flex-row gap-3">
          {member?.userImage ? (
            <div className="flex items-center justify-center">
              <Image
                width={24}
                height={24}
                src={member?.userImage}
                alt="이미지"
                className="mg-0 block h-[24px] w-[24px] rounded-full object-cover"
              />
            </div>
          ) : (
            <Image
              width={24}
              height={24}
              src={ImgMember}
              alt="멤버 프로필이미지"
            />
          )}
          <div className="flex flex-col justify-center gap-[2px]">
            <span className="text-md-medium">{member.userName}</span>
            <span className="text-xs-regular break-words text-text-secondary">
              {member.userEmail}
            </span>
          </div>
        </div>
        <button onClick={() => openModal()}>
          <Image width={16} height={16} src={IcKebeb} alt="케밥 아이콘" />
        </button>
        {isModalOpen && <ProfileModal onClose={closeModal} member={member} />}
      </div>
    </div>
  );
}
