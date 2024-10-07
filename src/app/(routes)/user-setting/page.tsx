'use client';

import ImageInput from '@/components/pages/teamcreate/ImageInput';
import IcExit from '@/assets/icons/ic_secession.svg';
import Image from 'next/image';
import useSessionStore from '@/store/useSessionStore';
import useUser from '@/hooks/useUser';
import ChangePassword from '@/components/Modal/ModalTwoButtonPassword';
import DeleteAccountModal from '@/components/Modal/ModalDanger';
import ModalWrapper from '@/components/Modal/ModalWrapper';
import { useModalStore } from '@/store/useModalStore';
import { authAxiosInstance } from '@/app/api/auth/axiosInstance';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import Toast from '@/components/toast/Toast';
import { useUserSettingToastStore } from '@/store/useToastStore';
import { loginStore } from '@/store/loginStore';
import { setTime } from 'react-datepicker/dist/date_utils';

export default function Page() {
  const { user, accessToken } = useSessionStore();
  const userData = useUser(user?.id);

  const router = useRouter();

  // 모달
  const {
    isModalOpen,
    openModal,
    closeModal,
    isSecondModalOpen,
    openSecondModal,
    closeSecondModal,
  } = useModalStore();

  // 토스트
  const { toastVisible, toastMessage, toastType, openToast, closeToast } =
    useUserSettingToastStore();

  // 비밀번호 변경
  const { password } = loginStore();
  console.log('@@@password', password);

  // 회원 탈퇴
  async function handleAccountDeletion() {
    try {
      await authAxiosInstance.delete('/user', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log('회원 탈퇴 성공');
      openToast('성공적으로 탈퇴되었습니다.', 'success');
      setTimeout(() => {
        closeSecondModal?.();
      }, 500);
      setTimeout(() => {
        signOut();
        router.push('/');
      }, 2500);
    } catch (error) {
      console.log('회원 탈퇴 실패', error);
      openToast('탈퇴에 실패했습니다.', 'error');
    }
  }

  // 도메인 확인
  const checkDomain = (email: string | undefined): boolean => {
    if (!email) return false;
    const domain = email.split('@')[1];
    return /^(KAKAO|GOOGLE)/i.test(domain);
  };

  const domain = checkDomain(user?.email);

  return (
    <div className="lg: m-auto max-w-[792px]">
      <p className="text-2lg-bold md:text-xl-bold lg:text-xl-bold mb-6 mt-6 md:mt-6 lg:mt-10">
        계정 설정
      </p>
      {/* <ImageInput imageUrl={imageUrl} setImageUrl={setImageUrl}/> */}
      <div className="mb-6">
        <label className="text-lg-medium mb-3 block">이름</label>
        <input className="text-md-regular md:text-lg-regular lg:text-lg-regular w-full rounded-[12px] border border-solid border-border-primary bg-background-secondary px-[16px] py-[13.5px] focus:border-status-brand focus:outline-none focus:ring-status-brand md:py-[14.5px] lg:py-[14.5px]"></input>
      </div>
      <div className="mb-6">
        <label className="text-lg-medium mb-3 block">이메일</label>
        <input
          className="text-md-regular md:text-lg-regular lg:text-lg-regular w-full cursor-not-allowed rounded-[12px] border border-solid border-border-primary bg-background-tertiary px-[16px] py-[13.5px] text-text-disabled md:py-[14.5px] lg:py-[14.5px]"
          disabled
          placeholder={user?.email}
        />
      </div>
      <div className="mb-6">
        <label className="text-lg-medium mb-3 block">비밀번호</label>
        <div className="relative">
          <input
            type="password"
            className="text-md-regular md:text-lg-regular lg:text-lg-regular w-full cursor-not-allowed rounded-[12px] border border-solid border-border-primary bg-background-tertiary px-[16px] py-[13.5px] text-text-disabled md:py-[14.5px] lg:py-[14.5px]"
            disabled
            value={password ? password : '!asdf1234'}
          />
          <button
            className={`text-sm-semibold absolute right-4 top-[6px] h-8 w-[74px] rounded-[12px] px-[12.5px] py-[6px] md:top-2 lg:top-2 ${!domain ? 'bg-brand-primary' : 'cursor-not-allowed bg-text-default opacity-50'}`}
            onClick={(e) => {
              e.preventDefault();
              openModal();
            }}
            disabled={domain}
          >
            변경하기
          </button>
        </div>
      </div>
      <div className="flex flex-row items-center gap-2">
        <Image width={24} height={24} src={IcExit} alt="탈퇴 아이콘" />
        <button
          onClick={(e) => {
            e.preventDefault();
            if (openSecondModal) {
              openSecondModal();
            }
          }}
        >
          <span className="text-lg-medium text-status-danger">
            회원 탈퇴하기
          </span>
        </button>
      </div>

      {/* 비밀번호 변경 모달 */}
      {isModalOpen && accessToken && (
        <ModalWrapper>
          <ChangePassword
            isOpen={true}
            onClose={closeModal}
            accessToken={accessToken}
          />
        </ModalWrapper>
      )}

      {/* 회원 탈퇴 모달 */}
      {isSecondModalOpen && (
        <ModalWrapper>
          <DeleteAccountModal
            isOpen={true}
            onClose={closeSecondModal}
            onDelete={handleAccountDeletion}
          />
        </ModalWrapper>
      )}

      {/* Toast 렌더링 */}
      {toastVisible && (
        <Toast
          message={toastMessage}
          type={toastType}
          closeToast={closeToast}
        />
      )}
    </div>
  );
}
