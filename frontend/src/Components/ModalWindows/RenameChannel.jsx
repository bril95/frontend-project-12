import { Modal, Button, Form } from 'react-bootstrap';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import { validationSchemaChat } from '../../Internationalization/validation'
import { useSelector } from 'react-redux';
import { selectChannels } from '../../Slice/channelsSlice';

const RenameChannelModal = ({ show, handleClose, handleRename, initialValues }) => {
  const { t } = useTranslation();
  const channelsStore = useSelector(selectChannels);
  const channelsName = channelsStore.map(channels => channels.name)

  const handleSubmit = (values) => {
    handleRename(values.channelName);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('modalWindows.renameChannel.renameChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{ channelName: initialValues ? initialValues.name : '' }}
          onSubmit={handleSubmit}
          validationSchema={validationSchemaChat(t, channelsName)}
        >
          {({ handleSubmit, handleChange, values, errors, touched }) => (
            <Form onSubmit={handleSubmit}>
              <div className='mb-3'>
                <label htmlFor='newName' className='form-label'>{t('modalWindows.renameChannel.newName')}</label>
                <input
                  type='text'
                  className={`form-control ${errors.channelName && touched.channelName ? 'is-invalid' : ''}`}
                  id='channelName'
                  name='channelName'
                  value={values.channelName}
                  onChange={handleChange}
                />
                <div className='invalid-feedback'>{errors.channelName}</div>
              </div>
              <div className='d-flex justify-content-between'>
                <Button variant='secondary' onClick={handleClose}>{t('modalWindows.cancel')}</Button>
                <Button variant='primary' type='submit'>{t('modalWindows.submit')}</Button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default RenameChannelModal;