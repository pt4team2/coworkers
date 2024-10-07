'use client';

import React, { use, useEffect, useState } from 'react';
import Image from 'next/image';
import LeftArrow from '@/assets/icons/ic_arrow_left.svg';
import RightArrow from '@/assets/icons/ic_arrow_right.svg';
import BtnCallender from '@/assets/icons/btn_calendar.svg';
import ListCard from '@/components/pages/list/ListCard';
import FilterSelection from '@/components/pages/list/FilterSelection';
import { tasklistMockData } from '@/data/mockData';
import { useQuery } from '@tanstack/react-query';
import { getTaskList } from '@/api/taskListApis';
import ModalToDo from '@/components/Modal/ModalToDo';
import useGroup from '@/hooks/useGroup';
import { getUserGroups } from '@/api/userApis';
import { Team } from '@/types/userTypes';
import { getGroupTasks } from '@/api/groupApis';
import { useAddTaskListModalStore } from '@/store/useAddTaskListModalStore';
import AddTaskListModal from '@/components/modal/AddTaskListModal';
import { useParams } from 'next/navigation';
import { TaskList } from '@/types/Group';
import { authAxiosInstance } from '@/app/api/auth/axiosInstance';

export default function List() {
  const { groupId } = useParams();

  const [isAppendTaskModalOpen, setIsAppendTaskModalOpen] =
    useState<boolean>(false);

  const { isModalOpen, openModal, closeModal } = useAddTaskListModalStore();
  console.log(isModalOpen);

  const { data: taskListResponse } = useQuery({
    queryKey: ['taskList', groupId],
    queryFn: () => getGroupTasks(groupId.toString()),
    enabled: !!groupId,
  });

  const { group } = useGroup(groupId);

  const [selectedTaskList, setSelectedTaskList] = useState<
    TaskList | undefined
  >(undefined);

  const { data: tasksResponse } = useQuery({
    queryKey: ['group', groupId, selectedTaskList],
    queryFn: async () => {
      const response = await authAxiosInstance.get(
        `/groups/${groupId}/task-lists/${selectedTaskList?.id}/tasks`,
      );
      return response.data;
    },
  });

  console.log(tasksResponse);

  return (
    <div className="lg:w-300.25-custom">
      <span className="font-pretendard mb-27px lg: md-6 h-5.25-custom leading-5.25-custom mt-6 block w-9 text-center text-lg font-bold md:my-6 md:h-6 md:w-10 md:text-xl md:leading-6 lg:mb-6 lg:mt-10 lg:h-6 lg:w-12 lg:text-left">
        할일
      </span>
      <div className="mb-4 flex justify-between md:mb-6 lg:mb-6">
        <div className="flex space-x-3">
          <div>5월 18일 (화)</div>
          <div className="flex">
            <button>
              <Image src={LeftArrow} alt="LeftArrow" />
            </button>
            <button>
              <Image src={RightArrow} alt="RightArrow" />
            </button>
          </div>
          <button>
            <Image src={BtnCallender} alt="BtnCallender" />
          </button>
        </div>
        <button className="" onClick={() => openModal()}>
          + 새로운 목록 추가하기
        </button>
      </div>

      {group && (
        <FilterSelection
          groups={group}
          selectedGroup={selectedTaskList}
          onSelected={setSelectedTaskList}
        />
      )}

      {!taskListResponse?.length && <p>Task가 없습니다.</p>}
      {taskListResponse?.flatMap((group) =>
        group.tasks.map((task) => <ListCard key={task.id} task={task} />),
      )}

      <button
        className="rounded-full bg-green-500 px-5.25-custom py-3.5"
        onClick={() => {
          setIsAppendTaskModalOpen(true);
        }}
      >
        + 할 일 추가
      </button>

      <ModalToDo
        isOpen={isAppendTaskModalOpen}
        onClose={() => setIsAppendTaskModalOpen(false)}
        groupId={groupId.toString()}
        taskListId={selectedTaskList?.id.toString() || ''}
      />

      {isModalOpen && groupId && (
        <AddTaskListModal groupId={groupId.toString()} onClose={closeModal} />
      )}
    </div>
  );
}
