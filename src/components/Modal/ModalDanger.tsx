import { useState } from 'react';
import Image from 'next/image';
import DangerIcon from '@/assets/icons/ic_alert.svg';
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

const ModalDanger: React.FC<ModalProps> = ({ isOpen, onClose, title }) => {
  if (!isOpen) return null;

  return (
    <div className="relative flex h-[245px] w-[375px] rounded-b-[0px] rounded-t-[12px] bg-background-secondary md:h-[245px] md:w-96 md:rounded-[12px] lg:h-[245px] lg:w-96 lg:rounded-[12px]">
      <div className="mx-auto mb-8 mt-10 flex h-[173px] w-[280px] flex-col items-center justify-center justify-between">
        <div className="flex h-[101px] flex-col items-center justify-between">
          <div>
            <Image src={DangerIcon} alt="DangerIcon" width={24} height={24} />
          </div>
          <div className="flex h-[61px] w-[239px] flex-col justify-between">
            <div className="text-center text-[16px] font-medium leading-[19px]">
              회원 탈퇴를 진행하시겠어요?
            </div>
            <div className="text-center text-[14px] font-medium leading-[17px]">
              그룹장으로 있는 그룹은 자동으로 삭제되고, 모든 그룹에서
              나가집니다.
            </div>
          </div>
        </div>
        <div className="flex h-12 w-full justify-between">
          <button
            className="px-auto w-[136px] rounded-2xl bg-background-inverse py-3 text-text-default"
            onClick={onClose}
          >
            닫기
          </button>
          <button
            className="px-auto w-[136px] rounded-2xl bg-red-500 py-3"
            onClick={onClose}
          >
            회원 탈퇴
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalDanger;
