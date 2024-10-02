// //리스트페이지에서 할 일을 생성할 때의 모달 컴포넌트
// import React, { useState, useRef } from 'react';
// import DatePicker from 'react-datepicker';
// import Image from 'next/image';
// import ToggleIcon from '@/assets/icons/ic_toggle.svg';
// import 'react-datepicker/dist/react-datepicker.css';
// import { useModalStore } from '@/store/useModalStore';

// interface ModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   children?: React.ReactNode;
// }
// const today = new Date().toISOString().slice(0, 10);

// const ModalToDo = ({ isOpen, onClose }: ModalProps) => {
//   if (!isOpen) return null;

//   return (
//     <div className="relative flex w-[375px] rounded-b-[0px] rounded-t-xl bg-background-secondary py-8 md:w-96 md:rounded-xl lg:w-96 lg:rounded-xl">
//       <div className="mx-auto flex w-[336px] flex-col items-center justify-center gap-6">
//         <div className="flex h-[69px] w-[269px] flex-col justify-between">
//           <h2 className="text-lg-medium text-center text-text-primary">
//             할 일 만들기
//           </h2>
//           <div className="text-md-medium break-keep text-center text-text-default">
//             할 일은 실제로 행동 가능한 작업 중심으로 작성해주시면 좋습니다.
//           </div>
//         </div>
//         <div className="flex h-[83px] w-full flex-col justify-between">
//           <h2 className="text-lg-medium text-text-primary">할 일 제목</h2>
//           <input
//             className="text-lg-regular h-12 rounded-xl border-solid border-[#F8FAFC] border-opacity-10 bg-background-secondary pl-4 text-text-default"
//             placeholder="할 일 제목을 입력해주세요."
//           />
//         </div>
//         <div className="flex h-[83px] w-full flex-col justify-between">
//           <h2 className="text-lg-medium text-text-primary">
//             시작 및 날짜 시간
//           </h2>
//           <input
//             type="date"
//             className="text-lg-regular h-12 rounded-xl border-solid border-[#F8FAFC] border-opacity-10 bg-background-secondary pl-4 text-text-default"
//             value={today}
//           />
//         </div>
//         <div className="flex h-[79px] w-full flex-col justify-between">
//           <h2 className="text-lg-medium text-text-primary">반복 설정</h2>
//           <button className="text-md-medium flex h-[44px] w-[109px] justify-between rounded-xl bg-[#18212F] px-[12.5px] py-[10px] text-text-default">
//             반복 안함
//             <Image src={ToggleIcon} alt="토글" width={24} height={24} />
//           </button>
//         </div>
//         <div className="flex h-[110px] w-full flex-col justify-between">
//           <h2>할 일 제목</h2>
//           <textarea
//             className="text-lg-regular h-[75px] resize-none break-keep rounded-xl border border-solid border-[#F8FAFC] border-opacity-10 bg-background-secondary pl-4 pt-3 text-text-default"
//             placeholder="메모를 입력해주세요."
//           />
//         </div>

//         <button
//           className="px-auto py-auto mt-2 h-[47px] w-full rounded-xl bg-brand-primary text-text-inverse"
//           onClick={onClose}
//         >
//           만들기
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ModalToDo;

import React, { useState, useRef, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import Image from 'next/image';
import ToggleIcon from '@/assets/icons/ic_toggle.svg';
import 'react-datepicker/dist/react-datepicker.css';
import ArrowLeft from '@/assets/icons/ic_arrow_left_ver2.svg';
import ArrowRight from '@/assets/icons/ic_arrow_right_ver2.svg';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

const ModalToDo = ({ isOpen, onClose }: ModalProps) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const datePickerRef = useRef<HTMLDivElement>(null);

  // 달력 외부를 클릭하면 닫힙니다.
  const handleClickOutside = (event: MouseEvent) => {
    if (
      datePickerRef.current &&
      !datePickerRef.current.contains(event.target as Node)
    ) {
      setIsDatePickerOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (!isOpen) return null;

  return (
    <div className="relative flex w-[375px] rounded-b-[0px] rounded-t-xl bg-background-secondary py-8 md:w-96 md:rounded-xl lg:w-96 lg:rounded-xl">
      <div className="mx-auto flex w-[336px] flex-col items-center justify-center gap-6">
        <div className="flex h-[69px] w-[269px] flex-col justify-between">
          <h2 className="text-lg-medium text-center text-text-primary">
            할 일 만들기
          </h2>
          <div className="text-md-medium break-keep text-center text-text-default">
            할 일은 실제로 행동 가능한 작업 중심으로 작성해주시면 좋습니다.
          </div>
        </div>
        <div className="flex h-[83px] w-full flex-col justify-between">
          <h2 className="text-lg-medium text-text-primary">할 일 제목</h2>
          <input
            className="text-lg-regular h-12 rounded-xl border-solid border-[#F8FAFC] border-opacity-10 bg-background-secondary pl-4 text-text-default"
            placeholder="할 일 제목을 입력해주세요."
          />
        </div>
        <div className="flex h-auto w-full flex-col justify-between gap-4">
          <h2 className="text-lg-medium text-text-primary">
            시작 및 날짜 시간
          </h2>
          <div ref={datePickerRef} className="relative">
            <input
              onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
              value={startDate ? startDate.toLocaleDateString() : ''}
              readOnly
              className="text-lg-regular h-12 w-full cursor-pointer rounded-xl border-solid border-[#F8FAFC] border-opacity-10 bg-background-secondary pl-4 text-text-default"
              placeholder="날짜를 선택해주세요."
            />
            {isDatePickerOpen && (
              <div className="mt-2">
                <DatePicker
                  selected={startDate}
                  onChange={(date: Date | null) => {
                    setStartDate(date);
                    setIsDatePickerOpen(false); // 날짜 선택 후 달력 닫기
                  }}
                  showPopperArrow={false}
                  renderCustomHeader={({
                    date,
                    decreaseMonth,
                    increaseMonth,
                  }) => (
                    <div className="mb-2 flex items-center justify-between">
                      <button onClick={decreaseMonth} className="p-1">
                        <Image src={ArrowLeft} alt="이전" />
                      </button>
                      <span className="font-medium">
                        {date.toLocaleString('default', { month: 'long' })}{' '}
                        {date.getFullYear()}
                      </span>
                      <button onClick={increaseMonth} className="p-1">
                        <Image src={ArrowRight} alt="다음" />
                      </button>
                    </div>
                  )}
                  dateFormat="yyyy/MM/dd"
                  calendarClassName="rounded-lg border-2 border bg-white shadow-lg p-2"
                  inline
                  dayClassName={(date) =>
                    'w-full p-2 text-center hover:bg-blue-500 hover:text-white transition-colors duration-150 ease-in-out'
                  }
                />
              </div>
            )}
          </div>
        </div>
        <div className="flex h-[79px] w-full flex-col justify-between">
          <h2 className="text-lg-medium text-text-primary">반복 설정</h2>
          <button className="text-md-medium flex h-[44px] w-[109px] justify-between rounded-xl bg-[#18212F] px-[12.5px] py-[10px] text-text-default">
            반복 안함
            <Image src={ToggleIcon} alt="토글" width={24} height={24} />
          </button>
        </div>
        <div className="flex h-[110px] w-full flex-col justify-between">
          <h2>할 일 제목</h2>
          <textarea
            className="text-lg-regular h-[75px] resize-none break-keep rounded-xl border border-solid border-[#F8FAFC] border-opacity-10 bg-background-secondary pl-4 pt-3 text-text-default"
            placeholder="메모를 입력해주세요."
          />
        </div>

        <button
          className="px-auto py-auto mt-2 h-[47px] w-full rounded-xl bg-brand-primary text-text-inverse"
          onClick={onClose}
        >
          만들기
        </button>
      </div>
    </div>
  );
};

export default ModalToDo;
