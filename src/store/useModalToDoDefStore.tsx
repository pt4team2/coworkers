import { create } from 'zustand';

type ToDoDefModalState = {
  isModalOpen: boolean;
  isCompleted: boolean;
  taskId: number | null;
  openModal: () => void;
  closeModal: () => void;
  toggleCompleted: () => void;
  setCompleted: (completed: boolean) => void;
  setTaskId: (id: number | null) => void;
};

export const useModalToDoDefStore = create<ToDoDefModalState>((set) => ({
  isModalOpen: false,
  isCompleted: false,
  taskId: null,
  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),
  toggleCompleted: () => set((state) => ({ isCompleted: !state.isCompleted })),
  setCompleted: (completed) => set({ isCompleted: completed }),
  setTaskId: (id) => set({ taskId: id }),
}));
