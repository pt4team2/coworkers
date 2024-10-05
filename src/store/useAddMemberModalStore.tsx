import { create } from 'zustand';
import { ModalState } from '@/types/modal';

export const useAddMemberModalStore = create<ModalState>((set) => ({
  isModalOpen: false,
  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),
}));
