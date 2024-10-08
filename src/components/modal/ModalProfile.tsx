import React from 'react';
import CloseIcon from '@/assets/icons/ic_x.svg';
import ProfileIcon from '@/assets/icons/ic_profile.svg';
import Image from 'next/image';
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

const ModalProfile = ({ isOpen, onClose }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="relative flex h-[261px] w-[375px] rounded-b-[0px] rounded-t-xl bg-background-secondary md:h-[266px] md:w-[344px] md:rounded-3xl lg:h-[266px] lg:w-[344px] lg:rounded-3xl">
      <button className="absolute right-3 top-3">
        <Image src={CloseIcon} alt="CloseIcon" width={24} height={24} />
      </button>
      <div className="mx-auto mb-8 mt-12 flex w-[280px] flex-col items-center justify-between">
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
            <h2 className="text-md-medium text-center text-text-primary">
              우지은
            </h2>
            <div className="text-xs-regular text-center text-text-secondary">
              jieunn@codeit.com
            </div>
          </div>
        </div>
        <button
          className="text-lg-medium px-auto py-auto w-full rounded-xl bg-brand-primary text-text-inverse"
          onClick={onClose}
        >
          이메일 복사하기
        </button>
      </div>
    </div>
  );
};

export default ModalProfile;
