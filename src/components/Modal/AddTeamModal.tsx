import Image from 'next/image';
import XIcon from '@/assets/icons/ic_x2.svg';
import React, { useState } from 'react';
import ModalPortal from '../ModalPortal/ModalPortal';
import { useAddTeamModalStore } from '@/store/useAddTeamModalStore';
import { useForm } from 'react-hook-form';
import ImageInput from '../pages/teamcreate/ImageInput';
import useCheckDuplicateTeam from '@/libs/useCheckDuplicateTeam';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authAxiosInstance } from '@/app/api/auth/axiosInstance';
import { useRouter } from 'next/navigation';

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
  const queryClient = useQueryClient();
  const router = useRouter();
  {
    /* mutation 함수 생성 */
  }
  const postCreateTeam = useMutation({
    mutationFn: (formData: IFormData) => {
      return authAxiosInstance.post(`/groups`, formData);
    },
    onSuccess: async (data) => {
      console.log('팀 생성 완료');
      setImageUrl(null);
      closeModal();

      const newGroupId = data?.data?.id;
      await queryClient.invalidateQueries({ queryKey: ['getUser'] });
      router.push(`/teampage/${newGroupId}`);
    },
    onError: () => (error: any) => {
      console.error('에러 발생', error);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IFormData>({
    mode: 'onChange',
  });

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

  const isFormDisabled = !isValid || !imageUrl || isDuplicate;

  return (
    <ModalPortal onClose={closeModal}>
      <div className="flex w-[384px] flex-col items-center rounded-[12px] bg-background-secondary px-4 pb-10 pt-4">
        <button className="ml-auto mr-[9px]" onClick={onClose}>
          <Image width={24} height={24} src={XIcon} alt="엑스 버튼" />
        </button>
        <div className="flex w-[280px] flex-col">
          <p className="text-xl-semibold mb-6 w-full text-center">새로운 팀</p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="text-md-medium block">팀 이름</label>
              <input
                className={`h-44px ${isDuplicate ? 'border-text-danger ring-1 ring-status-danger' : 'border-border-primary'} mb-2 mt-4 w-full rounded-[12px] border border-solid bg-background-secondary px-[14.5px] py-[16px] focus:border-status-brand focus:outline-none focus:ring-1 focus:ring-status-brand`}
                placeholder="팀 이름을 입력해주세요."
                {...register('name', {
                  required: true,
                  onChange: (e) => checkDuplicate(e.target.value.trim()),
                })}
              />
              {errors.name && (
                <p className="text-md-medium mt-2 text-text-danger">
                  팀 명을 입력해주세요.
                </p>
              )}
              {isDuplicate && (
                <p className="text-md-medium mb-6 text-text-danger">
                  이미 존재하는 이름입니다.
                </p>
              )}
            </div>
            <div className="mb-4 mt-4">
              <label className="text-md-medium mb-4 block">팀 이미지</label>
              <ImageInput imageUrl={imageUrl} setImageUrl={setImageUrl} />
              {!imageUrl && (
                <p className="text-md-medium mt-2 text-text-danger">
                  이미지는 필수입니다.
                </p>
              )}
            </div>
            <button
              className={`text-lg-semibold mt-6 h-12 w-full rounded-[12px] ${
                isFormDisabled
                  ? 'cursor-not-allowed bg-text-disabled'
                  : 'bg-brand-primary'
              }`}
              type="submit"
              disabled={isFormDisabled}
            >
              추가하기
            </button>
          </form>
        </div>
      </div>
    </ModalPortal>
  );
}
