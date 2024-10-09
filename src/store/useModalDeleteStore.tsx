import { create } from 'zustand';

type DeleteModalState = {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
};

export const useModalDeleteStore = create<DeleteModalState>((set) => ({
  isModalOpen: false,
  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),
}));
