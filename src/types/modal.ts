export interface ModalWrapperProps {
  children: React.ReactElement;
}

export interface ModalProps {
  title: string;
  description: string;
  input: boolean;
  inputPlaceholder: string;
  linkBtn?: boolean;
  closeBtn?: boolean;
  openToast?: (message: string, type: 'success' | 'error' | 'info') => void;
}

export interface ModalState {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  isSecondModalOpen?: boolean;
  openSecondModal?: () => void;
  closeSecondModal?: () => void;
}
