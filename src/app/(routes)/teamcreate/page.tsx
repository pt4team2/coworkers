'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import useCheckDuplicateTeam from '@/libs/useCheckDuplicateTeam';
import ImageInput from '@/components/pages/teamcreate/ImageInput';

export default function Page() {
  const { isDuplicate, checkDuplicate } = useCheckDuplicateTeam();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  return (
    <div className="mx-auto mt-[200px] flex w-[343px] flex-col md:w-[460px] lg:w-[460px]">
      <p className="text-2xl-medium m-auto mb-6 md:mb-20 lg:mb-20 lg:text-4xl">
        팀 생성하기
      </p>
      <form onSubmit={handleSubmit((data) => console.log(data))}>
        <label className="text-lg-medium mb-3 block">팀 프로필</label>
        <div className="mb-6">
          <ImageInput imageUrl={imageUrl} setImageUrl={setImageUrl} />
        </div>
        <div className="mb-10">
          <label className="text-lg-medium mb-3 block">팀 이름</label>
          <input
            className={`h-44px ${isDuplicate ? 'border-text-danger' : 'border-border-primary'} mb-2 w-full rounded-[12px] border border-solid bg-background-secondary px-[16px] py-[13.5px] focus:border-none`}
            placeholder="팀 이름을 입력해주세요."
            {...register('teamName', {
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
        <button className="text-lg-semibold mb-6 h-12 w-full rounded-[12px] bg-brand-primary">
          만들기
        </button>
        <p className="text-md-regular md:text-lg-regular lg:text-lg-regular m-auto text-center">
          팀 이름은 회사명이나 모임 이름 등으로 설정하면 좋아요.
        </p>
      </form>
    </div>
  );
}
