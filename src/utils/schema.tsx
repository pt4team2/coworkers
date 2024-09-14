import * as yup from 'yup';

// 공통 스키마
export const COMMON_SCHEMA = yup.object().shape({
  email: yup
    .string()
    .required('이메일은 필수 입력입니다.')
    .email('이메일 형식으로 작성해 주세요.')
    .matches(
      /^[A-Za-z0-9_-]{2,}@[A-Za-z0-9.-]+\.(?:[A-Za-z]{2}\.[A-Za-z]{2,}|[A-Za-z]{3,})$/,
      '이메일 형식으로 작성해 주세요.',
    ),
  password: yup
    .string()
    .required('비밀번호는 필수 입력입니다.')
    .min(8, '비밀번호는 최소 8자 이상입니다.')
    .matches(
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9])/,
      '영문, 숫자, 특수문자(!@#$%^&*)를 모두 포함해야 합니다.',
    ),
});

// 로그인 스키마
export const LOGIN_SCHEMA = COMMON_SCHEMA;

// 회원가입 스키마
export const SIGNUP_SCHEMA = COMMON_SCHEMA.concat(
  yup.object().shape({
    nickname: yup
      .string()
      .required('닉네임은 필수 입력입니다.')
      .min(2, '최소 2자 이상 입력해 주세요.')
      .max(20, '닉네임은 최대 20자까지 가능합니다.')
      .matches(/^[가-힣a-zA-Z]+$/, '유효한 이름이 아닙니다.'),
    passwordConfirmation: yup
      .string()
      .required('비밀번호 확인을 입력해 주세요.')
      .min(8, '비밀번호는 최소 8자 이상입니다.')
      .test(
        'password-match',
        '비밀번호가 일치하지 않습니다.',
        function (value) {
          return value === this.parent.password || !value;
        },
      ),
    image: yup
      .string()
      .matches(/^https?:\/\/.+/, '유효한 이미지 형식이 아닙니다.'),
  }),
);

// 비밀번호 재설정 스키마
export const RESET_PASSWORD_SCHEMA = yup.object().shape({
  password: yup
    .string()
    .required('비밀번호를 입력해주세요.')
    .min(8, '비밀번호는 최소 8자 이상입니다.')
    .matches(
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9])/,
      '영문, 숫자, 특수문자(!@#$%^&*)를 모두 포함해야 합니다.',
    ),
  passwordConfirmation: yup
    .string()
    .required('비밀번호를 입력해주세요.')
    .min(8, '비밀번호는 최소 8자 이상입니다.')
    .test('password-match', '비밀번호가 일치하지 않습니다.', function (value) {
      return value === this.parent.password || !value;
    }),
  token: yup.string().required('유효하지 않은 토큰입니다.'),
});
