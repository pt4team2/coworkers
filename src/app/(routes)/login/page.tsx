'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LOGIN_SCHEMA } from '@/utils/schema';
import { Login } from '@/types/auth';
import FormField from '@/components/signup/FormField';
import Link from 'next/link';
import Image from 'next/image';
import googleLogo from '@/assets/icons/googleLogo.svg';
import kakaotalkLogo from '@/assets/icons/kakaotalkLogo.svg';
import visibility_on from '@/assets/icons/visibility_on.svg';
import visibility_off from '@/assets/icons/visibility_off.svg';

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isValid, errors },
  } = useForm<Login>({
    resolver: yupResolver(LOGIN_SCHEMA),
    mode: 'onChange',
  });

  // 비밀번호 표시
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // error 메시지 여부 확인
  const hasErrors = Object.keys(errors).length > 0;

  const onSubmit = (data: Login) => {
    console.log(data);
  };

  return (
    <div
      className={`mt-6 flex flex-col items-center lg:mt-35-custom ${hasErrors ? 'md:mt-30-custom' : 'md:mt-25-custom'} ${hasErrors ? 'gap-6.5-custom md:gap-11.25-custom lg:gap-12.25-custom' : 'gap-6.25-custom md:gap-12.25-custom lg:gap-12'} `}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-85.75-custom flex-col gap-10 md:w-115-custom lg:w-115-custom"
      >
        <div>
          <p className="text-2xl-medium md:text-2xl-medium mb-6 text-center text-text-primary md:mb-20 lg:mb-20 lg:text-4xl">
            로그인
          </p>
          <div className="flex flex-col gap-6">
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
          </div>
          <Link
            href="#"
            className="text-md-medium-alt md:text-lg-medium-alt lg:text-lg-medium-alt mt-3 flex flex-col text-end text-brand-primary underline"
          >
            비밀번호를 잊으셨나요?
          </Link>
        </div>
        <div className="flex flex-col gap-6">
          <button
            type="submit"
            disabled={isSubmitting || !isValid}
            className={`text-lg-semibold rounded-xl bg-brand-primary py-3.5 text-text-primary ${
              !isValid ? 'cursor-not-allowed bg-text-default opacity-50' : ''
            }`}
          >
            로그인
          </button>
          <div className="text-md-medium md:text-lg-medium lg:text-lg-medium flex justify-center gap-3">
            <span className="text-text-primary">아직 계정이 없으신가요?</span>
            <Link href="/signup" className="text-status-brand underline">
              가입하기
            </Link>
          </div>
        </div>
      </form>
      <div className="flex w-85.75-custom flex-col items-center gap-4 md:w-115-custom lg:w-115-custom">
        <div className="flex w-full items-center text-text-primary">
          <div className="h-px flex-grow bg-border-tertiary"></div>
          <span className="text-lg-medium md:text-lg-regular lg:text-lg-regular mx-6 text-text-inverse">
            OR
          </span>
          <div className="h-px flex-grow bg-border-tertiary"></div>
        </div>
        <div className="flex w-full justify-between">
          <span className="text-lg-medium text-white">간편 로그인하기</span>
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
