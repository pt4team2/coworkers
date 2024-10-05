import { create } from 'zustand';
import { ModalState } from '@/types/modal';

interface ReviseModalState {
  isReviseModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}
export const useReviseTeamModalStore = create<ReviseModalState>((set) => ({
  isReviseModalOpen: false,
  openModal: () => set({ isReviseModalOpen: true }),
  closeModal: () => set({ isReviseModalOpen: false }),
}));
