
import { Modal, Button } from 'react-bootstrap';
import { useConfirmModalStore } from '../../stores/confirmModalStore';

export const ConfirmModal = () => {
  const { show, title, message, onConfirm, hideModal } = useConfirmModalStore();

  const confirm = () => {
    onConfirm();
    hideModal();
  };

  return (
    <Modal show={show} onHide={hideModal} backdrop="static" centered>
      <Modal.Header closeButton>
        <Modal.Title>{title || 'Confirmação'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={hideModal}>Cancelar</Button>
        <Button variant="danger" onClick={confirm}>Confirmar</Button>
      </Modal.Footer>
    </Modal>
  );
};
