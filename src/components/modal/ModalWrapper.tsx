import React, { useRef } from 'react';
import Toast from '../toast/Toast';
import { useModalWrapperToastStore } from '@/store/useToastStore';
import { useModalStore } from '@/store/useModalStore';
import { ModalWrapperProps } from '@/types/modal';

export default function ModalWrapper({ children }: ModalWrapperProps) {
  const { isModalOpen, isSecondModalOpen, closeModal, closeSecondModal } =
    useModalStore();
  const { toastVisible, toastMessage, toastType, closeToast } =
    useModalWrapperToastStore((state) => ({
      toastVisible: state.toastVisible,
      toastMessage: state.toastMessage,
      toastType: state.toastType,
      closeToast: state.closeToast,
    }));

  // 모달 외부 클릭 시 모달 닫기
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      if (isModalOpen) closeModal();
      if (isSecondModalOpen) closeSecondModal?.();
    }
  };

  if (!isModalOpen && !isSecondModalOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-end justify-center bg-black bg-opacity-50 md:items-center lg:items-center"
      onClick={handleClickOutside}
    >
      <div
        className="relative w-93.75-custom rounded-t-xl bg-background-secondary px-4 pb-8 pt-4 shadow-lg md:w-96-custom md:rounded-xl lg:w-96-custom lg:rounded-xl"
        ref={modalRef}
      >
        {React.cloneElement(children, {
          openToast: useModalWrapperToastStore.getState().openToast,
        })}
      </div>
      {/* Toast 컴포넌트 렌더링 */}
      {toastVisible && (
        <Toast
          message={toastMessage}
          type={toastType}
          closeToast={closeToast}
        />
      )}
    </div>
  );
}
