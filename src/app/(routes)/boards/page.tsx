'use client';

import { useRouter } from 'next/navigation';

const FloatingButton = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push('/addboards');
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-0 flex items-center justify-center w-24 h-12 bg-[#10B981] rounded-full z-50 text-lg-semibold"
    >
      <span className="mr-2 text-xl">+</span>
      글쓰기
    </button>
  );
};

export default FloatingButton;
