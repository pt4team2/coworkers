import React from 'react';

import CloseIcon from '@/assets/icons/close.svg';

import Image from 'next/image';
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

const PopupOneButton = ({ isOpen, onClose }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="relative flex h-[195px] w-[375px] rounded-b-[0px] rounded-t-3xl bg-background-secondary md:h-[211px] md:w-96 md:rounded-xl lg:h-[211px] lg:w-96 lg:rounded-xl">
      <button className="absolute right-3 top-3">
        <Image src={CloseIcon} alt="CloseIcon" width={24} height={24} />
      </button>
      <div className="mb-8 ml-12 mr-[47px] mt-12 flex w-[280px] flex-col items-center justify-between md:mb-8 md:ml-12 md:mr-[60px] lg:mb-8 lg:ml-[44px] lg:mr-[60px] lg:mt-12">
        <div className="flex h-[44px] flex-col justify-between">
          <h2 className="text-md-medium text-center text-text-primary">
            멤버 초대
          </h2>
          <div className="text-md-medium text-center text-text-secondary">
            그룹에 참여할 수 있는 링크를 복사합니다.
          </div>
        </div>
        <button
          className="px-auto py-auto h-[47px] w-full rounded-2xl bg-brand-primary text-text-inverse"
          onClick={onClose}
        >
          링크 복사하기
        </button>
      </div>
    </div>
  );
};

export default PopupOneButton;
