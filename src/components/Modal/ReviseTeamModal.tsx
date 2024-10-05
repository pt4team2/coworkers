//TODO: 이미지 input 컴포넌트 만들기, 리액트 훅폼 사용해서 데이터 전송하기
//이미지를 업로드하면 url 변환하는 데이터 요청 필요

'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import ModalPortal from '../ModalPortal/ModalPortal';
import { useReviseTeamModalStore } from '@/store/useReviseTeamModalStore';
import XIcon from '@/assets/icons/ic_x2.svg';
import Image from 'next/image';
import { IGroup } from '@/types/user';
import ImageInput from '@/components/pages/teamcreate/ImageInput';
import useCheckDuplicateTeam from '@/libs/useCheckDuplicateTeam';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authAxiosInstance } from '@/app/api/auth/axiosInstance';
import { QueryClient } from '@tanstack/react-query';

interface ReviseTeamModalProps {
  onClose: () => void;
  group: IGroup;
}

interface IFormData {
  name: string;
  image: string;
}

export default function ReviseTeamModal({
  onClose,
  group,
}: ReviseTeamModalProps) {
  const { closeModal } = useReviseTeamModalStore();
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormData>({
    defaultValues: {
      name: group.name,
      image: group.image,
    },
  });

  const { isDuplicate, checkDuplicate } = useCheckDuplicateTeam();
  const [imageUrl, setImageUrl] = useState<string | null>(group.image);

  const patchTeam = useMutation({
    mutationFn: (formData: IFormData) => {
      return authAxiosInstance.patch(`/groups/${group.id}`, formData);
    },
    onSuccess: async () => {
      console.log('팀 수정 완료');
      await queryClient.invalidateQueries({ queryKey: ['getGroup'] });
      await queryClient.invalidateQueries({ queryKey: ['getUser'] });

      closeModal();
    },
    onError: () => (error: any) => {
      console.error('에러 발생', error);
    },
  });

  const onSubmit = (data: IFormData) => {
    if (!imageUrl) {
      console.error('이미지 필수');
      return;
    }
    const formData = {
      name: data.name,
      image: imageUrl,
    };
    patchTeam.mutate(formData);
  };

  return (
    <ModalPortal onClose={closeModal}>
      <div className="flex flex-col rounded-[12px] bg-background-secondary p-8">
        <button className="ml-auto" onClick={onClose}>
          <Image width={24} height={24} src={XIcon} alt="엑스 버튼" />
        </button>
        <div className="mx-auto flex w-[343px] flex-col md:w-[460px] lg:w-[460px]">
          <p className="text-2xl-semibold mb-10 text-center">팀 수정하기</p>
          {/*폼 데이터 전송하기 / 이미지, 팀 이름*/}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-6">
              <label className="text-lg-medium mb-3 block">팀 프로필</label>
              <ImageInput imageUrl={imageUrl} setImageUrl={setImageUrl} />
            </div>
            <div className="mb-10">
              <label className="text-lg-medium mb-3 block">팀 이름</label>
              <input
                className={`h-44px ${isDuplicate ? 'border-status-danger ring-1 ring-status-danger' : 'border-border-primary'} mb-2 w-full rounded-[12px] border border-solid bg-background-secondary px-[16px] py-[13.5px]  focus:border-status-brand focus:outline-none focus:ring-status-brand`}
                placeholder="팀 이름을 입력해주세요."
                {...register('name', {
                  required: true,
                  onChange: (e) => checkDuplicate(e.target.value.trim()),
                })}
              />
              {isDuplicate && (
                <p className="text-md-medium text-text-danger">
                  이미 존재하는 이름입니다.
                </p>
              )}
            </div>
            <button
              type="submit"
              className="text-lg-semibold mb-6 h-12 w-full rounded-[12px] bg-brand-primary"
            >
              수정하기
            </button>
            <p className="text-md-regular md:text-lg-regular lg:text-lg-regular m-auto text-center text-text-secondary">
              팀 이름은 회사명이나 모임 이름 등으로 설정하면 좋아요.
            </p>
          </form>
        </div>
      </div>
    </ModalPortal>
  );
}
