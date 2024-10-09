import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Kebab from '@/assets/icons/ic_kebab.svg';
import { useModalDeleteStore } from '@/store/useModalDeleteStore';
import { useModalToDoDefStore } from '@/store/useModalToDoDefStore';

interface ListCardDropdownProps {
  onSelectOption: (option: string) => void;
}

export default function ListCardDropdown({
  onSelectOption,
}: ListCardDropdownProps) {
  const [isListCardDropdownOpen, setIsListCardDropdownOpen] = useState(false);
  const ListCardRef = useRef<HTMLDivElement>(null);
  const options = ['수정하기', '삭제하기'];

  const { openModal: openDeleteModal } = useModalDeleteStore();
  const { openModal: openToDoDefModal } = useModalToDoDefStore();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        ListCardRef.current &&
        !ListCardRef.current.contains(event.target as Node)
      ) {
        setIsListCardDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleOptionClick = (option: string) => {
    setIsListCardDropdownOpen(false);
    if (option === '삭제하기') {
      openDeleteModal();
    } else if (option === '수정하기') {
      openToDoDefModal();
    }
  };

  return (
    <div className="relative" ref={ListCardRef}>
      <button
        onClick={() => {
          setIsListCardDropdownOpen((prev) => !prev);
        }}
      >
        <Image src={Kebab} alt="케밥" width={16} height={16} />
      </button>

      {/* 드롭다운 메뉴 */}
      {isListCardDropdownOpen && (
        <div className="text-md-regular absolute right-0 z-50 w-[117px] rounded-xl border border-solid border-[#F8FAFC] border-opacity-10 bg-background-secondary text-center text-text-primary shadow-lg">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => handleOptionClick(option)}
              className="w-full cursor-pointer p-2 hover:rounded-xl hover:bg-[#18212F]"
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
