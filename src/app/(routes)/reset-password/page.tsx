'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { RESET_PASSWORD_SCHEMA } from '@/utils/schema';
import { ResetPassword } from '@/types/auth';
import FormField from '@/components/auth/FormField';
import { resetPasswordFieldData } from '@/hooks/formFieldData';
import { authAxiosInstance } from '@/app/api/auth/axiosInstance';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

export default function ResetPasswordPage() {
  const resetPasswordFields = resetPasswordFieldData();
  const params = useSearchParams();
  const token = params.get('token');
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting, isValid, errors },
  } = useForm<ResetPassword>({
    resolver: yupResolver(RESET_PASSWORD_SCHEMA),
    mode: 'onChange',
  });

  // error 메시지 여부 확인
  const hasErrors = Object.keys(errors).length > 0;

  // 비밀번호 변경
  if (token) {
    setValue('token', token);
  }

  const onSubmit = async (data: ResetPassword) => {
    try {
      await authAxiosInstance.patch('/user/reset-password', {
        password: data.password,
        passwordConfirmation: data.passwordConfirmation,
        token: data.token,
      });
      console.log(data.password);
      console.log(data.passwordConfirmation);
      console.log(token);

      router.push('/login');
    } catch (error) {
      console.error('비밀번호 재설정 실패:', error);
    }
  };

  return (
    <div
      className={`mt-6 flex flex-col items-center md:mt-25-custom lg:mt-35-custom ${hasErrors ? 'gap-6.5-custom md:gap-11.25-custom lg:gap-12.25-custom' : 'gap-6.25-custom md:gap-12.25-custom lg:gap-12'} `}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-85.75-custom flex-col gap-10 md:w-115-custom lg:w-115-custom"
      >
        <div>
          <p className="text-2xl-medium md:text-2xl-medium mb-6 text-center text-text-primary md:mb-20 lg:mb-20 lg:text-4xl">
            비밀번호 재설정
          </p>
          <div className="flex flex-col gap-6">
            {resetPasswordFields.map((field) => (
              <div key={field.id} className="flex flex-col gap-3">
                <label
                  htmlFor={field.id}
                  className="text-lg-medium text-text-primary"
                >
                  {field.id === 'password' ? '새 비밀번호' : '비밀번호 확인'}
                </label>
                <FormField
                  key={field.id}
                  {...field}
                  register={register}
                  error={errors[field.id as keyof ResetPassword]}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <button
            type="submit"
            disabled={isSubmitting || !isValid}
            className={`text-lg-semibold rounded-xl bg-brand-primary py-3.5 text-text-primary ${
              !isValid ? 'cursor-not-allowed bg-text-default opacity-50' : ''
            }`}
          >
            재설정
          </button>
        </div>
      </form>
    </div>
  );
}
