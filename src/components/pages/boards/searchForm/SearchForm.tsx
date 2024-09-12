"use client";

import { useState, FormEvent } from 'react';
import Image from 'next/image';
import SearchIcon from '@/assets/icons/ic_search.svg';

interface SearchFormProps {
  onSearch: (term: string) => void;
  placeholder?: string;
}

const SearchForm = ({ onSearch, placeholder = '검색어를 입력해주세요' }: SearchFormProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="relative">
      <form
        onSubmit={handleSearch}
        className="flex items-center w-full h-[48px] gap-2 p-4 border border-[#F8FAFC1A] rounded-lg bg-[#1E293B] md:h-[56px] lg:h-[56px]">
        <span className="absolute left-4 top-3 md:top-4 lg:top-4">
          <Image src={SearchIcon} alt="검색 아이콘" width={24} height={24} />
        </span>
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder={placeholder}
          className="w-full h-full pl-8 md:pl-9 text-md-regular bg-transparent text-[#94A3B8] border-none outline-none md:text-lg-regular lg:text-lg-regular placeholder-[#64748B]"
        />
      </form>
    </div>
  );
};

export default SearchForm;
