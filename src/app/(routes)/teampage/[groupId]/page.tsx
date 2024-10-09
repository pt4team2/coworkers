'use client';

import { useParams } from 'next/navigation';
import TeamSetting from '@/components/pages/teampage/teamSetting/TeamSetting';
import TasksList from '@/components/pages/teampage/taskList/TasksList';
import TaskReport from '@/components/pages/teampage/taskReport/TaskReport';
import MemberList from '@/components/pages/teampage/memberList/MemberList';
import useUser from '@/hooks/useUser';
import useGroup from '@/hooks/useGroup';
import useSessionStore from '@/store/useSessionStore';
import { PacmanLoader } from 'react-spinners';

export default function Page() {
  const { groupId } = useParams();
  const { user } = useSessionStore();
  const { userData } = useUser(user?.id);
  const { group, isLoading, error } = useGroup(groupId);

  if (isLoading || !group) {
    return (
      <div>
        <PacmanLoader
          color="#10b981"
          cssOverride={{ margin: '150px auto' }}
          size={40}
        />
      </div>
    );
  }
  console.log(group.taskLists);
  return (
    <div className="flex flex-col gap-6 py-6">
      <TeamSetting user={userData} group={group} />
      <div className="flex flex-col gap-12">
        <TasksList taskLists={group.taskLists} groupId={group.id} />
        <TaskReport taskLists={group.taskLists} />
        <MemberList user={userData} group={group} />
      </div>
    </div>
  );
}
