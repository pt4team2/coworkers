'use client';
import { TeamList, Team } from '@/types/userTypes';
import { useState } from 'react';

interface FilterSelectionProps {
  groups: TeamList;
  selectedGroup?: Team;
  onSelected: (team: Team) => void;
}

const FilterSelection: React.FC<FilterSelectionProps> = (props) => {
  const { onSelected, groups, selectedGroup } = props;
  const filters = groups;

  return (
    <div className="h-6.25-custom mb-4 flex items-center">
      <div className="flex space-x-3">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => onSelected(filter)}
            className={`duration-200 ${
              selectedGroup?.id === filter.id
                ? 'text-white-500 border-b-2 text-lg font-bold' // 선택된 필터 스타일
                : 'border-b-0 text-base text-gray-700' // 선택되지 않은 필터 스타일
            }`}
          >
            {filter.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterSelection;
