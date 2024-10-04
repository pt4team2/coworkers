//TODO: 이미지 input 컴포넌트 만들기, 리액트 훅폼 사용해서 데이터 전송하기
//이미지를 업로드하면 url 변환하는 데이터 요청 필요

'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSession } from 'next-auth/react';
import useGroup from '@/hooks/useGroup';
import useUser from '@/hooks/useUser';
import { IGroup } from '@/types/Group';
import { IMembership, IUser } from '@/types/user';
import useMemberships from '@/hooks/useMemberships';

export default function Page() {
  const { data: session } = useSession();
  const { user }: { user: IUser } = useUser(session?.user.id);
  const membership = useMemberships(user?.id);
  const joinGroups = membership.memberships?.map(
    (membership: IMembership) => membership.group.name,
  );

  console.log(joinGroups);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isDuplicate, setIsDuplicate] = useState(false);

  const checkDuplicate = (teamName: string) => {
    if (
      teamName &&
      joinGroups.some((existTeamName: string) => existTeamName === teamName)
    ) {
      setIsDuplicate(true);
    } else {
      setIsDuplicate(false);
    }
  };

  return (
    <div className="mx-auto mt-[200px] flex w-[343px] flex-col md:w-[460px] lg:w-[460px]">
      <p className="text-2xl-medium m-auto mb-6 md:mb-20 lg:mb-20 lg:text-4xl">
        팀 생성하기
      </p>
      {/*폼 데이터 전송하기 / 이미지, 팀 이름*/}
      <form onSubmit={handleSubmit((data) => console.log(data))}>
        <label className="text-lg-medium mb-3 block">팀 프로필</label>
        <p className="mb-6">이미지 업로드</p>
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
        <p className="text-center text-md-regular md:text-lg-regular lg:text-lg-regular m-auto">
          팀 이름은 회사명이나 모임 이름 등으로 설정하면 좋아요.
        </p>
      </form>
    </div>
  );
}
