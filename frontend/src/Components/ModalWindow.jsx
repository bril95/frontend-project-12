import { Modal, Button, Form, } from 'react-bootstrap';
import { Formik, ErrorMessage } from 'formik';
import { useTranslation } from 'react-i18next';
import validationSchemaNewChat from '../validation'

function MyModal({ show, setShowModal, handleSubmitModal, handleClose }) {
  const { t } = useTranslation();

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('modalWindow.addChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{ channelName: '' }}
          validationSchema={validationSchemaNewChat(t)}
          onSubmit={handleSubmitModal}
        >
          {({ handleSubmit, handleChange, values, errors, touched }) => (
            <Form onSubmit={handleSubmit}>
              <div className='mb-3'>
                <label htmlFor='channelName' className='form-label'>{t('modalWindow.channelName')}</label>
                <input
                  type='text'
                  className={`form-control ${errors.channelName && touched.channelName ? 'is-invalid' : ''}`}
                  id='channelName'
                  name='channelName'
                  value={values.channelName}
                  onChange={handleChange}
                />
                <ErrorMessage name='channelName' component='div' className='invalid-feedback' />
              </div>
              <Button variant='secondary' onClick={handleClose}>{t('modalWindow.cancel')}</Button>
              <Button variant='primary' type='submit'>{t('modalWindow.submit')}</Button>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default MyModal;
