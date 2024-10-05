import { useState } from 'react';
import Image from 'next/image';
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

const ModalTwoButton: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <div>
          <h2 className="mb-4 text-xl font-semibold">비밀번호 재설정</h2>
          <div className="mb-4">비밀번호 재설정 링크를 보내드립니다.</div>
        </div>
        <div>
          <button
            className="rounded-lg bg-blue-500 px-4 py-2 text-white"
            onClick={onClose}
          >
            닫기
          </button>
          <button
            className="rounded-lg bg-blue-500 px-4 py-2 text-white"
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
