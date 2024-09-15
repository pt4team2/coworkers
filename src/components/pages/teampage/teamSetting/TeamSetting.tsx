import { teamMockData } from '@/data/mockData';
import React from 'react';
import settingIcon from '@/assets/icons/ic_setting.svg';
import backgroundImg from '@/assets/images/img_teambg.svg';
import Image from 'next/image';

export default function TeamSetting() {
  return (
    <div className="relative flex h-16 w-full flex-row items-center justify-between gap-8 rounded-2xl border border-solid border-border-primary border-opacity-10 bg-slate-50 bg-opacity-10 px-5 py-6">
      <span className="text-xl-bold">
        {teamMockData.memberships[1].group.name}
      </span>
      <Image
        className="absolute right-1/4 ml-auto md:static lg:static"
        src={backgroundImg}
        alt="백그라운드 이미지"
      />
      <Image width={24} height={24} src={settingIcon} alt="설정 아이콘" />
    </div>
  );
}
