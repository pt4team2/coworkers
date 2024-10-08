import React, { useState, useEffect, useRef } from 'react';
import settingIcon from '@/assets/icons/ic_setting.svg';
import backgroundImg from '@/assets/images/img_teambg.svg';
import Image from 'next/image';
import { IUser } from '@/types/user';
import { IGroup } from '@/types/Group';
import ReviseTeamModal from '@/components/modal/ReviseTeamModal';
import { useReviseTeamModalStore } from '@/store/useReviseTeamModalStore';
import { useDeleteTeamModalStore } from '@/store/useDeleteTeamModalStore';
import TeamDeleteModal from '@/components/modal/TeamDeleteModal';
import Toast from '@/components/toast/Toast';
import { useDeleteTeamToastStore } from '@/store/useToastStore';

interface TeamSettingProps {
  group: IGroup | undefined;
  user: IUser;
}
export default function TeamSetting({ group, user }: TeamSettingProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const toggleDropdown = () => setIsOpen(!isOpen);
  const { isReviseModalOpen, openModal, closeModal } =
    useReviseTeamModalStore();
  const { isDeleteModalOpen, openDeleteModal, closeDeleteModal } =
    useDeleteTeamModalStore();
  const { toastVisible, toastMessage, toastType, openToast, closeToast } =
    useDeleteTeamToastStore();
  const groupId = group?.id;
  const isAdmin = group?.members.some(
    (member) => member.role === 'ADMIN' && member.userId === user?.id,
  );
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (!group) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <div
        className="relative flex h-16 w-full flex-row items-center justify-between gap-8 rounded-2xl border border-solid border-border-primary border-opacity-10 bg-slate-50 bg-opacity-10 px-5 py-6"
        ref={dropdownRef}
      >
        <span className="text-xl-bold">{group.name}</span>

        <Image
          className="absolute right-1/4 ml-auto md:static lg:static"
          src={backgroundImg}
          alt="백그라운드 이미지"
        />
        <div className="relative">
          {isAdmin && (
            <button onClick={toggleDropdown}>
              <Image
                width={24}
                height={24}
                src={settingIcon}
                alt="설정 아이콘"
              />
            </button>
          )}
          {isOpen && (
            <ul className="text-lg-regular absolute right-0 top-5 z-30 mt-2 flex w-[120px] flex-col justify-center gap-[8px] rounded-[12px] border border-background-tertiary bg-background-secondary p-2 text-sm shadow-lg">
              <button
                onClick={() => {
                  openModal();
                  setIsOpen(false);
                }}
              >
                <li className="items-center justify-between rounded-[8px] bg-background-secondary p-2 text-center hover:bg-slate-700">
                  수정하기
                </li>
              </button>
              <button
                onClick={() => {
                  openDeleteModal();
                  setIsDeleteOpen(false);
                }}
              >
                <li className="items-center justify-between rounded-[8px] bg-background-secondary p-2 text-center hover:bg-slate-700">
                  삭제하기
                </li>
              </button>
            </ul>
          )}
        </div>
      </div>
      {isReviseModalOpen && (
        <ReviseTeamModal onClose={closeModal} group={group} />
      )}
      {isDeleteModalOpen && (
        <TeamDeleteModal
          openToast={openToast}
          onClose={closeDeleteModal}
          groupId={groupId}
          user={user}
        />
      )}
      {toastVisible && (
        <Toast
          message={toastMessage}
          type={toastType}
          closeToast={closeToast}
        />
      )}
    </>
  );
}
