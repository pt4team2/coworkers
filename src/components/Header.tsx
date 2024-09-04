import React from 'react';
import ImgLogo from 'src/assets/images/img_logo.svg';
import Image from 'next/image';
export default function Header() {
  return (
    <>
      <div className="p-5">
        <Image src={ImgLogo} alt="로고이미지" />
      </div>
      <p >Header</p>
    </>
  );
}
