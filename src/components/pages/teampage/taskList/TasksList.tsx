import { tasklistMockData } from '@/data/mockData';
import Task from './Task';

export default function TasksList() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-2">
        <span className="text-lg-medium">할 일 목록</span>
        <span className="mr-auto text-lg text-text-default">
          {' '}
          ({tasklistMockData.length}개)
        </span>
        <button className="text-md-regular text-brand-primary">
          + 새로운 목록 추가하기
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {tasklistMockData.map((tasklist: any) => (
          <Task key={tasklist.id} tasklist={tasklist} />
        ))}
      </div>
    </div>
  );
}
