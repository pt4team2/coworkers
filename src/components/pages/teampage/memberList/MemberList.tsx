import { groupData } from '@/data/groupData';
import MemberCard from './MemberCard';

export default function MemberList() {
  const membersCount = groupData.members.length;
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
        <button className="text-md-regular text-brand-primary">
          + 새로운 멤버 추가하기
        </button>
      </div>
      <div className="grid w-full grid-flow-row grid-cols-2 place-items-stretch gap-4 md:grid-cols-3 lg:grid-cols-3">
        {groupData.members.map((member) => (
          <MemberCard member={member} key={member.userId} />
        ))}
      </div>
    </div>
  );
}
