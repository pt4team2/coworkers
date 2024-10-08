'use client';
import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import LeftArrow from '@/assets/icons/ic_arrow_left.svg';
import RightArrow from '@/assets/icons/ic_arrow_right.svg';
import BtnCalendar from '@/assets/icons/btn_calendar.svg';
import ListCard from '@/components/list/ListCard';
import FilterSelection from '@/components/pages/list/FilterSelection';
import { teamMockData, tasklistMockData } from '@/data/mockData';
import TasksList from '@/components/pages/teampage/taskList/TasksList';
import PopupOneButton from '@/components/modal/PopupOneButton';
import { format, addDays, subDays } from 'date-fns';
import Calendar from '@/components/calendar/Calendar';
import { useModalStore } from '@/store/useModalStore';
import ModalPortal from '@/components/ModalPortal/ModalPortal';
import ModalToDo from '@/components/modal/ModalToDo';

export default function List() {
  //날짜 및 캘린더 상태 관리
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);
  const calendarRef = useRef<HTMLDivElement>(null);
  const getDayOfWeek = (date: Date) => {
    return new Intl.DateTimeFormat('ko-KR', { weekday: 'short' }).format(date);
  };
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
  const { openModal, closeModal, isModalOpen } = useModalStore();
  return (
    <div className="lg:w-300.25-custom">
      <span className="font-pretendard mb-27px lg: md-6 h-5.25-custom leading-5.25-custom mt-6 block w-9 text-center text-lg font-bold md:my-6 md:h-6 md:w-10 md:text-xl md:leading-6 lg:mb-6 lg:mt-10 lg:h-6 lg:w-12 lg:text-left">
        할일
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
          onClick={openModal}
          className="text-md-regular text-brand-primary"
        >
          + 새로운 목록 추가하기
        </button>
        {isModalOpen && (
          <ModalPortal onClose={closeModal}>
            <ModalToDo isOpen={isModalOpen} onClose={closeModal} />
          </ModalPortal>
        )}
      </div>
      <FilterSelection />

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

      <button className="rounded-full bg-brand-primary px-5.25-custom py-3.5">
        + 할 일 추가
      </button>
    </div>
  );
}
