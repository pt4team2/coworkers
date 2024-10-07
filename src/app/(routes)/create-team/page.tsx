'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import useCheckDuplicateTeam from '@/libs/useCheckDuplicateTeam';
import ImageInput from '@/components/pages/teamcreate/ImageInput';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { authAxiosInstance } from '@/app/api/auth/axiosInstance';
import { useRouter } from 'next/navigation';
import useUser from '@/hooks/useUser';

import useSessionStore from '@/store/useSessionStore';

interface IFormData {
  name: string;
  image: string;
}

export default function Page() {
  const { user } = useSessionStore();
  const { userData } = useUser(user?.id);
  const router = useRouter();
  const { isDuplicate, checkDuplicate } = useCheckDuplicateTeam();
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IFormData>();

  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const postCreateTeam = useMutation({
    mutationFn: (formData: IFormData) => {
      return authAxiosInstance.post(`/groups`, formData);
    },
    onSuccess: async (data) => {
      console.log('팀 생성 완료');
      reset();
      setImageUrl(null);

      const newGroupId = data?.data?.id;
      await queryClient.invalidateQueries({ queryKey: ['getUser'] });
      router.push(`/teampage/${newGroupId}`);
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
    console.log(formData);
    postCreateTeam.mutate(formData);
  };

  const isFormDisabled = !isValid || !imageUrl || isDuplicate;
  return (
    <div className="mx-auto mt-[200px] flex w-[343px] flex-col md:w-[460px] lg:w-[460px]">
      <p className="text-2xl-medium m-auto mb-6 md:mb-20 lg:mb-20 lg:text-4xl">
        팀 생성하기
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="text-lg-medium mb-3 block">팀 프로필</label>
        <div className="mb-6">
          <ImageInput imageUrl={imageUrl} setImageUrl={setImageUrl} />
        </div>
        <div className="mb-10">
          <label className="text-lg-medium mb-3 block">팀 이름</label>
          <input
            className={`h-44px ${isDuplicate ? 'border-status-danger' : 'border-border-primary'} w-full rounded-[12px] border border-solid bg-background-secondary px-[16px] py-[13.5px] focus:border-status-brand focus:outline-none focus:ring-status-brand`}
            placeholder="팀 이름을 입력해주세요."
            {...register('name', {
              required: true,
              onChange: (e) => checkDuplicate(e.target.value.trim()),
            })}
          />
          {errors.name && (
            <p className="text-md-medium mt-2 text-text-danger">
              팀 명을 입력해주세요.
            </p>
          )}
          {isDuplicate && (
            <p className="text-md-medium text-text-danger">
              이미 존재하는 이름입니다.
            </p>
          )}
        </div>
        <button
          className={`text-lg-semibold mb-6 h-12 w-full rounded-[12px] ${
            isFormDisabled
              ? 'cursor-not-allowed bg-text-disabled'
              : 'bg-brand-primary'
          }`}
          type="submit"
          disabled={isFormDisabled}
        >
          만들기
        </button>
        <p className="text-md-regular md:text-lg-regular lg:text-lg-regular m-auto text-center">
          팀 이름은 회사명이나 모임 이름 등으로 설정하면 좋아요.
        </p>
      </form>
    </div>
  );
}
