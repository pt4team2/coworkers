'use client';

import { useState } from 'react';
import PopupOneButton from '@/components/Modal/PopupOneButton';
import ModalProfile from '@/components/modal/ProfileModal';
import ModalDanger from '@/components/Modal/ModalDanger';
import ModalDangerLogout from '@/components/Modal/ModalDangerLogout';
import ModalTwoButton from '@/components/Modal/ModalTwoButton';
import ModalOneButton from '@/components/Modal/ModalOneButton';
import ModalTwoButtonPassword from '@/components/Modal/ModalTwoButtonPassword';
import ModalToDo from '@/components/Modal/ModalToDo';
export default function Example() {
  const [isModalOpen, setIsModalOpen] = useState(true);
  return (
    <div className="bg-background-inverse">
      <ModalToDo isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
