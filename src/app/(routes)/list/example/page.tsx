'use client';

import { useState } from 'react';
import PopupOneButton from '@/components/modal/PopupOneButton';
import ModalDanger from '@/components/modal/ModalDanger';
import ModalDangerLogout from '@/components/modal/ModalDangerLogout';
import ModalTwoButton from '@/components/modal/ModalTwoButton';
import ModalOneButton from '@/components/modal/ModalOneButton';
import ModalTwoButtonPassword from '@/components/modal/ModalTwoButtonPassword';
import ModalToDo from '@/components/modal/ModalToDo';
import ModalNewList from '@/components/modal/ModalNewList';
import ListCardDropdown from '@/components/list/ListCardDropdown';
export default function Example() {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [selectedOption, setSelectedOption] = useState<string>('');
  const handleSelectOption = (option: string) => {
    setSelectedOption(option);
    console.log(`선택된 옵션: ${option}`);
    // 여기서 수정 또는 삭제 로직을 처리할 수 있음
  };

  return <div className="bg-background-inverse"></div>;
}
