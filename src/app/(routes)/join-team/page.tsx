'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import useUser from '@/hooks/useUser';
import { IMembership, IUser } from '@/types/user';
import { useMutation } from '@tanstack/react-query';
import { authAxiosInstance } from '@/app/api/auth/axiosInstance';
import useMemberships from '@/hooks/useMemberships';
import useGroup from '@/hooks/useGroup';

export default function Page() {
  const { data: session } = useSession();
  const { user } = useUser(session?.user.id);
  const router = useRouter();
  const groups = useGroup(user?.id);
  const newTeam = groups.group?.id
  // // 팀 생성 API 요청 함수
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormData>();

  interface IFormData {
    userEmail: string;
    token: string;
  }
  const acceptTeamRequest = useMutation({
    mutationFn: (formData: IFormData) => {
      return authAxiosInstance.post(`/groups/accept-invitation`, formData);
    },
    onSuccess: () => {
      console.log('팀 참여 완료!');
      // TODO: 참여한 팀 페이지로 접속할 수 있도록 라우팅
      // router.push(`teampage/${}`);
    },
    onError: () => (error: any) => {
      console.error('에러 발생', error);
    },
  });

  const onSubmit = (data: IFormData) => {
    if (!data.token) {
      console.error('초대링크를 입력해주세요.');
      console.log(newTeam);
      return;
    }

    const formData = {
      token: data.token,
      userEmail: user.email,
    };

    acceptTeamRequest.mutate(formData);
  };
  return (
    <div className="mx-auto mt-[200px] flex w-[343px] flex-col md:w-[460px] lg:w-[460px]">
      <p className="text-2xl-medium m-auto mb-6 md:mb-20 lg:mb-20 lg:text-4xl">
        팀 참여하기
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p className="text-lg-medium mb-3">팀 링크</p>
        <input
          className="h-44px mb-10 w-full rounded-[12px] border border-solid border-border-primary bg-background-secondary px-[16px] py-[13.5px]"
          placeholder="팀 링크를 입력해주세요."
          {...register('token', {
            required: true,
          })}
        ></input>
        <button
          type="submit"
          className="text-lg-semibold mb-6 h-12 w-full rounded-[12px] bg-brand-primary"
        >
          참여하기
        </button>
      </form>
      <p className="text-md-regular md:text-lg-regular lg:text-lg-regular m-auto">
        공유받은 링크를 입력해 참여할 수 있어요.
      </p>
    </div>
  );
}
