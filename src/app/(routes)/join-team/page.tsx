'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import useUser from '@/hooks/useUser';
import { useMutation } from '@tanstack/react-query';
import { authAxiosInstance } from '@/app/api/auth/axiosInstance';
import useGroup from '@/hooks/useGroup';
import useSessionStore from '@/store/useSessionStore';

export default function Page() {
  const { user } = useSessionStore();
  const { userData } = useUser(user?.id);
  const router = useRouter();
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
    onSuccess: async (data) => {
      console.log('팀 참여 완료!');
      const joinGroupId = data?.data?.groupId;
      router.push(`teampage/${joinGroupId}`);
    },
    onError: () => (error: any) => {
      console.error('에러 발생', error);
    },
  });

  const onSubmit = (data: IFormData) => {
    if (!data.token) {
      console.error('초대링크를 입력해주세요.');
      return;
    }

    const formData = {
      token: data.token,
      userEmail: userData.email,
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
          className="h-44px mb-10 w-full rounded-[12px] border border-solid border-border-primary bg-background-secondary px-[16px] py-[13.5px] focus:border-status-brand focus:outline-none focus:ring-status-brand"
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
        공유받은 팀 링크를 입력해 참여할 수 있어요.
      </p>
    </div>
  );
}
