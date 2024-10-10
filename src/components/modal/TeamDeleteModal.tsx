'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ModalPortal from '../ModalPortal/ModalPortal';

import { useDeleteTeamModalStore } from '@/store/useDeleteTeamModalStore';
import { useMutation } from '@tanstack/react-query';
import { authAxiosInstance } from '@/app/api/auth/axiosInstance';
import { redirect } from 'next/navigation';
import { IMembership, IUser } from '@/types/user';
import useMemberships from '@/hooks/useMemberships';
import { useQueryClient } from '@tanstack/react-query';

interface ModalProps {
  onClose: () => void;
  groupId: number | undefined;
  user: IUser;
  openToast: (message: string, type: 'success' | 'error') => void;
}

export default function TeamDeleteModal({
  openToast,
  onClose,
  groupId,
  user,
}: ModalProps) {
  const { closeDeleteModal } = useDeleteTeamModalStore();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const membership = useMemberships(user.id);
  const joinGroups = membership.memberships?.map(
    (membership: IMembership) => membership.group.id,
  );
  const queryClient = useQueryClient();
  //가입한 팀 중에 랜덤으로 Id 값 가져오기

  const randomGroupId =
    joinGroups && joinGroups.length > 0
      ? joinGroups[Math.floor(Math.random() * joinGroups.length)]
      : undefined;

  console.log('랜덤그룹아이디', randomGroupId);

  //팀 삭제 데이터 처리

  const deleteTeamMutation = useMutation({
    mutationFn: () => {
      if (groupId) {
        return authAxiosInstance.delete(`/groups/${groupId}`);
      } else {
        return Promise.reject('Group ID is undefined');
      }
    },
    onSuccess: async (data) => {
      console.log('팀 삭제 성공');
      openToast('팀 삭제 성공!', 'success');

      closeDeleteModal();

      await queryClient.invalidateQueries({ queryKey: ['getUser'] });
      // setTimeout(() => {
      //   window.location.reload();
      // }, 1500);
      setTimeout(() => {
        if (joinGroups && joinGroups.length > 0) {
          router.push(`/teampage/${joinGroups[0]}`);
        } else {
          router.push('/no-team');
        }
      }, 1500);
    },
    onError: (error: any) => {
      console.error('팀 삭제 실패', error);
      openToast('팀 삭제 실패', 'error');
    },
  });

  const handleDeleteClick = () => {
    deleteTeamMutation.mutate();
  };
  return (
    <ModalPortal onClose={closeDeleteModal}>
      <div className="flex h-[200px] w-[375px] flex-col items-center justify-center rounded-b-[0px] rounded-t-[24px] bg-background-secondary p-4 md:w-96 md:rounded-[12px] lg:w-96 lg:rounded-[12px]">
        <div className="flex w-[280px] flex-col justify-center">
          <div className="flex flex-col justify-between">
            <div className="text-lg-medium mb-2 text-center text-text-primary">
              팀 삭제
            </div>
            <p className="text-md-medium mb-6 text-center text-text-secondary">
              팀을 삭제하시면 복구할 수 없습니다.
              <br />
              정말 삭제하시겠습니까?
            </p>
            <div className="flex flex-row justify-between">
              <button
                onClick={closeDeleteModal}
                className="text-lg-semibold w-[130px] rounded-2xl bg-background-inverse px-[14px] py-[14px] text-text-default"
              >
                취소
              </button>
              <button
                onClick={handleDeleteClick}
                className="text-lg-semibold w-[130px] rounded-2xl bg-text-danger px-[14px] py-[14px] text-text-inverse"
              >
                삭제
              </button>
            </div>
          </div>
        </div>
      </div>
    </ModalPortal>
  );
}
