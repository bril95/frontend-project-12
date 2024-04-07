import { Formik, Form, Field, ErrorMessage } from 'formik';
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
      <div className="h-100" id="chat">
        <div className="d-flex flex-column h-100">
          <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
            <div className="container">
              <a className="navbar-brand" href="/">Hexlet Chat</a>
            </div>
          </nav>
          <div className="container-fluid h-100">
            <div className="row justify-content-center align-content-center h-100">
              <div className="col-12 col-md-8 col-xxl-6">
                <div className="card shadow-sm">
                  <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
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
                          <button type="submit" disabled={isSubmitting} className="w-100 btn btn-outline-primary">Зарегистрироваться</button>
                          {error && <div className="text-danger mt-2">{error}</div>}
                        </Form>
                      )}
                    </Formik>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
