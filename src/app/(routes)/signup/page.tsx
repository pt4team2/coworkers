'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { SIGNUP_SCHEMA } from '@/utils/schema';
import { SignUp } from '@/types/auth';
import FormField from '@/components/signup/FormField';
import Link from 'next/link';
import Image from 'next/image';
import googleLogo from '@/assets/icons/googleLogo.svg';
import kakaotalkLogo from '@/assets/icons/kakaotalkLogo.svg';
import { useSignUpFieldData } from '@/hooks/useFormFieldData';

export default function SignUpPage() {
  const signUpFields = useSignUpFieldData();
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

  const onSubmit = (data: SignUp) => {
    console.log(data);
  };

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
      <div className="flex w-85.75-custom flex-col items-center gap-4 md:w-115-custom lg:w-115-custom">
        <div className="flex w-full items-center text-text-primary">
          <div className="h-px flex-grow bg-border-tertiary"></div>
          <span className="text-lg-regular mx-6 text-text-inverse">OR</span>
          <div className="h-px flex-grow bg-border-tertiary"></div>
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
