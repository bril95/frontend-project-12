import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Container, Navbar, Card, Button } from 'react-bootstrap';
import * as Yup from 'yup';
import { useAddUserMutation } from '../usersApi';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const SignUp = () => {
  const [addUser] = useAddUserMutation();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

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
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      setError('Произошла ошибка при регистрации');
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
          <Card.Body className="d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
            <div>
              <img src="" className="rounded-circle" alt="Регистрация" />
            </div>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form className="w-50">
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
                    <ErrorMessage name="username" component="div" className="text-danger" />
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
                    <ErrorMessage name="password" component="div" className="text-danger" />
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
                    <ErrorMessage name="confirmPassword" component="div" className="text-danger" />
                  </div>
                  <Button type="submit" disabled={isSubmitting} className="w-100 btn btn-outline-primary">
                    Зарегистрироваться
                  </Button>
                  {error && <div className="text-danger mt-2">{error}</div>}
                </Form>
              )}
            </Formik>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default SignUp;
