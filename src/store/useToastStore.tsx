import { create } from 'zustand';
import { ToastState } from '@/types/toast';

// 회원가입 페이지 토스트
export const useSignupToastStore = create<ToastState>((set) => ({
  toastVisible: false,
  toastMessage: '',
  toastType: 'info',
  openToast: (message, type) =>
    set({ toastVisible: true, toastMessage: message, toastType: type }),
  closeToast: () => set({ toastVisible: false }),
  loading: false,
  setLoading: (loading) => set({ loading }),
}));

// 로그인 페이지 토스트 
export const useLoginToastStore = create<ToastState>((set) => ({
  toastVisible: false,
  toastMessage: '',
  toastType: 'info',
  openToast: (message, type) =>
    set({ toastVisible: true, toastMessage: message, toastType: type }),
  closeToast: () => set({ toastVisible: false }),
  loading: false,
  setLoading: (loading) => set({ loading }),
}));

// 비밀번호 재설정 페이지
export const useResetPwdToastStore = create<ToastState>((set) => ({
  toastVisible: false,
  toastMessage: '',
  toastType: 'info',
  openToast: (message, type) =>
    set({ toastVisible: true, toastMessage: message, toastType: type }),
  closeToast: () => set({ toastVisible: false }),
  loading: false,
  setLoading: (loading) => set({ loading }),
}));

// 계정 설정 페이지 토스트
export const useUserSettingToastStore = create<ToastState>((set) => ({
  toastVisible: false,
  toastMessage: '',
  toastType: 'info',
  openToast: (message, type) =>
    set({ toastVisible: true, toastMessage: message, toastType: type }),
  closeToast: () => set({ toastVisible: false }),
  loading: false,
  setLoading: (loading) => set({ loading }),
}));

// modal wrapper 토스트
export const useModalWrapperToastStore = create<ToastState>((set) => ({
  toastVisible: false,
  toastMessage: '',
  toastType: 'info',
  openToast: (message, type) =>
    set({ toastVisible: true, toastMessage: message, toastType: type }),
  closeToast: () => set({ toastVisible: false }),
  loading: false,
  setLoading: (loading) => set({ loading }),
}));
