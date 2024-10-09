'use client';
import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import LeftArrow from '@/assets/icons/ic_arrow_left.svg';
import RightArrow from '@/assets/icons/ic_arrow_right.svg';
import BtnCalendar from '@/assets/icons/btn_calendar.svg';
import ListCard from '@/components/pages/list/ListCard';
import FilterSelection from '@/components/pages/list/FilterSelection';
import { teamMockData, tasklistMockData } from '@/data/mockData';
import TasksList from '@/components/pages/teampage/taskList/TasksList';
import PopupOneButton from '@/components/modal/PopupOneButton';
import { format, addDays, subDays } from 'date-fns';
import Calendar from '@/components/calendar/Calendar';
import { useModalStore } from '@/store/useModalStore';
import ModalPortal from '@/components/ModalPortal/ModalPortal';
import ModalToDo from '@/components/modal/ModalToDo';
import ModalNewList from '@/components/modal/ModalNewList';
import { useQuery } from '@tanstack/react-query';
import { useModalNewListStore } from '@/store/useModalNewListStore';
import { useModalToDoStore } from '@/store/useModalToDoStore';
import filters from '@/components/pages/list/FilterSelection';
import { useParams } from 'next/navigation';
import useSessionStore from '@/store/useSessionStore';
import useUser from '@/hooks/useUser';
import useGroup from '@/hooks/useGroup';
import { TaskList } from '@/types/Group';
import { authAxiosInstance } from '@/app/api/auth/axiosInstance';
// import { getTaskList } from '@/api/taskListApis';

export default function List() {
  const { groupId } = useParams();
  const { user } = useSessionStore();
  const { userData } = useUser(user?.id);
  const { group, isLoading, error } = useGroup(groupId);

  //날짜 및 캘린더 상태 관리
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);
  const calendarRef = useRef<HTMLDivElement>(null);
  const getDayOfWeek = (date: Date) => {
    return new Intl.DateTimeFormat('ko-KR', { weekday: 'short' }).format(date);
  };

  // 선택된 taskList
  const [selectedTaskList, setSelectedTaskList] = useState<
    TaskList | undefined
  >(undefined);

  const { data: tasksResponse } = useQuery({
    queryKey: [groupId, selectedTaskList, startDate],
    queryFn: async () => {
      const response = await authAxiosInstance.get(
        `/groups/${groupId}/task-lists/${selectedTaskList?.id}/tasks`,
        {
          params: {
            date: startDate?.toISOString(),
          },
        },
      );

      return response.data;
    },
    enabled: !!selectedTaskList && !!groupId,
  });

  console.log('tasksResponse', groupId, selectedTaskList, tasksResponse);

  const handlePrevDay = () => {
    if (startDate) {
      setStartDate(subDays(startDate, 1)); // 하루 전으로 이동
    }
  };
  const handleNextDay = () => {
    if (startDate) {
      setStartDate(addDays(startDate, 1)); // 하루 앞으로 이동
    }
  };
  const handleClickOutsideCalendar = (event: MouseEvent) => {
    if (
      calendarRef.current &&
      !calendarRef.current.contains(event.target as Node)
    ) {
      setIsCalendarOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutsideCalendar);
    return () => {
      document.removeEventListener('mousedown', handleClickOutsideCalendar);
    };
  }, []);

  //리스트 카드 드롭다운 상태 관리
  const [selectedOption, setSelectedOption] = useState<string>('');
  const handleSelectOption = (option: string) => {
    setSelectedOption(option);
  };

  //체크박스 상태 관리
  const [taskStates, setTaskStates] = useState<Record<number, boolean>>({});
  const handleCheckboxChange = (taskId: number, checked: boolean) => {
    setTaskStates((prevState) => ({
      ...prevState,
      [taskId]: checked,
    }));
  };
  //모달 상태 관리
  const { closeModal: closeNewListModal, isModalOpen: isNewListOpen } =
    useModalNewListStore();
  const { closeModal: closeToDoModal, isModalOpen: isToDoOpen } =
    useModalToDoStore();

  if (!tasklistMockData) {
    if (!filters) {
      return (
        <div className="text-md-medium text-center text-text-default">
          아직 할 일 목록이 없습니다.
          <br />
          새로운 목록을 추가해주세요.
        </div>
      );
    }
    return (
      <div className="text-md-medium text-center text-text-default">
        아직 할 일이 없습니다.
        <br />할 일을 추가해보세요.
      </div>
    );
  }
  return (
    <div className="lg:w-300.25-custom">
      <span className="font-pretendard mb-27px lg: md-6 h-5.25-custom leading-5.25-custom mt-6 block w-9 text-center text-lg font-bold md:my-6 md:h-6 md:w-10 md:text-xl md:leading-6 lg:mb-6 lg:mt-10 lg:h-6 lg:w-12 lg:text-left">
        할 일
      </span>
      <div className="mb-4 flex justify-between md:mb-6 lg:mb-6">
        <div className="flex space-x-3">
          <div>
            {startDate
              ? `${format(startDate, 'MM월 dd일')} (${getDayOfWeek(startDate)})`
              : '날짜 선택'}
          </div>
          <div className="flex">
            <button onClick={handlePrevDay}>
              <Image src={LeftArrow} alt="LeftArrow" />
            </button>
            <button onClick={handleNextDay}>
              <Image src={RightArrow} alt="RightArrow" />
            </button>
          </div>
          <div className="relative">
            <button onClick={() => setIsCalendarOpen(!isCalendarOpen)}>
              <Image src={BtnCalendar} alt="BtnCalendar" />
            </button>
            {/* 캘린더 */}
            {isCalendarOpen && (
              <div
                ref={calendarRef}
                className="absolute left-0 top-full z-50 mt-2 w-[336px] rounded-xl bg-background-secondary shadow-lg"
              >
                <Calendar
                  startDate={startDate}
                  setStartDate={(date: Date | null) => {
                    setStartDate(date);
                    setIsCalendarOpen(false);
                  }}
                />
              </div>
            )}
          </div>
        </div>
        <button
          onClick={() => useModalNewListStore.getState().openModal()}
          className="text-md-regular text-brand-primary"
        >
          + 새로운 목록 추가하기
        </button>
        {isNewListOpen && (
          <ModalNewList isOpen={isNewListOpen} onClose={closeNewListModal} />
        )}
      </div>
      <FilterSelection />

      <div
        style={{
          display: 'flex',
          gap: 16,
          justifyContent: 'start',
          alignContent: 'center',
          marginBottom: '16px',
        }}
      >
        {group?.taskLists.map((taskList) => {
          return (
            <button
              key={taskList.id}
              onClick={() => {
                setSelectedTaskList(taskList);
              }}
              style={{
                background:
                  selectedTaskList?.id === taskList.id ? 'red' : 'gray',
              }}
            >
              {taskList.name}
            </button>
          );
        })}
      </div>

      {tasklistMockData.flatMap((group) =>
        group.tasks.map((task) => (
          <ListCard
            key={task.id}
            task={task}
            checked={taskStates[task.id] || false}
            onCheckboxChange={(checked) =>
              handleCheckboxChange(task.id, checked)
            }
            onSelectOption={handleSelectOption}
          />
        )),
      )}

      <button
        className="fixed bottom-6 right-6 rounded-full bg-brand-primary px-5.25-custom py-3.5"
        onClick={() => useModalToDoStore.getState().openModal()}
      >
        + 할 일 추가
      </button>
      {isToDoOpen && selectedTaskList && (
        <ModalToDo
          isOpen={isToDoOpen}
          onClose={closeToDoModal}
          groupId={groupId.toString()}
          taskListId={selectedTaskList?.id}
        />
      )}
    </div>
  );
}
