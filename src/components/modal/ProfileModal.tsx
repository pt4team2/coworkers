import React from 'react';
import CloseIcon from '@/assets/icons/ic_x2.svg';
import ProfileIcon from '@/assets/icons/ic_member.svg';
import Image from 'next/image';
import ModalPortal from '../ModalPortal/ModalPortal';
import { IMembership } from '@/types/user';
import { TeamMember } from '@/types/Group';
import { useParams } from 'next/navigation';

interface ModalProps {
  onClose: () => void;
  member: TeamMember;
  openToast2: (message: string, type: 'success' | 'error' | 'info') => void;
}

const ModalProfile = ({ onClose, member, openToast2 }: ModalProps) => {
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      onClose();
      openToast2('이메일 주소가 복사되었습니다', 'info');
    } catch (error) {
      console.error(error);
    }
  };

  const handleCopyClick = () => {
    const emailToCopy = member.userEmail;
    copyToClipboard(emailToCopy);
  };

  return (
    <ModalPortal onClose={onClose}>
      <div className="relative flex h-[261px] w-[375px] rounded-b-[0px] rounded-t-[12px] bg-background-secondary md:h-[266px] md:w-[344px] md:rounded-[24px] lg:h-[266px] lg:w-[344px] lg:rounded-[24px]">
        <button onClick={onClose} className="absolute right-8 top-4">
          <Image src={CloseIcon} alt="CloseIcon" width={24} height={24} />
        </button>
        <div className="mx-auto mb-8 mt-12 flex w-[280px] flex-col items-center justify-center">
          <div className="flex w-[102px] flex-col items-center justify-between gap-6 md:h-[115px] md:w-[103px] lg:h-[115px] lg:w-[103px]">
            <div className="relative h-[46px] w-[46px] md:h-[52px] md:w-[52px]">
              <Image
                width={52}
                height={52}
                className="h-[52px] w-[52px] rounded-full object-fill"
                src={member.userImage ? member.userImage : ProfileIcon}
                alt="ProfileIcon"
              />
            </div>
            <div className="flex w-full flex-col justify-between gap-2">
              <div className="text-md-medium text-center text-text-primary">
                {member.userName}
              </div>
              <div className="text-xs-regular mb-6 text-center text-text-secondary">
                {member.userEmail}
              </div>
            </div>
          </div>
          <button
            onClick={handleCopyClick}
            className="text-lg-semibold mt-6 w-full rounded-[12px] bg-brand-primary px-[14px] py-[14px] leading-[19px] text-text-inverse"
          >
            이메일 복사하기
          </button>
        </div>
      </div>
    </ModalPortal>
  );
};
export default ModalProfile;
