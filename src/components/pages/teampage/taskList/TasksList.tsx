import Task from './Task';
import { IGroup, TaskList } from '@/types/Group';
// import useTasks from '@/hooks/useTasks';

interface TaskListProps {
  taskLists: IGroup;
  groupId: any
}

export default function TasksList({ taskLists }: TaskListProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-2">
        <span className="text-lg-medium">할 일 목록</span>
        <span className="mr-auto text-lg text-text-default">
          {' '}
          ({taskLists.taskLists.length}개)
        </span>
        <button className="text-md-regular text-brand-primary">
          + 새로운 목록 추가하기
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {taskLists.taskLists.map((tasklist: any) => (
          <Task key={tasklist.id} tasklist={tasklist} />
        ))}
      </div>
    </div>
  );
}
