import { create } from 'zustand';

type ToDoDefModalState = {
  isModalOpen: boolean;
  isCompleted: boolean; // 완료 상태 추가
  taskId: number | null;
  openModal: () => void;
  closeModal: () => void;
  toggleCompleted: () => void;
  setCompleted: (completed: boolean) => void; // 외부에서 상태 설정
  setTaskId: (id: number | null) => void;
};

export const useModalToDoDefStore = create<ToDoDefModalState>((set) => ({
  isModalOpen: false,
  isCompleted: false, // 초기 완료 상태
  taskId: null,
  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),
  toggleCompleted: () => set((state) => ({ isCompleted: !state.isCompleted })),
  setCompleted: (completed) => set({ isCompleted: completed }), // 상태 업데이트
  setTaskId: (id) => set({ taskId: id }),
}));
