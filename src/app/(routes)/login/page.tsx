'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LOGIN_SCHEMA } from '@/utils/schema';
import FormField from '@/components/signup/FormField';
import Link from 'next/link';
import Image from 'next/image';
import googleLogo from '@/assets/icons/googleLogo.svg';
import kakaotalkLogo from '@/assets/icons/kakaotalkLogo.svg';
import visibility_on from '@/assets/icons/visibility_on.svg';
import visibility_off from '@/assets/icons/visibility_off.svg';

type LoginFormData = {
  email: string;
  password: string;
};

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<LoginFormData>({
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

  const onSubmit = (data: LoginFormData) => {
    console.log(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <p>로그인</p>
          <div>
            <div>
              <label htmlFor="email">이메일</label>
              <FormField
                id="email"
                type="email"
                placeholder="이메일을 입력해주세요."
                register={register}
                error={errors.email}
              />
            </div>
            <div>
              <label htmlFor="password">비밀번호</label>
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
          <Link href="#">비밀번호를 잊으셨나요?</Link>
        </div>
        <div>
          <button type="submit" disabled={isSubmitting}>
            로그인
          </button>
          <div>
            <span>아직 계정이 없으신가요?</span>
            <Link href="/signup">가입하기</Link>
          </div>
        </div>
      </form>
      <div>
        <div>
          <div></div>
          <span>OR</span>
          <div></div>
        </div>{' '}
        <div>
          <span>간편 로그인하기</span>
          <div>
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
