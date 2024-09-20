import { create } from 'zustand';
import { ToastState } from '@/types/toast';

export const useToastStore = create<ToastState>((set) => ({
  toastVisible: false,
  toastMessage: '',
  toastType: 'info',
  openToast: (message, type) =>
    set({ toastVisible: true, toastMessage: message, toastType: type }),
  closeToast: () => set({ toastVisible: false }),
  loading: false,
  setLoading: (loading) => set({ loading }),
}));
