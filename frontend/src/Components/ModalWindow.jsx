import { Modal, Button } from 'react-bootstrap';

function MyModal({ show, setShowModal, handleSubmitModal, handleClose }) {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Добавить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmitModal}>
          <div className="mb-3">
            <label htmlFor="channelName" className="form-label">Имя канала</label>
            <input type="text" className="form-control" id="channelName" name="channelName" />
          </div>
          <Button variant="secondary" onClick={handleClose}>Отмена</Button>
          <Button variant="primary" type="submit">Отправить</Button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default MyModal;