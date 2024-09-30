import MemberCard from './MemberCard';
import { IGroup } from '@/types/Group';
import { useAddMemberModalStore } from '@/store/useAddMemberModalStore';
import PopupOneButton from '@/components/modal/PopupOneButton';

interface GroupProps {
  group: IGroup | undefined;
}

export default function MemberList({ group }: GroupProps) {
  const { isModalOpen, openModal, closeModal } = useAddMemberModalStore();
  const membersCount = group ? group.members.length : 0;
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
        <button
          onClick={() => openModal()}
          className="text-md-regular text-brand-primary"
        >
          + 새로운 멤버 추가하기
        </button>
        {isModalOpen && (
          <PopupOneButton
            title={'멤버 초대'}
            onClose={closeModal}
            description={'그룹에 참여할 수 있는 링크를 복사합니다.'}
            buttonContents={'링크 복사하기'}
          />
        )}
      </div>

      <div className="grid w-full grid-flow-row grid-cols-2 place-items-stretch gap-4 md:grid-cols-3 lg:grid-cols-3">
        {group &&
          group.members.map((member) => (
            <MemberCard member={member} key={member.userId} />
          ))}
      </div>
    </div>
  );
}
