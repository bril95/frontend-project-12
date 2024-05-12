import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Container, Navbar, Card, Button } from 'react-bootstrap';
import * as Yup from 'yup';
import { useAddUserMutation } from '../usersApi';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentAuthor } from '../Slice/currentAuthorSlice';
import { useTranslation } from 'react-i18next';

const SignUp = () => {
  const [addUser] = useAddUserMutation();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const initialValues = {
    username: '',
    password: '',
    confirmPassword: '',
  };

  const validationSchema = Yup.object({
    username: Yup.string()
      .required(t('schema.requiredField'))
      .min(3, t('schema.min3'))
      .max(20, t('schema.max20')),
    password: Yup.string()
      .required(t('schema.requiredField'))
      .min(6, t('schema.min6')),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], t('schema.samePassword'))
      .required(t('schema.requiredField')),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await addUser({ username: values.username, password: values.password });
      if (response.error && response.error.response.status === 409) {
        setError(t('signUpPage.errorPassword'));
      } else {
        resetForm();
        setSubmitting(false);
        const userToken = response.data.token;
        localStorage.setItem('token', userToken);
        dispatch(setCurrentAuthor(values.username));
        navigate("/");
      }
    } catch (error) {
      console.error(error);
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
            <Container fluid className="h-100">
              <div className="row justify-content-center align-content-center h-100">
                <div className="col-12 col-md-8 col-xxl-6">
                  <Card className="shadow-sm">
                    <Card.Body className="d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
                      <div><img src="/Registration.jpg" className="rounded-circle" alt="Регистрация" /></div>
                      <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                      >
                        {({ isSubmitting }) => (
                          <Form className="w-50" noValidate>
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
                              <ErrorMessage name="username" component="div" className="invalid-tooltip" />
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
                              <ErrorMessage name="password" component="div" className="invalid-tooltip" />
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
                              <ErrorMessage name="confirmPassword" component="div" className="invalid-tooltip" />
                            </div>
                            <Button type="submit" disabled={isSubmitting} className="w-100 btn btn-primary">
                            {t('signUpPage.signUp')}
                            </Button>
                            {error && <div className="text-danger mt-2">{error}</div>}
                          </Form>
                        )}
                      </Formik>
                    </Card.Body>
                  </Card>
                </div>
              </div>
            </Container>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
