
import { create } from 'zustand';

type ConfirmModalState = {
  show: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  showModal: (args: { title: string; message: string; onConfirm: () => void }) => void;
  hideModal: () => void;
};

export const useConfirmModalStore = create<ConfirmModalState>((set) => ({
  show: false,
  title: '',
  message: '',
  onConfirm: () => {},
  showModal: ({ title, message, onConfirm }) => set({ show: true, title, message, onConfirm }),
  hideModal: () => set({ show: false })
}));
