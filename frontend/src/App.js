import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import store from './api/createStore';
import LoginPage from './Components/LoginPage';
import NotFoundPage from './Components/NotFoundPage';
import ChatMainPage from './Components/ChatMainPage';
import SignUpPage from './Components/SignUpPage';
import routes from './api/routes';
import 'react-toastify/dist/ReactToastify.css';

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path={routes.pages.loginPage()} element={<LoginPage />} />
        <Route path={routes.pages.chatMainPage()} element={<ChatMainPage />} />
        <Route path={routes.pages.notFoundPage()} element={<NotFoundPage />} />
        <Route path={routes.pages.signUpPage()} element={<SignUpPage />} />
      </Routes>
    </BrowserRouter>
    <ToastContainer />
  </Provider>
);

export default App;
