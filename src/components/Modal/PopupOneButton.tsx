import React from 'react';
import CloseIcon from '@/assets/icons/ic_x.svg';
import Image from 'next/image';
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

const PopupOneButton: React.FC<ModalProps> = ({ isOpen, onClose, title }) => {
  if (!isOpen) return null;

  return (
    <div className="relative flex h-[195px] w-[375px] rounded-b-[0px] rounded-t-[24px] bg-background-secondary md:h-[211px] md:w-96 md:rounded-[12px] lg:h-[211px] lg:w-96 lg:rounded-[12px]">
      <button className="absolute right-3 top-3">
        <Image src={CloseIcon} alt="CloseIcon" width={24} height={24} />
      </button>
      <div className="mb-8 ml-12 mr-[47px] mt-12 flex w-[280px] flex-col items-center justify-center justify-between md:mb-8 md:ml-12 md:ml-[44px] md:mr-[60px] lg:mb-8 lg:ml-[44px] lg:mr-[60px] lg:mt-12">
        <div className="flex h-[44px] w-[227px] flex-col justify-between">
          <div className="text-center text-[16px] font-medium leading-[19px] text-text-primary">
            멤버 초대
          </div>
          <div className="text-center text-[14px] font-medium leading-[17px] text-text-secondary">
            그룹에 참여할 수 있는 링크를 복사합니다.
          </div>
        </div>
        <button
          className="w-full rounded-2xl bg-green-500 px-[14px] py-[14px] text-white"
          onClick={onClose}
        >
          링크 복사하기
        </button>
      </div>
    </div>
  );
};

export default PopupOneButton;
