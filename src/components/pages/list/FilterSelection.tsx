'use client';
import { useState } from 'react';

function FilterSelection() {
  const filters: string[] = ['법인 섭립', '법인 동기', '정기 주총', '기타'];
  const [selectedFilter, setSelectedFilter] = useState<string>('');
  const handleSelect = (filter: string) => {
    setSelectedFilter(filter);
  };

  return (
    <div className="h-6.25-custom mb-4 flex items-center">
      <div className="flex space-x-3">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => handleSelect(filter)}
            className={`duration-200 ${
              selectedFilter === filter
                ? 'text-white-500 border-b-2 text-lg font-bold underline' // 선택된 필터 스타일
                : 'border-b-0 text-base text-gray-700' // 선택되지 않은 필터 스타일
            }`}
          >
            {filter}
          </button>
        ))}
      </div>
    </div>
  );
}

export default FilterSelection;
