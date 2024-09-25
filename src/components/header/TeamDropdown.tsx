'use client';

import React from 'react';
import { useState, useEffect, useRef } from 'react';
import IcArrow from 'src/assets/icons/ic_toggleDown.svg';
import IcKebab from 'src/assets/icons/ic_kebab.svg';
import IcPlus from 'src/assets/icons/ic_plus.svg';
import { teamMockData } from '@/data/mockData';
import Image from 'next/image';

export default function TeamDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const toggleDropdown = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative z-20" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="text-lg-medium flex w-[97px] flex-row items-center justify-center gap-[11px]"
      >
        {teamMockData.memberships[0].group.name}{' '}
        <Image src={IcArrow} alt="드롭다운 화살표" />
      </button>
      {isOpen && (
        <ul className="absolute left-0 top-10 mt-2 flex w-[218px] flex-col justify-center gap-[8px] rounded-[12px] bg-background-secondary p-4 text-sm shadow-lg">
          {teamMockData.memberships.map((membership) => (
            <li
              key={membership.group.id}
              className="text-lg-medium flex w-[186px] flex-row items-center justify-between gap-3 rounded-[8px] bg-background-secondary p-2 hover:bg-slate-700"
            >
              <img
                src={membership.group.image}
                alt="그룹 이미지"
                className="h-8 w-8 rounded-[6px]"
              />
              {membership.group.name}
              <Image className="ml-auto w-4" src={IcKebab} alt="케밥 아이콘" />
            </li>
          ))}
          <li className="text-lg-medium mt-2 flex w-[186px] flex-row items-center justify-center gap-[1.5px] rounded-[8px] border border-solid border-slate-50 bg-background-secondary py-[14px] text-center hover:bg-slate-700">
            {' '}
            <Image src={IcPlus} alt="추가 버튼" /> 팀 추가하기
          </li>
        </ul>
      )}
    </div>
  );
}
