import Image from 'next/image';
import XIcon from '@/assets/icons/ic_x2.svg';
import React from 'react';
import ModalPortal from '../ModalPortal/ModalPortal';
import { useAddTaskListModalStore } from '@/store/useAddTaskListModalStore';
import { authAxiosInstance } from '@/app/api/auth/axiosInstance';
import { group } from 'console';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';

interface AddTeamModalProps {
  onClose: () => void;
  groupId: number;
}

interface IFormData {
  name: string;
}
export default function AddTaskListModal({
  onClose,
  groupId,
}: AddTeamModalProps) {
  const { closeModal } = useAddTaskListModalStore();

  const postCreateTaskList = useMutation({
    mutationFn: (formData: IFormData) => {
      return authAxiosInstance.post(`/groups/${groupId}/task-lists`, formData);
    },
    onSuccess: () => {
      console.log('할일 목록 생성 성공');
      closeModal();
      window.location.reload();
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
    if (!data.name) {
      console.error('반드시 입력해야 함');
      return;
    }
    const formData = {
      name: data.name,
    };
    console.log(formData);
    postCreateTaskList.mutate(formData);
  };
  return (
    <ModalPortal onClose={closeModal}>
      <div className="flex w-[384px] flex-col items-center rounded-[12px] bg-background-secondary px-4 pb-10 pt-4">
        <button className="ml-auto" onClick={onClose}>
          <Image width={24} height={24} src={XIcon} alt="엑스 버튼" />
        </button>
        <div className="flex w-[280px] flex-col">
          <p className="text-lg-medium text-center">할 일 목록</p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              className="text-lg-regular mb-6 mt-4 h-12 w-full rounded-[12px] border border-solid border-border-primary border-opacity-10 bg-background-secondary px-[14.5px] py-[16px] text-text-primary active:border-none"
              placeholder="목록 명을 입력해주세요."
              {...register('name', {
                required: true,
              })}
            ></input>

            <button
              type="submit"
              className="text-lg-semibold h-12 w-full rounded-[12px] bg-brand-primary"
            >
              만들기
            </button>
          </form>
        </div>
      </div>
    </ModalPortal>
  );
}
