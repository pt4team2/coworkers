import TeamSetting from '@/components/pages/teampage/TeamSetting';
import TasksList from '@/components/pages/teampage/TasksList';

export default function Page() {
  return (
    <div className="flex flex-col gap-6 py-6">
      <TeamSetting />
      <TasksList />
    </div>
  );
}
