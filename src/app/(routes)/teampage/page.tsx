import TeamSetting from '@/components/pages/teampage/teamSetting/TeamSetting';
import TasksList from '@/components/pages/teampage/taskList/TasksList';
import TaskReport from '@/components/pages/teampage/taskReport/TaskReport';

export default function Page() {
  return (
    <div className="flex flex-col gap-6 py-6">
      <TeamSetting />
      <TasksList />
      <TaskReport />
    </div>
  );
}
