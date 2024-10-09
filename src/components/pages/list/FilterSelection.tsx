'use client';
import { useState } from 'react';

interface FilterSelectionProps {
  filters: { id: string; name: string }[]; // 필터 목록
  selectedFilter: { id: string } | undefined; // 선택된 필터
  onSelectFilter: (filter: { id: string; name: string }) => void; // 필터 선택 함수
}

function FilterSelection({
  filters,
  selectedFilter,
  onSelectFilter,
}: FilterSelectionProps) {
  return (
    <div className="mb-4 flex h-[25px] items-center">
      <div className="flex space-x-3">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => onSelectFilter(filter)}
            className={`duration-200 ${
              selectedFilter?.id === filter.id
                ? 'text-white-500 border-b-2 text-lg font-bold underline' // 선택된 필터 스타일
                : 'border-b-0 text-base text-gray-700' // 선택되지 않은 필터 스타일
            }`}
          >
            {filter.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default FilterSelection;
