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
export default function Example() {
  const [isModalOpen, setIsModalOpen] = useState(true);
  return (
    <div className="bg-background-inverse">
      <ModalOneButton
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}

