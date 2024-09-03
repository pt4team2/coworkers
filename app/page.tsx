import React from 'react';
import '../styles/globals.css';
import Image from 'next/image';
import dogImage from '../assets/images/dog.png';

export default function Page() {
  return (
    <>
      <p className="flex bg-brand-primary text-sm">최상단</p>
      <Image src={dogImage} alt="Vercel Logo" width={72} height={16} />
      <Image src="/images/dog2.png" alt="Vercel Logo" width={72} height={16} />
    </>
  );
}
