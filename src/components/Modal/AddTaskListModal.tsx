import Image from 'next/image';
import XIcon from '@/assets/icons/ic_x2.svg';
import React from 'react';

interface AddTeamModalProps {
  onClose: () => void;
}
export default function AddTaskListModal({ onClose }: AddTeamModalProps) {
  return (
    <div className="flex w-[384px] flex-col items-center rounded-[12px] bg-background-secondary">
      <button className="ml-auto mr-[9px]" onClick={onClose}>
        <Image width={24} height={24} src={XIcon} alt="엑스 버튼" />
      </button>
      <div className="flex w-[280px] flex-col">
        <p className="text-lg-medium text-center">할 일 목록</p>
        <input
          className="text-lg-regular mb-6 mt-4 h-12 w-full rounded-[12px] border border-solid border-border-primary border-opacity-10 bg-background-secondary px-[14.5px] py-[16px] text-text-primary active:border-none"
          placeholder="목록 명을 입력해주세요."
        ></input>
        <button className="text-lg-semibold h-12 rounded-[12px] bg-brand-primary">
          만들기
        </button>
      </div>
    </div>
  );
}
