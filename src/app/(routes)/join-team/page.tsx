'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import useUser from '@/hooks/useUser';
import { useMutation } from '@tanstack/react-query';
import { authAxiosInstance } from '@/app/api/auth/axiosInstance';
import useSessionStore from '@/store/useSessionStore';
import { useJoinTeamToastStore } from '@/store/useToastStore';
import Toast from '@/components/toast/Toast';

export default function Page() {
  const { user } = useSessionStore();
  const { userData } = useUser(user?.id);
  const router = useRouter();
  const { toastVisible, toastMessage, toastType, openToast, closeToast } =
    useJoinTeamToastStore();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IFormData>({
    mode: 'onChange',
  });

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
      openToast('팀 참여 성공!', 'success');
      router.push(`teampage/${joinGroupId}`);
    },
    onError: (error: any) => {
      console.error('에러 발생', error);

      // 에러 상태에 따라 다른 처리를 할 수 있습니다
      if (error.response) {
        // 서버 응답이 있는 경우 (예: 4xx, 5xx 에러)
        const statusCode = error.response.status;
        if (statusCode === 400) {
          openToast('이미 소속된 팀입니다', 'error');
        } else if (statusCode === 401) {
          openToast('인증 실패. 다시 로그인해주세요.', 'error');
        } else if (statusCode === 404) {
          openToast('초대가 존재하지 않습니다.', 'error');
        } else if (statusCode === 500) {
          openToast(
            '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
            'error',
          );
        } else {
          openToast('알 수 없는 오류가 발생했습니다.', 'error');
        }
      } else if (error.request) {
        // 요청이 전송되었지만 응답이 없는 경우
        openToast(
          '서버가 응답하지 않습니다. 네트워크를 확인해주세요.',
          'error',
        );
      } else {
        // 그 외 에러 처리
        openToast('에러가 발생했습니다. 다시 시도해주세요.', 'error');
      }
    },
  });

  const onSubmit = (data: IFormData) => {
    if (!data.token) {
      console.error('초대링크를 입력해주세요.');
      openToast('이미 소속된 팀입니다', 'error');
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
        />
        <button
          className={`text-lg-semibold mb-6 h-12 w-full rounded-[12px] ${
            !isValid
              ? 'cursor-not-allowed bg-text-disabled'
              : 'bg-brand-primary'
          }`}
          type="submit"
          disabled={!isValid}
        >
          참여하기
        </button>
      </form>
      <p className="text-md-regular md:text-lg-regular lg:text-lg-regular m-auto">
        공유받은 팀 링크를 입력해 참여할 수 있어요.
      </p>
      {toastVisible && (
        <Toast
          message={toastMessage}
          type={toastType}
          closeToast={closeToast}
        />
      )}
    </div>
  );
}
