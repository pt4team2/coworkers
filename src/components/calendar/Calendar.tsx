import React from 'react';
import Image from 'next/image';
import LeftArrow from '@/assets/icons/ic_arrow_left_ver2.svg';
import RightArrow from '@/assets/icons/ic_arrow_right_ver2.svg';
import {
  addMonths,
  subMonths,
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameMonth,
  isSameDay,
} from 'date-fns';

interface CalendarProps {
  startDate: Date | null;
  setStartDate: (date: Date | null) => void;
}

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const Calendar: React.FC<CalendarProps> = ({ startDate, setStartDate }) => {
  const [currentMonth, setCurrentMonth] = React.useState<Date>(new Date());

  const handlePrevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const handleNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const startDateOfWeek = startOfWeek(monthStart);
  const endDateOfWeek = endOfWeek(monthEnd);

  const generateDates = () => {
    const dates = [];
    let currentDay = startDateOfWeek;
    while (currentDay <= endDateOfWeek) {
      dates.push(currentDay);
      currentDay = addDays(currentDay, 1);
    }
    return dates;
  };
  const dates = generateDates();

  const handleDateChange = (newValue: Date) => {
    setStartDate(newValue);
  };

  return (
    <div
      id="calendar"
      className="rounded-xl border border-interaction-hover p-4"
    >
      <div className="flex h-[34px] items-center justify-between">
        <button onClick={handlePrevMonth} className="p-1">
          <Image src={LeftArrow} alt="이전" width={24} height={24} />
        </button>
        <span className="text-md-medium text-text-inverse">
          {format(currentMonth, 'MMMM yyyy')}
        </span>
        <button onClick={handleNextMonth} className="p-1">
          <Image src={RightArrow} alt="다음" width={24} height={24} />
        </button>
      </div>

      <div className="grid h-8 grid-cols-7 p-[6.5px] text-center">
        {WEEKDAYS.map((weekday) => (
          <div
            key={weekday}
            className="text-lg-semibold text-center text-text-inverse"
          >
            {weekday}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7">
        {dates.map((date, idx) => (
          <div
            key={idx}
            onClick={() => handleDateChange(date)}
            className={`text-md-medium h-8 cursor-pointer p-[7.5px] text-center ${
              isSameMonth(date, currentMonth)
                ? 'text-text-primary'
                : 'text-text-default'
            } ${
              startDate && isSameDay(date, startDate)
                ? 'bg-brand-primary text-[#1E293B]'
                : ''
            } rounded-lg hover:bg-brand-secondary hover:text-text-primary`}
          >
            {format(date, 'd')}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
