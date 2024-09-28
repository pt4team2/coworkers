import React from 'react';
import CloseIcon from '@/assets/icons/ic_x.svg';
import ProfileIcon from '@/assets/icons/ic_profile.svg';
import Image from 'next/image';
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

const ModalProfile: React.FC<ModalProps> = ({ isOpen, onClose, title }) => {
  if (!isOpen) return null;

  return (
    <div className="relative flex h-[261px] w-[375px] rounded-b-[0px] rounded-t-[12px] bg-background-secondary md:h-[266px] md:w-[344px] md:rounded-[24px] lg:h-[266px] lg:w-[344px] lg:rounded-[24px]">
      <button className="absolute right-3 top-3">
        <Image src={CloseIcon} alt="CloseIcon" width={24} height={24} />
      </button>
      <div className="mx-auto mb-8 mt-12 flex w-[280px] flex-col items-center justify-center">
        <div className="flex h-[109px] w-[102px] flex-col items-center justify-between md:h-[115px] md:w-[103px] lg:h-[115px] lg:w-[103px]">
          <div className="relative h-[46px] w-[46px] md:h-[52px] md:w-[52px]">
            <Image
              src={ProfileIcon}
              alt="ProfileIcon"
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="flex h-[39px] w-full flex-col justify-between">
            <div className="text-center text-[14px] font-medium leading-[17px] text-text-primary">
              우지은
            </div>
            <div className="text-center text-[12px] leading-[14px] text-text-secondary">
              jieunn@codeit.com
            </div>
          </div>
        </div>
        <button
          className="w-full rounded-[12px] bg-green-500 px-[14px] py-[14px] text-[16px] font-semibold leading-[19px] text-text-inverse"
          onClick={onClose}
        >
          이메일 복사하기
        </button>
      </div>
    </div>
  );
};

export default ModalProfile;
