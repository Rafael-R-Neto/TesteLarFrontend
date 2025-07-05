import { create } from "zustand";

type Toast = {
  id: number;
  message: string;
  type: "success" | "error" | "info" | "warning";
};

type ToastState = {
  toasts: Toast[];
  showToast: (msg: string, type: Toast["type"]) => void;
  removeToast: (id: number) => void;
};

let idCounter = 0;

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],
  showToast: (message, type) => {
    const id = ++idCounter;
    set((state) => ({ toasts: [...state.toasts, { id, message, type }] }));
    setTimeout(
      () =>
        set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),
      3000
    );
  },
  removeToast: (id) =>
    set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),
}));
