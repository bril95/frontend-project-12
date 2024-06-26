import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import {
  Container, Navbar, Card, Button,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { validationSchemaLoginPage } from '../../internationalization/validation';
import { useLoginUserMutation } from '../../api/usersApi';
import useLoginUser from '../../hooks/useLoginUser';

const Login = () => {
  const [userResponse, { isLoading, isError }] = useLoginUserMutation();
  const { t } = useTranslation();
  const loginUser = useLoginUser();

  const handleSubmit = async (values) => {
    try {
      const response = await userResponse(values);
      loginUser(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="h-100 bg-light">
      <Navbar bg="light" expand="lg" className="shadow-sm">
        <Container>
          <Navbar.Brand href="/">{t('headers.hexletChat')}</Navbar.Brand>
        </Container>
      </Navbar>
      <Container fluid className="h-100 d-flex justify-content-center align-items-center">
        <Card className="shadow-sm">
          <Card.Body className="p-5">
            <div className="d-flex justify-content-center">
              <div>
                <img src="/pictures/Login.jpeg" className="rounded-circle" alt={t('loginPage.enter')} />
              </div>
              <Formik
                initialValues={{ username: '', password: '' }}
                validationSchema={validationSchemaLoginPage(t)}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form className="col-12 col-md-6">
                    <h1 className="text-center mb-4">{t('loginPage.enter')}</h1>
                    <div className="form-floating mb-3">
                      <Field
                        type="text"
                        name="username"
                        id="username"
                        className="form-control"
                        placeholder={t('loginPage.enter')}
                      />
                      <label htmlFor="username">{t('loginPage.username')}</label>
                      <ErrorMessage name="username" component="div" className="text-danger" />
                    </div>
                    <div className="form-floating mb-3">
                      <Field
                        type="password"
                        name="password"
                        id="password"
                        className="form-control"
                        placeholder={t('loginPage.password')}
                      />
                      <label className="form-label" htmlFor="password">{t('loginPage.password')}</label>
                      <ErrorMessage name="password" component="div" className="text-danger" />
                    </div>
                    <Button
                      type="submit"
                      className="w-100 mb-3"
                      disabled={isSubmitting}
                    >
                      {isLoading ? t('loginPage.isLoading') : t('loginPage.enter')}
                    </Button>
                    {isError && <div className="text-danger">{t('loginPage.error')}</div>}
                  </Form>
                )}
              </Formik>
            </div>
          </Card.Body>
          <Card.Footer className="p-4">
            <div className="text-center">
              <span>{t('loginPage.withoutAccount')}</span>
              <span> </span>
              <a href="/signup">{t('loginPage.registration')}</a>
            </div>
          </Card.Footer>
        </Card>
      </Container>
    </div>
  );
};

export default Login;
