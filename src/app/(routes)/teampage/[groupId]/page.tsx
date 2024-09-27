'use client';

import { useParams } from 'next/navigation';
import TeamSetting from '@/components/pages/teampage/teamSetting/TeamSetting';
import TasksList from '@/components/pages/teampage/taskList/TasksList';
import TaskReport from '@/components/pages/teampage/taskReport/TaskReport';
import MemberList from '@/components/pages/teampage/memberList/MemberList';
import useUser from '@/hooks/useUser';
import { useSession } from 'next-auth/react';
import useGroup from '@/hooks/useGroup';
// import useMemberships from '@/hooks/useMemberships';

export default function Page() {
  const { groupId } = useParams();
  const { data: session } = useSession();
  const { user } = useUser(session?.user.id);
  const { group } = useGroup(groupId);

  return (
    <div className="flex flex-col gap-6 py-6">
      <TeamSetting group={group} />
      <div className="flex flex-col gap-12">
        <TasksList taskLists={group || {taskLists: []}} />
        <TaskReport />
        <MemberList group={group} />
      </div>
    </div>
  );
}
