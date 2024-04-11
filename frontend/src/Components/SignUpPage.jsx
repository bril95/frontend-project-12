import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Container, Navbar, Card, Button } from 'react-bootstrap';
import * as Yup from 'yup';
import { useAddUserMutation } from '../usersApi';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentAuthor } from '../Slice/currentAuthorSlice';

const SignUp = () => {
  const [addUser] = useAddUserMutation();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const initialValues = {
    username: '',
    password: '',
    confirmPassword: '',
  };

  const validationSchema = Yup.object({
    username: Yup.string()
      .required('Обязательное поле')
      .min(3, 'Минимум 3 символа')
      .max(20, 'Максимум 20 символов'),
    password: Yup.string()
      .required('Обязательное поле')
      .min(6, 'Минимум 6 символов'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Пароли должны совпадать')
      .required('Обязательное поле'),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await addUser({ username: values.username, password: values.password });
      if (response.error && response.error.response.status === 409) {
        setError('Пользователь уже существует');
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
      setError('Произошла ошибка при регистрации');
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
                            <h1 className="text-center mb-4">Регистрация</h1>
                            <div className="form-floating mb-3">
                              <Field
                                type="text"
                                name="username"
                                id="username"
                                placeholder="От 3 до 20 символов"
                                className="form-control"
                              />
                              <label htmlFor="username">Имя пользователя</label>
                              <ErrorMessage name="username" component="div" className="invalid-tooltip" />
                            </div>
                            <div className="form-floating mb-3">
                              <Field
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Не менее 6 символов"
                                className="form-control"
                              />
                              <label htmlFor="password">Пароль</label>
                              <ErrorMessage name="password" component="div" className="invalid-tooltip" />
                            </div>
                            <div className="form-floating mb-4">
                              <Field
                                type="password"
                                name="confirmPassword"
                                id="confirmPassword"
                                placeholder="Пароли должны совпадать"
                                className="form-control"
                              />
                              <label htmlFor="confirmPassword">Подтвердите пароль</label>
                              <ErrorMessage name="confirmPassword" component="div" className="invalid-tooltip" />
                            </div>
                            <Button type="submit" disabled={isSubmitting} className="w-100 btn btn-primary">
                              Зарегистрироваться
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
          <div className="Toastify"></div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
