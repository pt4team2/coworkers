export interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info';
  duration?: number;
}

export interface ToastState {
  toastType: 'success' | 'error' | 'info';
  toastVisible: boolean;
  toastMessage: string;
  openToast: (message: string, type: 'success' | 'error' | 'info') => void;
  closeToast: () => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}
