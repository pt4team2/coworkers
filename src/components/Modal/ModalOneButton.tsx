import React from 'react';
import CloseIcon from '@/assets/icons/close.svg';
import Image from 'next/image';
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

const ModalOneButton = ({ isOpen, onClose }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="relative flex h-[231px] w-[375px] rounded-b-[0px] rounded-t-xl bg-background-secondary md:h-[235px] md:w-96 md:rounded-xl lg:h-[235px] lg:w-96 lg:rounded-xl">
      <button className="absolute right-3 top-3">
        <Image src={CloseIcon} alt="CloseIcon" width={24} height={24} />
      </button>
      <div className="mx-auto mb-8 mt-12 flex w-[280px] flex-col items-center justify-center">
        <div className="flex h-[79px] flex-col justify-between md:h-[83px] lg:h-[83px]">
          <h2 className="text-lg-medium text-center text-text-primary">
            할 일 목록
          </h2>
          <input className="h-[79px] rounded-xl border border-border-primary bg-background-secondary md:h-[83px] lg:h-[83px]" />
        </div>
        <button
          className="px-auto py-auto h-[47px] w-full rounded-xl bg-brand-primary text-text-inverse"
          onClick={onClose}
        >
          만들기
        </button>
      </div>
    </div>
  );
};

export default ModalOneButton;
