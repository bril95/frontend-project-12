import { Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next'; 

function MyModal({ show, setShowModal, handleSubmitModal, handleClose }) {
  const { t } = useTranslation();

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title> {t('modalWindow.addChannel')}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmitModal}>
          <div className="mb-3">
            <label htmlFor="channelName" className="form-label">{t('modalWindow.channelName')}</label>
            <input type="text" className="form-control" id="channelName" name="channelName" />
          </div>
          <Button variant="secondary" onClick={handleClose}>{t('modalWindow.cancel')}</Button>
          <Button variant="primary" type="submit">{t('modalWindow.submit')}</Button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default MyModal;