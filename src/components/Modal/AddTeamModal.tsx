import Image from 'next/image';
import XIcon from '@/assets/icons/ic_x2.svg';
import React, { useState } from 'react';
import ModalPortal from '../ModalPortal/ModalPortal';
import { useAddTeamModalStore } from '@/store/useAddTeamModalStore';
import useMemberships from '@/hooks/useMemberships';
import { useSession } from 'next-auth/react';
import { IUser, IMembership } from '@/types/user';
import { useForm } from 'react-hook-form';
import useUser from '@/hooks/useUser';
import ImageInput from '../pages/teamcreate/ImageInput';
import useCheckDuplicateTeam from '@/libs/useCheckDuplicateTeam';
import { useMutation } from '@tanstack/react-query';
import { authAxiosInstance } from '@/app/api/auth/axiosInstance';

interface AddTeamModalProps {
  onClose: () => void;
}

interface IFormData {
  name: string;
  image: string;
}

export default function AddTeamModal({ onClose }: AddTeamModalProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const { isDuplicate, checkDuplicate } = useCheckDuplicateTeam();
  const { closeModal } = useAddTeamModalStore();

  {
    /* mutation 함수 생성 */
  }
  const postCreateTeam = useMutation({
    mutationFn: (formData: IFormData) => {
      return authAxiosInstance.post(`/groups`, formData);
    },
    onSuccess: () => {
      console.log('팀 생성 완료');
      setImageUrl(null);
      closeModal();
    },
    onError: () => (error: any) => {
      console.error('에러 발생', error);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormData>();

  const onSubmit = (data: IFormData) => {
    if (!imageUrl) {
      console.error('이미지 필수');
      return;
    }

    const formData = {
      name: data.name,
      image: imageUrl,
    };
    console.log(formData);
    postCreateTeam.mutate(formData);
  };
  return (
    <ModalPortal onClose={closeModal}>
      <div className="flex w-[384px] flex-col items-center rounded-[12px] bg-background-secondary px-4 pb-10 pt-4">
        <button className="ml-auto mr-[9px]" onClick={onClose}>
          <Image width={24} height={24} src={XIcon} alt="엑스 버튼" />
        </button>
        <div className="flex w-[280px] flex-col">
          <p className="text-xl-semibold mb-6 text-center">새로운 팀</p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="text-md-medium block">팀 이름</label>
              <input
                className={`h-44px ${isDuplicate ? 'border-text-danger' : 'border-border-primary'} mb-2 mt-4 w-full rounded-[12px] border border-solid bg-background-secondary px-[14.5px] py-[16px] focus:border-none`}
                placeholder="팀 이름을 입력해주세요."
                {...register('name', {
                  required: true,
                  onChange: (e) => checkDuplicate(e.target.value.trim()),
                })}
              />
              {isDuplicate && (
                <p className="text-md-medium mb-6 text-text-danger">
                  이미 존재하는 이름입니다.
                </p>
              )}
            </div>
            <div>
              <label className="text-md-medium mb-4 mt-4 block">팀 이미지</label>
              <ImageInput imageUrl={imageUrl} setImageUrl={setImageUrl} />
            </div>
            <button
              className="text-lg-semibold mt-6 h-12 w-full rounded-[12px] bg-brand-primary"
              type="submit"
            >
              추가하기
            </button>
          </form>
        </div>
      </div>
    </ModalPortal>
  );
}
