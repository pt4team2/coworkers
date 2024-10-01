'use client';

import { useParams } from 'next/navigation';
import TeamSetting from '@/components/pages/teampage/teamSetting/TeamSetting';
import TasksList from '@/components/pages/teampage/taskList/TasksList';
import TaskReport from '@/components/pages/teampage/taskReport/TaskReport';
import MemberList from '@/components/pages/teampage/memberList/MemberList';
import useUser from '@/hooks/useUser';
import { useSession } from 'next-auth/react';
import useGroup from '@/hooks/useGroup';

export default function Page() {
  const { groupId } = useParams();
  const { data: session } = useSession();
  const { user } = useUser(session?.user.id);
  const { group, isLoading, error } = useGroup(groupId);

  if (isLoading || !group) {
    return <div>Loading...</div>;
  }
  console.log(group.taskLists);
  return (
    <div className="flex flex-col gap-6 py-6">
      <TeamSetting user={user} group={group} />
      <div className="flex flex-col gap-12">
        <TasksList taskLists={group.taskLists} groupId={group.id}/>
        <TaskReport taskLists={group.taskLists} />
        <MemberList group={group} />
      </div>
    </div>
  );
}
