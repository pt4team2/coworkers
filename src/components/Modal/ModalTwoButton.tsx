import { useState } from 'react';
import Image from 'next/image';
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

const ModalTwoButton = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="relative flex h-64 w-[375px] rounded-b-[0px] rounded-t-xl bg-background-secondary md:h-[260px] md:w-96 md:rounded-xl lg:h-[260px] lg:w-96 lg:rounded-xl">
      <div className="md:h-45 lg:h-45 mx-auto mb-8 mt-12 flex h-44 w-[280px] flex-col items-center justify-between">
        <div className="flex h-[104px] w-full flex-col justify-between md:h-[108px] lg:h-[108px]">
          <div className="flex h-11 flex-col justify-between">
            <h2 className="text-lg-medium text-center">비밀번호 재설정</h2>
            <div className="text-md-medium text-center">
              비밀번호 재설정 링크를 보내드립니다.
            </div>
          </div>
          <input
            className="h-11 rounded-xl border border-solid border-[#F8FAFC] border-opacity-10 bg-background-secondary text-center text-text-default md:h-12 lg:h-12"
            placeholder="이메일을 입력하세요."
          />
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

export default ModalTwoButton;
