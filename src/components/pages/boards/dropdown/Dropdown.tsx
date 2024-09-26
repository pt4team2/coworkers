"use client";

import { useState } from 'react';
import Image from 'next/image';
import ToggleIcon from '@/assets/icons/ic_toggle.svg';

interface DropdownProps {
  onSelect: (sortOption: string) => void;
}

const Dropdown = ({ onSelect }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('최신순');

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
    onSelect(option);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={toggleDropdown}
        className={`inline-flex justify-between items-center w-[94px] h-[40px] md:w-[120px] md:h-[44px] lg:w-[120px] lg:h-[44px] px-2 py-2 rounded-[8px] shadow bg-[#1E293B] text-xs-regular 
        ${isOpen ? 'bg-[#334155]' : 'hover:bg-[#334155]'} focus:outline-none`}>
        {selectedOption}
        <Image src={ToggleIcon} alt="토글 아이콘" width={24} height={24}/>
      </button>

      {isOpen && (
        <div className="origin-top-right absolute right-0 w-[94px] md:w-[120px] lg:w-[120px] mt-[6px] md:mt-2 lg:mt-2 rounded-lg shadow-lg bg-[#1E293B] border border-[#334155] focus:outline-none">
          <div role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <button
              onClick={() => handleSelect('최신순')}
              className="block h-[40px] w-full px-[8px] py-[11px] text-xs-regular hover:bg-gray-700 rounded-t-[8px] text-left"
              role="menuitem">
              최신순
            </button>
            <button
              onClick={() => handleSelect('좋아요 많은순')}
              className="block h-[40px] w-full px-[8px] py-[11px] text-xs-regular hover:bg-gray-700 rounded-b-[8px] text-left"
              role="menuitem">
              좋아요 많은순
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
