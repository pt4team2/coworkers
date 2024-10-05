import { useState } from 'react';
import Image from 'next/image';
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

const ModalTwoButtonPassword = ({ isOpen, onClose }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="relative flex h-[345px] w-[375px] rounded-b-[0px] rounded-t-xl bg-background-secondary md:h-[353px] md:w-96 md:rounded-xl lg:h-[353px] lg:w-96 lg:rounded-xl">
      <div className="mx-auto mb-8 mt-12 flex w-[280px] flex-col items-center justify-between">
        <div className="flex h-[193px] w-full flex-col justify-between md:h-[201px] lg:h-[201px]">
          <span className="text-lg-medium flex flex-col justify-between text-center">
            비밀번호 변경하기
          </span>

          <div className="flex h-[71px] w-full flex-col justify-between md:h-[75px] lg:h-[75px]">
            <h2 className="text-lg-medium text-text-primary">새 비밀번호</h2>
            <input
              type="password"
              className="text-lg-regular h-11 rounded-xl border-solid border-[#F8FAFC] border-opacity-10 bg-background-secondary pl-4 text-text-default md:h-12 lg:h-12"
              placeholder="새 비밀번호를 입력해주세요."
            />
          </div>
          <div className="flex h-[71px] w-full flex-col justify-between md:h-[75px] lg:h-[75px]">
            <h2 className="text-lg-medium text-text-primary">
              새 비밀번호 확인
            </h2>
            <input
              type="password"
              className="text-lg-regular h-11 rounded-xl border-solid border-[#F8FAFC] border-opacity-10 bg-background-secondary pl-4 text-text-default md:h-12 lg:h-12"
              placeholder="새 비밀번호를 입력해주세요."
            />
          </div>
          {/* border의 컬러의 투명도가 0.1인 것이 없어 이렇게 적용하였습니다. */}
        </div>
        <div className="flex h-12 w-full justify-between">
          <button
            className="px-auto py-auto w-[136px] rounded-xl bg-background-inverse text-brand-primary"
            onClick={onClose}
          >
            닫기
          </button>
          <button
            className="px-auto py-auto w-[136px] rounded-xl border border-brand-primary bg-brand-primary"
            onClick={onClose}
          >
            링크 보내기
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalTwoButtonPassword;
