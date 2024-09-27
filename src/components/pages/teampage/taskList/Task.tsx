'use client';
import { useState, useEffect } from 'react';
import IcKebab from '@/assets/icons/ic_kebab.svg';
import Image from 'next/image';
import ProgressBar from './ProgressBar';
import IcDone from '@/assets/icons/ic_done.svg';
import useTasks from '@/hooks/useTasks';
import { IGroup } from '@/types/Group';

interface TaskListProps {
  tasklist: IGroup;
}

interface TaskProps {
  groupId: string;
  id: number;
}

export default function Task({ tasklist }: { tasklist: any }) {
  const taskCount = tasklist.tasks.length;

  //완료한 task 개수 계산하는 식 //

  const doneTasks = tasklist.tasks.filter(
    (task: any) => new Date(task.doneAt) < new Date(task.date),
  );
  const doneTaskCount = doneTasks.length;
  const progressPercent = (doneTaskCount / taskCount) * 100;

  const [isDone, setIsDone] = useState<boolean>();
  useEffect(() => {
    if (doneTaskCount / taskCount === 1) {
      setIsDone(true);
    } else {
      setIsDone(false);
    }
  }, [doneTaskCount, taskCount]);

  const colors = [
    '#ffe687',
    '#84B9c0',
    '#c5d7f2',
    '#e26559',
    '#ffd57e',
    '#8adfe3',
    '#ecae7d',
    '#fa897b',
    '#ccabd8',
    '#e36387',
  ];

  // 랜덤 색상 선택 함수
  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  // 배경색을 상태로 관리
  const [bgColor, setBgColor] = useState<string>('');

  useEffect(() => {
    setBgColor(getRandomColor());
  }, []);

  return (
    <div className="flex rounded-[12px] bg-background-secondary">
      <div
        className="w-3 rounded-l-[12px]"
        style={{ backgroundColor: bgColor }}
      ></div>
      <div className="flex w-full items-center justify-between gap-1 px-[8px] py-[7.5px]">
        <span className="text-md-medium">{tasklist.name}</span>
        <div className="ml-auto flex h-[25px] w-[58px] flex-row items-center justify-between rounded-[12px] bg-background-primary px-2 py-1">
          {isDone ? (
            <Image src={IcDone} alt="완료" />
          ) : (
            <ProgressBar value={progressPercent} />
          )}
          <span className="text-md-regular text-brand-primary">
            {doneTaskCount}/{taskCount}
          </span>
        </div>
        <Image src={IcKebab} width={16} height={16} alt="케밥 아이콘" />
      </div>
    </div>
  );
}
