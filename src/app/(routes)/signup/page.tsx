'use client';

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { SIGNUP_SCHEMA } from '@/utils/schema';
import { SignUp } from '@/types/auth';
import FormField from '@/components/auth/FormField';
import { signUpFieldData } from '@/hooks/formFieldData';
import { publicAxiosInstance } from '@/app/api/auth/axiosInstance';
import { loginStore } from '@/store/loginStore';
import { useRouter } from 'next/navigation';
import OAuthLogin from '@/components/auth/OAuthLogin';
import useSessionStore from '@/store/useSessionStore';
import { useSignupToastStore } from '@/store/useToastStore';
import Toast from '@/components/toast/Toast';

export default function SignUpPage() {
  const signUpFields = signUpFieldData();

  // 세션 존재 시 홈 화면으로 리다이렉트
  const router = useRouter();

  // Zustand에서 세션 가져오기
  const { user, accessToken } = useSessionStore((state) => state);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isValid, errors },
  } = useForm<SignUp>({
    resolver: yupResolver(SIGNUP_SCHEMA),
    mode: 'onChange',
  });

  // error 메시지 여부 확인
  const hasErrors = Object.keys(errors).length > 0;

  const { setEmail, setPassword, signInUser } = loginStore();

  // 토스트
  const { toastVisible, toastMessage, toastType, openToast, closeToast } =
    useSignupToastStore();

  const onSubmit = async (data: SignUp) => {
    try {
      // 회원가입
      const response = await publicAxiosInstance.post('/auth/signUp', {
        nickname: data.nickname,
        email: data.email,
        password: data.password,
        passwordConfirmation: data.passwordConfirmation,
      });

      if (response.status === 201) {
        openToast('회원가입이 완료되었습니다.', 'success');

        // 로그인
        setEmail(data.email);
        setPassword(data.password);

        const loginResult = await signInUser();
      }
    } catch (error: any) {
      if (error.status === 400) {
        openToast('닉네임 또는 이메일이 이미 존재합니다.', 'error');
      } else {
        openToast('회원가입에 실패했습니다.', 'error');
      }
    }
  };

  useEffect(() => {
    if (user && accessToken) {
      setTimeout(() => {
        router.push('/');
      }, 1500);
    }
  }, [user, accessToken, router]);

  return (
    <div
      className={`mt-6 flex flex-col items-center ${
        hasErrors ? 'gap-6.75-custom' : 'gap-6.25-custom'
      } md:mt-25-custom md:gap-12.25-custom lg:mt-25-custom ${hasErrors ? 'lg:gap-10.5-custom' : 'lg:gap-12'}`}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-85.75-custom flex-col gap-10 md:w-115-custom lg:w-115-custom"
      >
        <div>
          <p className="text-2xl-medium mb-6 text-center text-text-primary md:mb-20 lg:mb-20 lg:text-4xl">
            회원가입
          </p>
          <div className="flex flex-col gap-6">
            {signUpFields.map((field) => (
              <div key={field.id} className="flex flex-col gap-3">
                <label
                  htmlFor={field.id}
                  className="text-lg-medium text-text-primary"
                >
                  {field.id === 'nickname'
                    ? '닉네임'
                    : field.id === 'email'
                      ? '이메일'
                      : field.id === 'password'
                        ? '비밀번호'
                        : '비밀번호 확인'}
                </label>
                <FormField
                  key={field.id}
                  {...field}
                  register={register}
                  error={errors[field.id as keyof SignUp]}
                />
              </div>
            ))}
          </div>
        </div>
        <button
          type="submit"
          disabled={isSubmitting || !isValid}
          className={`text-lg-semibold rounded-xl bg-brand-primary py-3.5 text-text-primary ${
            !isValid ? 'cursor-not-allowed bg-text-default opacity-50' : ''
          }`}
        >
          회원가입
        </button>
      </form>
      <OAuthLogin label="간편 회원가입하기" isItemsCenter={true} />

      {/* Toast 렌더링 */}
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
