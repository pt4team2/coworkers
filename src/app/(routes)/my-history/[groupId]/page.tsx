'use client';

import Image from 'next/image';
import IcChecked from '@/assets/icons/checkedbox.svg';
import { useQuery } from '@tanstack/react-query';
import { authAxiosInstance } from '@/app/api/auth/axiosInstance';
import { format } from 'date-fns';
import { useParams } from 'next/navigation';
import useGroup from '@/hooks/useGroup';
import { AxiosError } from 'axios';

interface Task {
  id: number;
  name: string;
  done: boolean;
  doneAt?: string | null;
}

interface TasksByDate {
  [date: string]: Task[];
}

export default function Page() {
  const { groupId } = useParams() as { groupId: string };
  const { group, isLoading, error } = useGroup(groupId);

  const {
    data: tasks = [],
    isLoading: tasksLoading,
    error: tasksError,
  } = useQuery<Task[]>({
    queryKey: ['done-tasks', groupId],
    queryFn: async () => {
      try {
        const taskListsResponse = await authAxiosInstance.get<{ id: number }[]>(
          `/groups/${groupId}/task-lists`,
        );
        const taskLists = taskListsResponse.data;

        if (taskLists.length === 0) {
          console.warn('No task lists found for this group.');
          return [];
        }

        const allTasks: Task[] = [];
        await Promise.all(
          taskLists.map(async ({ id: taskListId }) => {
            const tasksResponse = await authAxiosInstance.get<Task[]>(
              `/groups/${groupId}/task-lists/${taskListId}/tasks`,
            );
            const doneTasks = tasksResponse.data.filter(
              (task) => task.done && task.doneAt,
            );
            allTasks.push(...doneTasks);
          }),
        );

        return allTasks;
      } catch (error) {
        console.error('Error fetching tasks:', error);
        throw error;
      }
    },
    enabled: !!groupId,
  });

  if (!groupId) return <div>Error: Group ID is required.</div>;
  if (isLoading || tasksLoading) return <div>Loading...</div>;

  if (error || tasksError) {
    const errorMessage =
      ((error as AxiosError)?.response?.data as { message: string })?.message ||
      ((tasksError as AxiosError)?.response?.data as { message: string })
        ?.message ||
      'An error occurred. Please try again later.';
    return <div>Error: {errorMessage}</div>;
  }

  const tasksByDate: TasksByDate = tasks.reduce((acc: TasksByDate, task) => {
    const doneDate = task.doneAt
      ? format(new Date(task.doneAt), 'yyyy-MM-dd')
      : 'No Date';
    if (!acc[doneDate]) acc[doneDate] = [];
    acc[doneDate].push(task);
    return acc;
  }, {});

  return (
    <div className="mt-6 lg:mt-10">
      <p className="text-xl-bold">마이 히스토리</p>
      {Object.keys(tasksByDate).length === 0 ? (
        <p className="mt-10 text-center">아직 히스토리가 없습니다.</p>
      ) : (
        Object.entries(tasksByDate).map(([date, tasksOnDate]) => (
          <div key={date} className="mt-8">
            <p className="text-lg-medium">{date}</p>
            {tasksOnDate.map((task) => (
              <div
                key={task.id}
                className="my-4 flex h-11 w-full flex-row gap-2 rounded-lg bg-background-secondary p-3"
              >
                <Image src={IcChecked} alt="체크박스" />
                <span className="line-through">{task.name}</span>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
}
