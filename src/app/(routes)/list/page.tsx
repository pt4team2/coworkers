import React, { useState } from 'react';
import Image from 'next/image';
import LeftArrow from '@/assets/icons/ic_arrow_left.svg';
import RightArrow from '@/assets/icons/ic_arrow_right.svg';
import BtnCallender from '@/assets/icons/btn_calendar.svg';
import ListCard from '@/components/list/ListCard';
import FilterSelection from '@/components/list/ToDoFilter';

export default function List() {
  return (
    <div className="lg:w-300.25-custom">
      <span className="font-pretendard mt-6 block h-5.25-custom w-9 text-center text-lg font-bold leading-5.25-custom md:mt-6 md:h-6 md:w-10 md:text-xl md:leading-6 lg:mt-10 lg:h-6 lg:w-12 lg:text-left">
        할일
      </span>
      <div className="flex justify-between">
        <div className="flex">
          <div>5월 18일</div>
          <Image src={LeftArrow} alt="LeftArrow" />
          <Image src={RightArrow} alt="RightArrow" />
          <button>
            <Image src={BtnCallender} alt="BtnCallender" />
          </button>
        </div>
        <button className="">+ 새로운 목록 추가하기</button>
      </div>
      <FilterSelection />

      <ListCard />
      <button className="rounded-40-custom bg-green-500 p-[14px_21px]">
        + 할 일 추가
      </button>
    </div>
  );
}
