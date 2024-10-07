import { create } from 'zustand';
import { ModalState } from '@/types/modal';

export const useModalStore = create<ModalState>((set) => ({
  isModalOpen: false,
  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),
  isSecondModalOpen: false,
  openSecondModal: () => set({ isSecondModalOpen: true }),
  closeSecondModal: () => set({ isSecondModalOpen: false }),
}));
