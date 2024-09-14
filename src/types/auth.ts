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

// FormField
export interface FormFieldProps {
  id: string;
  type: string;
  placeholder: string;
  trailingIcon?: string;
  onIconClick?: () => void;
  register: UseFormRegister<any>;
  error?: FieldError;
}

// zustand store
export interface FormStore {
  showPassword: boolean;
  setShowPassword: () => void;
  showPasswordConfirmation: boolean;
  setShowPasswordConfirmation: () => void;
}
