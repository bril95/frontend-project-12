import {
  Formik, Form,
  Field, ErrorMessage,
} from 'formik';
import {
  Container, Navbar,
  Card, Button,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { setCurrentAuthor } from '../Slice/currentAuthorSlice';
import { validationSignUpPage } from '../Internationalization/validation';
import { useAddUserMutation } from '../api/usersApi';

const SignUp = () => {
  const [addUser] = useAddUserMutation();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const validationSchema = validationSignUpPage(t);

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
        const userToken = response.data.token;
        localStorage.setItem('token', userToken);
        dispatch(setCurrentAuthor(values.username));
        navigate('/');
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
            <Navbar bg="light" expand="lg" className="shadow-sm">
              <Container>
                <Navbar.Brand href="/">Hexlet Chat</Navbar.Brand>
              </Container>
            </Navbar>
            <Container fluid className="h-100 d-flex justify-content-center align-items-center">
              <Card className="shadow-sm">
                <Card.Body className="d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
                  <div>
                    <img src="/pictures//Registration.jpg" className="rounded-circle" alt="Регистрация" />
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
