import React from 'react';
import Toast from '../toast/Toast';
import { useToastStore } from '@/store/useToastStore';
import { useModalStore } from '@/store/useModalStore';
import { ModalWrapperProps } from '@/types/modal';

export default function ModalWrapper({ children }: ModalWrapperProps) {
  const { isModalOpen } = useModalStore();
  const { toastVisible, toastMessage, toastType, closeToast } = useToastStore(
    (state) => ({
      toastVisible: state.toastVisible,
      toastMessage: state.toastMessage,
      toastType: state.toastType,
      closeToast: state.closeToast,
    }),
  );

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        className={`relative rounded-lg bg-background-secondary px-4 pb-8 pt-4 shadow-lg`}
      >
        {React.cloneElement(children, {
          openToast: useToastStore.getState().openToast,
        })}
      </div>
      {/* Toast 컴포넌트 렌더링 */}
      {toastVisible && <Toast message={toastMessage} type={toastType} />}
    </div>
  );
}
