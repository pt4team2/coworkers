'use client';

import { useState } from 'react';
import PopupOneButton from '@/components/Modal/PopupOneButton';
import ModalProfile from '@/components/modal/ProfileModal';
import ModalDanger from '@/components/Modal/ModalDanger';
import ModalDangerLogout from '@/components/Modal/ModalDangerLogout';
export default function Example() {
  const [isModalOpen, setIsModalOpen] = useState(true);
  return (
    <div className="bg-white">
      <ModalDangerLogout
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
