import { useState } from 'react';
import Image from 'next/image';
import DangerIcon from '@/assets/icons/ic_alert.svg';
import ModalPortal from '../ModalPortal/ModalPortal';
import { useModalDeleteStore } from '@/store/useModalDeleteStore';
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;

  children?: React.ReactNode;
}

const ModalDanger = ({ isOpen, onClose }: ModalProps) => {
  if (!isOpen) return null;
  const { closeModal: closeDeleteModal } = useModalDeleteStore();

  return (
    <ModalPortal onClose={closeDeleteModal}>
      <div className="relative flex h-[245px] w-[375px] rounded-b-[0px] rounded-t-xl bg-background-secondary md:h-[245px] md:w-96 md:rounded-xl lg:h-[245px] lg:w-96 lg:rounded-xl">
        <div className="mx-auto mb-8 mt-10 flex h-[173px] w-[280px] flex-col items-center justify-between">
          <div className="flex h-[101px] flex-col items-center justify-between">
            <div>
              <Image src={DangerIcon} alt="DangerIcon" width={24} height={24} />
            </div>
            <div className="flex h-[61px] w-[239px] flex-col justify-between">
              <div className="text-lg-medium text-center">
                회원 탈퇴를 진행하시겠어요?
              </div>
              <div className="text-md-medium break-keep text-center">
                그룹장으로 있는 그룹은 자동으로 삭제되고, 모든 그룹에서
                나가집니다.
              </div>
            </div>
          </div>
          <div className="flex h-12 w-full justify-between">
            <button
              className="px-auto w-[136px] rounded-xl border border-text-secondary bg-background-inverse py-3 text-text-default"
              onClick={onClose}
            >
              닫기
            </button>
            <button
              className="px-auto py-auto w-[136px] rounded-xl bg-red-500"
              onClick={onClose}
            >
              회원 탈퇴
            </button>

            {/* 배경컬러가 레드인 것이 없어 수기로 작성 */}
          </div>
        </div>
      </div>
    </ModalPortal>
  );
};

export default ModalDanger;
