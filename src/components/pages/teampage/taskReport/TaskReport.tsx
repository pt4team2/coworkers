'use client';
import ProgressBar from './ProgressBar';
import { tasklistMockData } from '@/data/mockData';
import ImgDone from '@/assets/images/img_done.svg';
import ImgTodo from '@/assets/images/img_todo.svg';
import Image from 'next/image';

export default function TaskReport() {
  const allTasks = tasklistMockData.reduce<ITaskList[]>((acc, tasklist) => {
    return acc.concat(tasklist.tasks);
  }, []); // 타입을 명시적으로 지정

  const totalTaskCount = allTasks.length;

  // 완료한 task 개수 계산하는 식
  const doneTasks = allTasks.filter(
    (task: ITaskList) => new Date(task.doneAt) < new Date(task.date),
  );

  const doneTaskCount = doneTasks.length;
  const progressPercent = Math.round((doneTaskCount / totalTaskCount) * 100);

  return (
    <div className="flex flex-col gap-4">
      <span className="text-lg-medium">리포트</span>
      <div className="flex w-full flex-row items-center justify-between rounded-[12px] bg-background-secondary p-6">
        <ProgressBar value={progressPercent} />
        <div className="flex flex-col gap-[4px]">
          <span className="text-md-medium">
            오늘의
            <br />
            진행 상황
          </span>
          <span className="text-[40px] font-bold text-brand-secondary">
            {progressPercent}%
          </span>
        </div>
        {/* 오늘의 할일 */}
        <div className="flex w-2/5 flex-col gap-4">
          <div
            className="flex justify-between rounded-[12px] p-4"
            style={{ backgroundColor: 'var(--color-background-tertiary)' }}
          >
            <div className="flex w-full flex-col">
              <span>오늘의 할 일</span>
              <span className="text-[24px] font-bold text-brand-tertiary">
                {totalTaskCount}개
              </span>
            </div>
            <Image src={ImgTodo} alt="할 일 이미지" />
          </div>
          {/* 한 일 */}
          <div
            className="flex justify-between rounded-[12px] p-4"
            style={{ backgroundColor: 'var(--color-background-tertiary)' }}
          >
            <div className="flex w-full flex-col">
              <span>한 일</span>
              <span className="text-[24px] font-bold text-brand-tertiary">
                {doneTaskCount}개
              </span>
            </div>
            <Image src={ImgDone} alt="한 일 이미지" />
          </div>
        </div>
      </div>
    </div>
  );
}
