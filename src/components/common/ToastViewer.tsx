
import { Toast, ToastContainer } from 'react-bootstrap';
import { useToastStore } from '../../stores/toastStore';

export const ToastViewer = () => {
  const { toasts } = useToastStore();

  return (
    <ToastContainer position="top-end" className="p-3">
      {toasts.map((t) => (
        <Toast key={t.id} bg={t.type}>
          <Toast.Body className="text-white">{t.message}</Toast.Body>
        </Toast>
      ))}
    </ToastContainer>
  );
};
