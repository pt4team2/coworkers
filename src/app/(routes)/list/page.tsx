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

export default function List() {
  //날짜 및 캘린더 상태 관리
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);
  const calendarRef = useRef<HTMLDivElement>(null);
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

  return (
    <div className="lg:w-300.25-custom">
      <span className="font-pretendard mb-27px lg: md-6 h-5.25-custom leading-5.25-custom mt-6 block w-9 text-center text-lg font-bold md:my-6 md:h-6 md:w-10 md:text-xl md:leading-6 lg:mb-6 lg:mt-10 lg:h-6 lg:w-12 lg:text-left">
        할일
      </span>
      <div className="mb-4 flex justify-between md:mb-6 lg:mb-6">
        <div className="flex space-x-3">
          <div>
            {startDate ? format(startDate, 'yyyy년 MM월 dd일') : '날짜 선택'}
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
        <button className="text-md-regular text-brand-primary">
          + 새로운 목록 추가하기
        </button>
      </div>
      <FilterSelection />

      {tasklistMockData.flatMap((group) =>
        group.tasks.map((task) => <ListCard key={task.id} task={task} />),
      )}

      <button className="rounded-full bg-brand-primary px-5.25-custom py-3.5">
        + 할 일 추가
      </button>
    </div>
  );
}
