import { create } from 'zustand';
import { FormStore } from '@/types/auth';

export const useFormStore = create<FormStore>((set) => ({
  showPassword: false,
  setShowPassword: () =>
    set((state) => ({ showPassword: !state.showPassword })),
  showPasswordConfirmation: false,
  setShowPasswordConfirmation: () =>
    set((state) => ({
      showPasswordConfirmation: !state.showPasswordConfirmation,
    })),
}));
