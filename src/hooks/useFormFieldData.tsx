import { useFormStore } from '@/store/useFormStore';
import visibility_on from '@/assets/icons/visibility_on.svg';
import visibility_off from '@/assets/icons/visibility_off.svg';

export const useSignUpFieldData = () => {
  const {
    showPassword,
    setShowPassword,
    showPasswordConfirmation,
    setShowPasswordConfirmation,
  } = useFormStore();

  function togglePasswordVisibility() {
    setShowPassword();
  }

  function togglePasswordConfirmationVisibility() {
    setShowPasswordConfirmation();
  }

  return [
    { id: 'nickname', type: 'text', placeholder: '닉네임을 입력해주세요.' },
    { id: 'email', type: 'email', placeholder: '이메일을 입력해주세요.' },
    {
      id: 'password',
      type: showPassword ? 'text' : 'password',
      placeholder: '비밀번호를 입력해주세요.',
      trailingIcon: showPassword ? visibility_off : visibility_on,
      onIconClick: togglePasswordVisibility,
    },
    {
      id: 'passwordConfirmation',
      type: showPasswordConfirmation ? 'text' : 'password',
      placeholder: '비밀번호를 다시 한 번 입력해주세요.',
      trailingIcon: showPasswordConfirmation ? visibility_off : visibility_on,
      onIconClick: togglePasswordConfirmationVisibility,
    },
  ];
};

export const useLoginFieldData = () => {
  const { showPassword, setShowPassword } = useFormStore();

  function togglePasswordVisibility() {
    setShowPassword();
  }

  return [
    { id: 'email', type: 'email', placeholder: '이메일을 입력해주세요.' },
    {
      id: 'password',
      type: showPassword ? 'text' : 'password',
      placeholder: '비밀번호를 입력해주세요.',
      trailingIcon: showPassword ? visibility_off : visibility_on,
      onIconClick: togglePasswordVisibility,
    },
  ];
};