//리스트페이지에서 할 일을 생성할 때의 모달 컴포넌트

import React, { useState, useRef, useEffect } from 'react';
import Calendar from '@/components/calendar/Calendar';
import Image from 'next/image';
import Toggle from '@/assets/icons/ic_toggle.svg';
import { format } from 'date-fns';
import ModalPortal from '../ModalPortal/ModalPortal';
import { useModalToDoStore } from '@/store/useModalToDoStore';
import { useMutation } from '@tanstack/react-query';
import { authAxiosInstance } from '@/app/api/auth/axiosInstance';

interface ModalProps {
  isOpen: boolean;

  groupId: string;
  taskListId: number;

  onClose: () => void;
  children?: React.ReactNode;
}

const WeekDays = ['일', '월', '화', '수', '목', '금', '토']; //주 반복에서의 요일

const ModalToDo = ({ isOpen, onClose, groupId, taskListId }: ModalProps) => {
  // 날짜 및 캘린더 상태 관리
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);
  const calendarRef = useRef<HTMLDivElement>(null);
  const { closeModal: closeToDoModal } = useModalToDoStore();

  const handleClickOutsideCalendar = (event: MouseEvent) => {
    if (
      calendarRef.current &&
      !calendarRef.current.contains(event.target as Node)
    ) {
      setIsCalendarOpen(false);
    }
  };

  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const { mutate: createTask } = useMutation({
    mutationKey: [name, description, startDate, groupId, taskListId],
    mutationFn: async () => {
      const response = await authAxiosInstance.post(
        `/groups/${groupId}/task-lists/${taskListId}/tasks`,
        {
          name,
          description,
          startDate: startDate?.toISOString(),
          // TODO: 반복 일정인 경우 데이터 처리
          frequencyType: 'MONTHLY',
          monthDay: 1,
        },
      );
      return response.data;
    },
    onSuccess: () => {
      onClose();
    },
  });

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutsideCalendar);
    return () => {
      document.removeEventListener('mousedown', handleClickOutsideCalendar);
    };
  }, []);

  // 드롭다운 상태 관리
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('반복 안함');
  const [selectedDays, setSelectedDays] = useState<string[]>([]);

  const options = ['반복 안함', '한 번', '매일', '주 반복', '월 반복'];
  const filteredOptions = options.filter((option) => option !== selectedOption);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutsideDropDown = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsDropDownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutsideDropDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutsideDropDown);
    };
  }, []);
  //주 반복 상태 관리
  const handleButtonClick = (day: string) => {
    setSelectedDays((prevSelectedDays) =>
      prevSelectedDays.includes(day)
        ? prevSelectedDays.filter((selectedDay) => selectedDay !== day)
        : [...prevSelectedDays, day],
    );
  };
  console.log(selectedDays);
  if (!isOpen) return null;

  return (
    <ModalPortal onClose={closeToDoModal}>
      <div className="flex items-end justify-center md:items-center lg:items-center">
        <div className="relative flex w-[375px] rounded-b-[0px] rounded-t-xl bg-background-secondary py-8 md:w-96 md:rounded-xl lg:w-96 lg:rounded-xl">
          <div className="mx-auto flex w-[336px] flex-col items-center justify-center gap-6">
            {/* 모달 헤더 */}
            <div className="flex h-[69px] w-[269px] flex-col justify-between">
              <h2 className="text-lg-medium text-center text-text-primary">
                할 일 만들기
              </h2>
              <div className="text-md-medium break-keep text-center text-text-default">
                할 일은 실제로 행동 가능한 작업 중심으로 작성해주시면 좋습니다.
              </div>
            </div>

            {/* 할 일 제목 입력 */}
            <div className="flex h-[83px] w-full flex-col justify-between">
              <h2 className="text-lg-medium text-text-primary">할 일 제목</h2>
              <input
                value={name}
                onChange={(event) => {
                  setName(event.target.value);
                }}
                className="text-lg-regular h-12 rounded-xl border-solid border-[#F8FAFC] border-opacity-10 bg-background-secondary pl-4 text-text-primary placeholder-text-default focus:border-none focus:outline-none focus:ring-1 focus:ring-[#F8FAFC]"
                placeholder="할 일 제목을 입력해주세요."
              />
            </div>

            {/* 날짜 및 시간 선택 */}
            <div className="flex w-full flex-col gap-4">
              <h2 className="text-lg-medium text-text-primary">
                시작 날짜 및 시간
              </h2>
              <div className="flex w-full flex-col gap-2">
                <button
                  onClick={() => setIsCalendarOpen(!isCalendarOpen)}
                  className="text-lg-medium border-1 h-12 cursor-pointer rounded-xl border border-solid border-[#F8FAFC] border-opacity-10 bg-background-secondary p-2 pl-4 text-left text-text-default placeholder-text-default focus:border-none focus:outline-none focus:ring-1 focus:ring-interaction-hover"
                >
                  {startDate
                    ? format(startDate, 'yyyy년 MM월 dd일')
                    : '날짜 선택'}
                </button>

                {/* 캘린더 */}
                {isCalendarOpen && (
                  <div ref={calendarRef}>
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

            {/* 반복 설정 드롭다운 */}
            <div className="flex h-[79px] w-full flex-col justify-between">
              <h2 className="text-lg-medium text-text-primary">반복 설정</h2>
              <div className="relative">
                <button
                  onClick={() => setIsDropDownOpen(!isDropDownOpen)}
                  className="text-md-medium flex h-[44px] w-[117px] items-center justify-between rounded-xl bg-[#18212F] px-[12.5px] py-[10px] text-text-default"
                >
                  {selectedOption}
                  <Image src={Toggle} alt="토글" width={24} height={24} />
                </button>

                {/* 드롭다운 메뉴 */}
                {isDropDownOpen && (
                  <div
                    ref={dropdownRef}
                    className="absolute z-10 w-[117px] rounded-xl border border-solid border-[#F8FAFC] border-opacity-10 bg-background-secondary text-text-primary"
                  >
                    {filteredOptions.map((option) => (
                      <div
                        key={option}
                        onClick={() => {
                          setSelectedOption(option);
                          setIsDropDownOpen(false);
                        }}
                        className="cursor-pointer p-2 hover:rounded-xl hover:bg-[#18212F]"
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* 주 반복 시 요일 선택 */}
            {selectedOption === '주 반복' && (
              <div className="flex h-[79px] w-full flex-col justify-between">
                <h2 className="text-lg-medium text-text-primary">반복 요일</h2>
                <div className="flex h-12 justify-between">
                  {WeekDays.map((day) => (
                    <button
                      key={day}
                      onClick={() => handleButtonClick(day)}
                      className={`text-md-medium flex w-11 items-center justify-center rounded-xl border p-2 ${
                        selectedDays.includes(day)
                          ? 'bg-brand-primary text-text-primary'
                          : 'bg-[#18212F] text-text-default'
                      }`}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 할 일 메모 입력 */}
            <div className="flex h-[110px] w-full flex-col justify-between">
              <h2 className="text-lg-medium text-text-primary">할 일 메모</h2>
              <textarea
                value={description}
                onChange={(event) => {
                  setDescription(event.target.value);
                }}
                className="text-lg-regular h-[75px] resize-none break-keep rounded-xl border border-solid border-[#F8FAFC] border-opacity-10 bg-background-secondary pl-4 pt-3 text-text-primary placeholder-text-default focus:border-none focus:outline-none focus:ring-1 focus:ring-[#F8FAFC]"
                placeholder="메모를 입력해주세요."
              />
            </div>

            {/* 만들기 버튼 */}
            <button
              className="px-auto py-auto mt-2 h-[47px] w-full rounded-xl bg-brand-primary text-text-inverse"
              onClick={() => {
                // TODO: 데이터 생성 API 호출
                createTask();
              }}
            >
              만들기
            </button>
          </div>
        </div>
      </div>
    </ModalPortal>
  );
};

export default ModalToDo;
