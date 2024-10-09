import { create } from 'zustand';

type ToDoDefModalState = {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
};

export const useModalToDoDefStore = create<ToDoDefModalState>((set) => ({
  isModalOpen: false,
  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),
}));
