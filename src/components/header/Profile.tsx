import React from 'react';
import Image from 'next/image';
import IcProfile from 'src/assets/icons/ic_profile.svg';
import mockData from './mockData';

export default function () {
  return (
    <div className="text-md-medium flex flex-row items-center gap-2">
      <Image src={IcProfile} alt="사용자 프로필" />
      <span className="hidden lg:block">{mockData.nickname}</span>
    </div>
  );
}
