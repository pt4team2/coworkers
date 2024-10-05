import { create } from 'zustand';
import { ModalState } from '@/types/modal';

interface DeleteModalState {
  isDeleteModalOpen: boolean;
  openDeleteModal: () => void;
  closeDeleteModal: () => void;
}
export const useDeleteTeamModalStore = create<DeleteModalState>((set) => ({
  isDeleteModalOpen: false,
  openDeleteModal: () => set({ isDeleteModalOpen: true }),
  closeDeleteModal: () => set({ isDeleteModalOpen: false }),
}));
