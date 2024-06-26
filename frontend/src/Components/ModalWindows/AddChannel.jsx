import { Modal, Button, Form } from 'react-bootstrap';
import { Formik, ErrorMessage } from 'formik';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { validationSchemaChat } from '../../internationalization/validation';
import { selectChannelsName } from '../../Selectors/channelsSelectors';

const AddChannel = ({ show, handleSubmitModal, handleClose }) => {
  const { t } = useTranslation();
  const channelsName = useSelector(selectChannelsName);

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('modalWindows.addChannel.addChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{ channelName: '' }}
          validationSchema={validationSchemaChat(t, channelsName)}
          onSubmit={handleSubmitModal}
        >
          {({
            handleSubmit, handleChange,
            values, errors, touched,
          }) => (
            <Form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="channelName" className="form-label">{t('modalWindows.addChannel.channelName')}</label>
                <input
                  type="text"
                  className={`form-control ${errors.channelName && touched.channelName ? 'is-invalid' : ''}`}
                  id="channelName"
                  name="channelName"
                  value={values.channelName}
                  onChange={handleChange}
                />
                <ErrorMessage name="channelName" component="div" className="invalid-feedback" />
              </div>
              <div className="d-flex justify-content-between">
                <Button variant="secondary" onClick={handleClose}>{t('modalWindows.cancel')}</Button>
                <Button variant="primary" type="submit">{t('modalWindows.submit')}</Button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default AddChannel;
