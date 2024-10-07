import { FieldError, UseFormRegister } from 'react-hook-form';

// 공통
export interface CommonType {
  email: string;
  password: string;
}

// 회원가입
export interface SignUp extends CommonType {
  nickname: string;
  passwordConfirmation: string;
  image?: string;
}

// 로그인
export interface Login extends CommonType {}

// 비밀번호 재설정
export interface ResetPassword {
  password: string;
  passwordConfirmation: string;
  token: string;
}

// 계정 설정 페이지: 비밀번호 재설정
export interface ResetPasswordModal {
  password: string;
  passwordConfirmation: string;
}

// 이메일
export interface Email {
  email: string;
}

// FormField
export interface FormFieldProps {
  id: string;
  type: string;
  placeholder: string;
  trailingIcon?: string;
  onIconClick?: () => void;
  register: UseFormRegister<any>;
  error?: FieldError;
  className?: string;
}

// zustand store
export interface FormStore {
  showPassword: boolean;
  setShowPassword: () => void;
  showPasswordConfirmation: boolean;
  setShowPasswordConfirmation: () => void;
}
