import React from 'react';

import CloseIcon from '@/assets/icons/ic_x2.svg';
import Image from 'next/image';
import ModalPortal from '../ModalPortal/ModalPortal';
import { useAddMemberModalStore } from '@/store/useAddMemberModalStore';
import useInvitation from '@/hooks/useInvitation';

interface ModalProps {
  onClose: () => void;
  title?: string;
  description: string;
  buttonContents: string;
  groupId: number | undefined;
}

export default function PopupOneButton({
  onClose,
  title,
  description,
  buttonContents,
  groupId,
}: ModalProps) {
  const { closeModal } = useAddMemberModalStore();

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert('클립보드에 복사되었습니다.');
    } catch (error) {
      console.error(error);
    }
  };

  const invitationLink = useInvitation(groupId);
  const handleCopyClick = () => {
    const linkToCopy = invitationLink.link;
    copyToClipboard(linkToCopy);
    console.log('111', linkToCopy);
  };

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
            <button
              onClick={handleCopyClick}
              className="text-lg-semibold w-full rounded-2xl bg-brand-primary px-[14px] py-[14px] text-text-inverse"
            >
              {buttonContents}
            </button>
          </div>
        </div>
      </div>
    </ModalPortal>
  );
}
