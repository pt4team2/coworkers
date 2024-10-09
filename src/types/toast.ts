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

export interface Toast2State {
  toast2Type: 'success' | 'error' | 'info';
  toast2Visible: boolean;
  toast2Message: string;
  openToast2: (message: string, type: 'success' | 'error' | 'info') => void;
  closeToast2: () => void;
  loading2: boolean;
  setLoading2: (loading: boolean) => void;
}
