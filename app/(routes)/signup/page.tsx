'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { SIGNUP_SCHEMA } from 'utils/schema';
import FormField from 'components/signup/FormField';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import googleLogo from 'app/assets/icons/googleLogo.svg';
import kakaotalkLogo from 'app/assets/icons/kakaotalkLogo.svg';
import visibility_on from 'app/assets/icons/visibility_on.svg';
import visibility_off from 'app/assets/icons/visibility_off.svg';

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
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <span>회원가입</span>
          <div>
            <div>
              <label htmlFor="nickname">닉네임</label>
              <FormField
                id="nickname"
                type="text"
                placeholder="닉네임을 입력해주세요."
                register={register}
                error={errors.nickname}
              />
            </div>
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
            <div>
              <label htmlFor="passwordConfirm">비밀번호 확인</label>
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
        <button type="submit" disabled={isSubmitting}>
          회원가입
        </button>
      </form>
      <div>
        <div>
          <div></div>
          <span>OR</span>
          <div></div>
        </div>
        <div>
          <span>간편 회원가입하기</span>
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
