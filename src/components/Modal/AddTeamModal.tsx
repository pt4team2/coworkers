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

interface AddTeamModalProps {
  onClose: () => void;
}
export default function AddTeamModal({ onClose }: AddTeamModalProps) {
  const { data: session } = useSession();
  const { user }: { user: IUser } = useUser(session?.user.id);
  const membership = useMemberships(user?.id);
  const joinGroups = membership.memberships?.map(
    (membership: IMembership) => membership.group.name,
  );

  console.log(joinGroups);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isDuplicate, setIsDuplicate] = useState(false);

  const checkDuplicate = (teamName: string) => {
    if (
      teamName &&
      joinGroups.some((existTeamName: string) => existTeamName === teamName)
    ) {
      setIsDuplicate(true);
    } else {
      setIsDuplicate(false);
    }
  };
  const { closeModal } = useAddTeamModalStore();
  return (
    <ModalPortal onClose={closeModal}>
      <div className="flex w-[384px] flex-col items-center rounded-[12px] bg-background-secondary px-4 pb-10 pt-4">
        <button className="ml-auto mr-[9px]" onClick={onClose}>
          <Image width={24} height={24} src={XIcon} alt="엑스 버튼" />
        </button>
        <div className="flex w-[280px] flex-col">
          <p className="text-lg-medium text-center">팀 이름</p>
          {/* <input
            className="text-lg-regular mb-6 mt-4 h-12 w-full rounded-[12px] border border-solid border-border-primary border-opacity-10 bg-background-secondary px-[14.5px] py-[16px] text-text-primary active:border-none"
            placeholder="팀 이름을 입력해주세요"
          ></input> */}
          <input
            className={`h-44px ${isDuplicate ? 'border-text-danger' : 'border-border-primary'} mb-2 mt-4 w-full rounded-[12px] border border-solid bg-background-secondary px-[14.5px] py-[16px] focus:border-none`}
            placeholder="팀 이름을 입력해주세요."
            {...register('teamName', {
              required: true,
              onChange: (e) => checkDuplicate(e.target.value.trim()),
            })}
          />
          {isDuplicate && (
            <p className="text-md-medium text-text-danger">
              이미 존재하는 이름입니다.
            </p>
          )}
          <button className="text-lg-semibold mt-6 h-12 rounded-[12px] bg-brand-primary">
            추가하기
          </button>
        </div>
      </div>
    </ModalPortal>
  );
}
