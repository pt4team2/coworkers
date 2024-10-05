'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import PlusIcon from '@/assets/icons/ic_add.svg';

const FloatingButton = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push('/addboards');
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 flex items-center justify-center w-[104px] h-12 bg-[#10B981] rounded-full z-50 text-lg-semibold"
    >
      <Image src={PlusIcon} alt="이미지 등록" className="w-4 h-4 mr-1"/>
      글쓰기
    </button>
  );
};

export default FloatingButton;
