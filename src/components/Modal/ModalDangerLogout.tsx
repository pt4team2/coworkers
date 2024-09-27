import { useState } from 'react';
import Image from 'next/image';
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

const ModalDangerLogout: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
}) => {
  if (!isOpen) return null;

  return (
    <div className="relative flex h-[171px] w-96 flex-col justify-between rounded-b-[0px] rounded-t-[12px] bg-background-secondary px-[52px] pb-8 pt-12 md:rounded-[12px] lg:rounded-[12px]">
      <div className="text-center text-[16px] font-medium leading-[19px] text-text-primary">
        로그아웃 하시겠어요?
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
          로그아웃
        </button>
      </div>
    </div>
  );
};

export default ModalDangerLogout;
