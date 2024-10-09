import { create } from 'zustand';

type NewListModalState = {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
};

export const useModalNewListStore = create<NewListModalState>((set) => ({
  isModalOpen: false,
  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),
}));
