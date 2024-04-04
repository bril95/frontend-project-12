import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useLoginUserMutation } from '../usersApi';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const [loginUser, { isLoading, isError }] = useLoginUserMutation();
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      const response = await loginUser(values);
      const userToken = response.data.token;
      localStorage.setItem('token', userToken);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-items-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <Formik
                  initialValues={{ username: '', password: '' }}
                  validationSchema={Yup.object({
                    username: Yup.string().required('Required'),
                    password: Yup.string().required('Required'),
                  })}
                  onSubmit={handleSubmit}
                >
                  {({ isSubmitting }) => (
                    <Form className="col-12 col-md-6 mt-3 mt-md-0">
                      <h1 className="text-center mb-4">Войти</h1>
                      <div className="form-floating mb-3">
                        <Field
                          type="text"
                          name="username"
                          id="username"
                          className="form-control"
                          placeholder="Ваш ник"
                        />
                        <label htmlFor="username">Ваш ник</label>
                        <ErrorMessage name="username" component="div" className="text-danger" />
                      </div>
                      <div className="form-floating mb-4">
                        <Field
                          type="password"
                          name="password"
                          id="password"
                          className="form-control"
                          placeholder="Пароль"
                        />
                        <label htmlFor="password">Пароль</label>
                        <ErrorMessage name="password" component="div" className="text-danger" />
                      </div>
                      <button
                        type="submit"
                        className="w-100 mb-3 btn btn-outline-primary"
                        disabled={isSubmitting}
                      >
                        {isLoading ? 'В процессе...' : 'Войти'}
                      </button>
                      {isError && <div className="text-danger">Ошибка входа</div>}
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
            <div className="card-footer p-4">
              <div className="text-center">
                <span>Нет аккаунта?</span> <a href="/signup">Регистрация</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;