'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { RESET_PASSWORD_SCHEMA } from '@/utils/schema';
import FormField from '@/components/auth/FormField';
import visibility_on from '@/assets/icons/visibility_on.svg';
import visibility_off from '@/assets/icons/visibility_off.svg';

type ResetPasswordFormData = {
  newPassword: string;
  newPasswordConfirm: string;
};

export default function ResetPassword() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isValid, errors },
  } = useForm<ResetPasswordFormData>({
    resolver: yupResolver(RESET_PASSWORD_SCHEMA),
    mode: 'onChange',
  });

  // 비밀번호 표시
  const [showNewPassword, setShowNewPassword] = useState(false);
  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  // 비밀번호 확인 표시
  const [showNewPasswordConfirm, setShowNewPasswordConfirm] = useState(false);
  const toggleNewPasswordConfirmVisibility = () => {
    setShowNewPasswordConfirm(!showNewPasswordConfirm);
  };

  // error 메시지 여부 확인
  const hasErrors = Object.keys(errors).length > 0;

  const onSubmit = (data: ResetPasswordFormData) => {
    console.log(data);
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
            <div className="flex flex-col gap-3">
              <label
                htmlFor="password"
                className="text-lg-medium text-text-primary"
              >
                새 비밀번호
              </label>
              <FormField
                id="newPassword"
                type={showNewPassword ? 'text' : 'password'}
                placeholder="비밀번호 (숫자, 영문, 특수문자, 8자 이상)를 입력해주세요."
                trailingIcon={showNewPassword ? visibility_off : visibility_on}
                onIconClick={toggleNewPasswordVisibility}
                register={register}
                error={errors.newPassword}
              />
            </div>
            <div className="flex flex-col gap-3">
              <label
                htmlFor="password"
                className="text-lg-medium text-text-primary"
              >
                비밀번호 확인
              </label>
              <FormField
                id="newPasswordConfirm"
                type={showNewPasswordConfirm ? 'text' : 'password'}
                placeholder="새 비밀번호를 다시 한번 입력해주세요."
                trailingIcon={
                  showNewPasswordConfirm ? visibility_off : visibility_on
                }
                onIconClick={toggleNewPasswordConfirmVisibility}
                register={register}
                error={errors.newPasswordConfirm}
              />
            </div>
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
