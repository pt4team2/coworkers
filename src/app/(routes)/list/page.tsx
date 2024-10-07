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

export default function List() {
  const [isAppendTaskModalOpen, setIsAppendTaskModalOpen] =
    useState<boolean>(false);

  const { data: groupsResponse } = useQuery({
    queryKey: ['getUserGroups'],
    queryFn: getUserGroups,
  });

  const [selectedGroup, setSelectedGroup] = useState<Team | undefined>(
    undefined,
  );

  const { data: taskListResponse } = useQuery({
    queryKey: ['taskList', selectedGroup],
    queryFn: () => getGroupTasks(selectedGroup!.id || 0),
    enabled: !!selectedGroup,
  });

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
        <button className="">+ 새로운 목록 추가하기</button>
      </div>

      <FilterSelection
        groups={groupsResponse || []}
        selectedGroup={selectedGroup}
        onSelected={setSelectedGroup}
      />

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
      />
    </div>
  );
}
