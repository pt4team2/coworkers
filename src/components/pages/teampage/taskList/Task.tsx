'use client';

import IcKebab from '@/assets/icons/ic_kebab.svg';
import Image from 'next/image';
import ProgressBar from './ProgressBar';

export default function Task({ tasklist }: { tasklist: any }) {
  const taskCount = tasklist.tasks.length;

  //완료한 task 개수 계산하는 식 //

  const doneTasks = tasklist.tasks.filter(
    (task: any) => new Date(task.doneAt) < new Date(task.date),
  );
  const doneTaskCount = doneTasks.length;
  const progressPercent = (doneTaskCount / taskCount) * 100;
  return (
    <div className="flex w-full items-center justify-between gap-1 rounded-[12px] bg-background-secondary px-6 py-[11.5px]">
      <span className="text-md-medium">{tasklist.name}</span>
      <div className="ml-auto flex h-[25px] w-[58px] flex-row items-center justify-between rounded-[12px] bg-background-primary px-2 py-1">
        <ProgressBar value={progressPercent} />
        <span className="text-md text-brand-primary">
          {doneTaskCount}/{taskCount}
        </span>
      </div>
      <Image src={IcKebab} width={16} height={16} alt="케밥 아이콘" />
    </div>
  );
}
