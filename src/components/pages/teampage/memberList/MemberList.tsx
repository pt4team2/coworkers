import MemberCard from './MemberCard';
import { IGroup } from '@/types/Group';
import { useAddMemberModalStore } from '@/store/useAddMemberModalStore';
import PopupOneButton from '@/components/modal/PopupOneButton';
import { IUser } from '@/types/user';
import { useCopyLinkToastStore } from '@/store/useToastStore';
import Toast from '@/components/toast/Toast';
import { useCopyEmailToastStore } from '@/store/useToastStore';

interface GroupProps {
  group: IGroup | undefined;
  user: IUser;
}

export default function MemberList({ group, user }: GroupProps) {
  const { isModalOpen, openModal, closeModal } = useAddMemberModalStore();
  const membersCount = group ? group.members.length : 0;
  const { toastVisible, toastMessage, toastType, openToast, closeToast } =
    useCopyLinkToastStore();
  const { openToast2, toast2Visible, toast2Type, toast2Message, closeToast2 } =
    useCopyEmailToastStore();

  // ADMIN 권한이 있는지 확인
  const isAdmin = group?.members.some(
    (member) => member.role === 'ADMIN' && member.userId === user?.id,
  );

  return (
    <div className="flex flex-col gap-[26px]">
      <div className="flex flex-row justify-between">
        <span className="text-lg-medium flex flex-row gap-2">
          멤버
          <span className="text-lg-regular text-text-default">
            ({membersCount}명)
          </span>
        </span>
        {/* 관리자일 때 */}
        {isAdmin && (
          <button
            onClick={() => openModal()}
            className="text-md-regular text-brand-primary"
          >
            + 새로운 멤버 추가하기
          </button>
        )}
        {isModalOpen && (
          <PopupOneButton
            openToast={openToast}
            title={'멤버 초대'}
            onClose={closeModal}
            description={'그룹에 참여할 수 있는 링크를 복사합니다.'}
            buttonContents={'링크 복사하기'}
            groupId={group?.id}
          />
        )}
      </div>

      <div className="grid w-full grid-flow-row grid-cols-2 place-items-stretch gap-4 md:grid-cols-3 lg:grid-cols-3">
        {group &&
          group.members.map((member) => (
            <MemberCard
              member={member}
              openToast2={openToast2}
              key={member.userId}
            />
          ))}
      </div>
      {toastVisible && (
        <Toast
          message={toastMessage}
          type={toastType}
          closeToast={closeToast}
        />
      )}
      {toast2Visible && (
        <Toast
          message={toast2Message}
          type={toast2Type}
          closeToast={closeToast2}
        />
      )}
    </div>
  );
}
