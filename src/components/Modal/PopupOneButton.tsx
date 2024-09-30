import React from 'react';
import CloseIcon from '@/assets/icons/ic_x2.svg';
import Image from 'next/image';

interface ModalProps {
  onClose: () => void;
  title?: string;
}

export default function PopupOneButton({ onClose, title }: ModalProps) {
  return (
    <div className="relative flex h-[195px] w-[375px] rounded-b-[0px] rounded-t-[24px] bg-background-secondary md:h-[211px] md:w-96 md:rounded-[12px] lg:h-[211px] lg:w-96 lg:rounded-[12px]">
      <button onClick={onClose} className="absolute right-3 top-3 mb-[14px]">
        <Image src={CloseIcon} alt="CloseIcon" width={24} height={24} />
      </button>
      <div className="mb-8 ml-12 mr-[47px] mt-12 flex w-[280px] flex-col items-center justify-center md:mb-8 md:ml-[44px] md:mr-[60px] lg:mb-8 lg:ml-[44px] lg:mr-[60px] lg:mt-12">
        <div className="flex h-[44px] w-[227px] flex-col justify-between">
          <div className="text-lg-medium mb-2 text-center text-text-primary">
            {title}
          </div>
          <p className="text-md-medium mb-10 text-center text-text-secondary">
            그룹에 참여할 수 있는 링크를 복사합니다.
          </p>
        </div>
        <button className="text-lg-semibold w-full rounded-2xl bg-brand-primary px-[14px] py-[14px] text-text-inverse">
          링크 복사하기
        </button>
      </div>
    </div>
  );
}
