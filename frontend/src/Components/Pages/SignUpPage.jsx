import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import { Container, Card, Button } from 'react-bootstrap';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { validationSignUpPage } from '../../internationalization/validation';
import { useAddUserMutation } from '../../api/usersApi';
import HeaderNavbar from '../HeaderNavbar';
import useLoginUser from '../../hooks/useLoginUser';

const SignUp = () => {
  const [addUser] = useAddUserMutation();
  const [error, setError] = useState(null);
  const { t } = useTranslation();
  const validationSchema = validationSignUpPage(t);
  const loginUser = useLoginUser();

  const initialValues = {
    username: '',
    password: '',
    confirmPassword: '',
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await addUser({ username: values.username, password: values.password });
      if (response.error && response.error.status === 409) {
        setError(t('signUpPage.errorPassword'));
      } else {
        resetForm();
        setSubmitting(false);
        loginUser(response.data);
      }
    } catch (errorRegistration) {
      console.error(errorRegistration);
      setError(t('signUpPage.errorRegistration'));
    }
  };

  return (
    <div className="h-100 bg-light">
      <div className="h-100">
        <div className="h-100" id="chat">
          <div className="d-flex flex-column h-100">
            <HeaderNavbar
              showExitButton={false}
            />
            <Container fluid className="h-100 d-flex justify-content-center align-items-center">
              <Card className="shadow-sm">
                <Card.Body className="d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
                  <div>
                    <img src="/pictures//Registration.jpg" className="rounded-circle" alt={t('signUpPage.registration')} />
                  </div>
                  <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                  >
                    {({ isSubmitting }) => (
                      <Form>
                        <h1 className="text-center mb-4">{t('signUpPage.registration')}</h1>
                        <div className="form-floating mb-3">
                          <Field
                            type="text"
                            name="username"
                            id="username"
                            placeholder={t('signUpPage.placeholder.min3max20')}
                            className="form-control"
                          />
                          <label htmlFor="username">{t('signUpPage.username')}</label>
                          <ErrorMessage name="username" component="div" className="text-danger" />
                        </div>
                        <div className="form-floating mb-3">
                          <Field
                            type="password"
                            name="password"
                            id="password"
                            placeholder={t('signUpPage.placeholder.min6')}
                            className="form-control"
                          />
                          <label htmlFor="password">{t('signUpPage.password')}</label>
                          <ErrorMessage name="password" component="div" className="text-danger" />
                        </div>
                        <div className="form-floating mb-4">
                          <Field
                            type="password"
                            name="confirmPassword"
                            id="confirmPassword"
                            placeholder={t('signUpPage.placeholder.samePassword')}
                            className="form-control"
                          />
                          <label htmlFor="confirmPassword">{t('signUpPage.confirmPassword')}</label>
                          <ErrorMessage name="confirmPassword" component="div" className="text-danger" />
                        </div>
                        <Button type="submit" disabled={isSubmitting} className="w-100 btn">
                          {t('signUpPage.signUp')}
                        </Button>
                        {error && <div className="text-danger mt-2">{error}</div>}
                      </Form>
                    )}
                  </Formik>
                </Card.Body>
              </Card>
            </Container>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
