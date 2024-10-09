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
import ListCardDropdown from '@/components/pages/list/ListCardDropdown';
import ModalToDoDef from '@/components/pages/list/ModalToDoDef';
export default function Example() {
  const [isOpen, setIsOpen] = useState(false);

  const close = () => {
    setIsOpen(false);
  };

  const open = () => {
    setIsOpen(true);
  };

  return (
    <div className="bg-background-inverse">
      <button onClick={open} className="btn-open-modal">
        Open Modal
      </button>
      {isOpen && <ModalToDoDef onClose={close} />}
    </div>
  );
}
