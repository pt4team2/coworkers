import React from 'react';
import CloseIcon from '@/assets/icons/ic_x2.svg';
import Image from 'next/image';
import ModalPortal from '../ModalPortal/ModalPortal';
import { useAddMemberModalStore } from '@/store/useAddMemberModalStore';

interface ModalProps {
  onClose: () => void;
  title?: string;
  description: string;
  buttonContents: string;
}

export default function PopupOneButton({
  onClose,
  title,
  description,
  buttonContents,
}: ModalProps) {
  const { closeModal } = useAddMemberModalStore();
  return (
    <ModalPortal onClose={closeModal}>
      <div className="flex h-[195px] w-[375px] flex-col items-center rounded-b-[0px] rounded-t-[24px] bg-background-secondary p-4 pb-8 md:h-[211px] md:w-96 md:rounded-[12px] lg:h-[211px] lg:w-96 lg:rounded-[12px]">
        <button onClick={onClose} className="mb-2 ml-auto">
          <Image src={CloseIcon} alt="CloseIcon" width={24} height={24} />
        </button>
        <div className="flex w-[280px] flex-col justify-center">
          <div className="flex h-[44px] flex-col justify-between">
            <div className="text-lg-medium mb-2 text-center text-text-primary">
              {title}
            </div>
            <p className="text-md-medium mb-10 text-center text-text-secondary">
              {description}
            </p>
            <button className="text-lg-semibold w-full rounded-2xl bg-brand-primary px-[14px] py-[14px] text-text-inverse">
              {buttonContents}
            </button>
          </div>
        </div>
      </div>
    </ModalPortal>
  );
}
