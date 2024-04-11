import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Container, Navbar, Card, Button } from 'react-bootstrap';
import * as Yup from 'yup';
import { useLoginUserMutation } from '../usersApi';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCurrentAuthor } from '../Slice/currentAuthorSlice';

const Login = () => {
  const [loginUser, { isLoading, isError }] = useLoginUserMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (values) => {
    try {
      const response = await loginUser(values);
      const userToken = response.data.token;
      localStorage.setItem('token', userToken);
      dispatch(setCurrentAuthor(values.username));
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="h-100 bg-light">
      <Navbar bg="light" expand="lg" className="shadow-sm">
        <Container>
          <Navbar.Brand href="/">Hexlet Chat</Navbar.Brand>
        </Container>
      </Navbar>
      <Container fluid className="h-100 d-flex justify-content-center align-items-center">
        <Card className="shadow-sm">
          <Card.Body className="p-5">
            <div className="d-flex justify-content-center">
              <Formik
                initialValues={{ username: '', password: '' }}
                validationSchema={Yup.object({
                  username: Yup.string().required('Обязательное поле'),
                  password: Yup.string().required('Обязательное поле'),
                })}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form className="col-12 col-md-6">
                    <h1 className="text-center mb-4">Войти</h1>
                    <div className="mb-3">
                      <Field
                        type="text"
                        name="username"
                        id="username"
                        className="form-control"
                        placeholder="Ваш ник"
                      />
                      <ErrorMessage name="username" component="div" className="text-danger" />
                    </div>
                    <div className="mb-4">
                      <Field
                        type="password"
                        name="password"
                        id="password"
                        className="form-control"
                        placeholder="Пароль"
                      />
                      <ErrorMessage name="password" component="div" className="text-danger" />
                    </div>
                    <Button
                      type="submit"
                      className="w-100 mb-3"
                      disabled={isSubmitting}
                    >
                      {isLoading ? 'В процессе...' : 'Войти'}
                    </Button>
                    {isError && <div className="text-danger">Неверные имя пользователя или пароль</div>}
                  </Form>
                )}
              </Formik>
            </div>
          </Card.Body>
          <Card.Footer className="p-4">
            <div className="text-center">
              <span>Нет аккаунта?</span> <a href="/signup">Регистрация</a>
            </div>
          </Card.Footer>
        </Card>
      </Container>
    </div>
  );
};

export default Login;
