import { create } from 'zustand';
import { ToastState } from '@/types/toast';
import { Toast2State } from '@/types/toast';
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

// create-team 페이지에서의 팀생성 토스트
export const useCreateTeamToastStore = create<ToastState>((set) => ({
  toastVisible: false,
  toastMessage: '',
  toastType: 'info',
  openToast: (message, type) =>
    set({ toastVisible: true, toastMessage: message, toastType: type }),
  closeToast: () => set({ toastVisible: false }),
  loading: false,
  setLoading: (loading) => set({ loading }),
}));

export const useAddTeamModalToastStore = create<ToastState>((set) => ({
  toastVisible: false,
  toastMessage: '',
  toastType: 'info',
  openToast: (message, type) =>
    set({ toastVisible: true, toastMessage: message, toastType: type }),
  closeToast: () => set({ toastVisible: false }),
  loading: false,
  setLoading: (loading) => set({ loading }),
}));

//할 일 목록 생성 토스트
export const useAddTaskListToastStore = create<ToastState>((set) => ({
  toastVisible: false,
  toastMessage: '',
  toastType: 'info',
  openToast: (message, type) =>
    set({ toastVisible: true, toastMessage: message, toastType: type }),
  closeToast: () => set({ toastVisible: false }),
  loading: false,
  setLoading: (loading) => set({ loading }),
}));

//계정 설정 (이름, 이미지) 토스트
export const useReviseMyDataToastStore = create<Toast2State>((set) => ({
  toast2Visible: false,
  toast2Message: '',
  toast2Type: 'info',
  openToast2: (message, type) =>
    set({ toast2Visible: true, toast2Message: message, toast2Type: type }),
  closeToast2: () => set({ toast2Visible: false }),
  loading2: false,
  setLoading2: (loading2) => set({ loading2 }),
}));
