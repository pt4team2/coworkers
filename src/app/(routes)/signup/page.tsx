'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { SIGNUP_SCHEMA } from '@/utils/schema';
import FormField from '@/components/signup/FormField';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import googleLogo from '@/assets/icons/googleLogo.svg';
import kakaotalkLogo from '@/assets/icons/kakaotalkLogo.svg';
import visibility_on from '@/assets/icons/visibility_on.svg';
import visibility_off from '@/assets/icons/visibility_off.svg';

type SignupFormData = {
  nickname: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<SignupFormData>({
    resolver: yupResolver(SIGNUP_SCHEMA),
    mode: 'onChange',
  });

  // 비밀번호 표시
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // 비밀번호 확인 표시
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const togglePasswordConfirmVisibility = () => {
    setShowPasswordConfirm(!showPasswordConfirm);
  };

  // error 메시지 여부 확인
  const hasErrors = Object.keys(errors).length > 0;

  const onSubmit = (data: SignupFormData) => {
    console.log(data);
  };

  return (
    <div
      className={`mt-6 flex flex-col items-center md:mt-25-custom ${
        hasErrors ? 'gap-6.75-custom' : 'gap-6.25-custom'
      } md:gap-12.25-custom ${hasErrors ? 'lg:gap-10.5-custom' : 'lg:gap-12'}`}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-85.75-custom flex-col gap-10 md:w-115-custom"
      >
        <div>
          <p className="text-2xl-medium mb-6 text-center text-text-primary md:mb-20 lg:text-4xl">
            회원가입
          </p>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <label
                htmlFor="nickname"
                className="text-lg-medium text-text-primary"
              >
                닉네임
              </label>
              <FormField
                id="nickname"
                type="text"
                placeholder="닉네임을 입력해주세요."
                register={register}
                error={errors.nickname}
              />
            </div>
            <div className="flex flex-col gap-3">
              <label
                htmlFor="email"
                className="text-lg-medium text-text-primary"
              >
                이메일
              </label>
              <FormField
                id="email"
                type="email"
                placeholder="이메일을 입력해주세요."
                register={register}
                error={errors.email}
              />
            </div>
            <div className="flex flex-col gap-3">
              <label
                htmlFor="password"
                className="text-lg-medium text-text-primary"
              >
                비밀번호
              </label>
              <FormField
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="비밀번호를 입력해주세요."
                trailingIcon={showPassword ? visibility_off : visibility_on}
                onIconClick={togglePasswordVisibility}
                register={register}
                error={errors.password}
              />
            </div>
            <div className="flex flex-col gap-3">
              <label
                htmlFor="passwordConfirm"
                className="text-lg-medium text-text-primary"
              >
                비밀번호 확인
              </label>
              <FormField
                id="passwordConfirm"
                type={showPasswordConfirm ? 'text' : 'password'}
                placeholder="비밀번호를 다시 한 번 입력해주세요."
                trailingIcon={
                  showPasswordConfirm ? visibility_off : visibility_on
                }
                onIconClick={togglePasswordConfirmVisibility}
                register={register}
                error={errors.passwordConfirm}
              />
            </div>
          </div>
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="text-lg-semibold rounded-xl bg-brand-primary py-3.5 text-text-primary"
        >
          회원가입
        </button>
      </form>
      <div className="flex w-85.75-custom flex-col items-center gap-4 md:w-115-custom">
        <div className="flex w-full items-center text-text-primary">
          <div className="h-px flex-grow bg-border-tertiary"></div>
          <span className="text-lg-regular mx-4 text-text-inverse">OR</span>
          <div className="h-px flex-grow bg-border-tertiary"></div>
          {/* bg-slate-50 opacity-10 수정 필요 */}
        </div>
        <div className="flex w-full items-center justify-between">
          <span className="text-lg-medium text-text-inverse">
            간편 회원가입하기
          </span>
          <div className="flex gap-4">
            <Link href="#">
              <Image
                src={googleLogo}
                width={42}
                height={42}
                alt="구글로 로그인하기"
              />
            </Link>
            <Link href="#">
              <Image
                src={kakaotalkLogo}
                width={42}
                height={42}
                alt="카카오로 로그인하기"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
