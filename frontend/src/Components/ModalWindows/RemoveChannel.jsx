import { Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const DeleteChannelModal = ({ show, handleClose, handleDelete }) => {
  const { t } = useTranslation();

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('modalWindows.deleteChannel.deleteChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('modalWindows.deleteChannel.confirmation')}</p>
        <div className="d-flex justify-content-end">
          <Button variant="secondary" onClick={handleClose} className="me-2">
            {t('modalWindows.cancel')}
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            {t('modalWindows.deleteChannel.delete')}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default DeleteChannelModal;
