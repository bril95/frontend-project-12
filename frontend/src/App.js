import {
  BrowserRouter, Routes, Route, Navigate,
} from 'react-router-dom';
import { useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';
import LoginPage from './Components/LoginPage';
import NotFoundPage from './Components/NotFoundPage';
import ChatMainPage from './Components/ChatMainPage';
import SignUpPage from './Components/SignUpPage';
import routes from './api/routes';
import 'react-toastify/dist/ReactToastify.css';
import AuthorizationProvider from './Context/AuthorizationProvider';
import AuthorizationContext from './Context/AuthorizationContext';

const ProtectedRoute = ({ element }) => {
  const { isAuthorized } = useContext(AuthorizationContext);

  return isAuthorized ? element : <Navigate to={routes.pages.loginPage()} replace />;
};

const App = () => (
  <BrowserRouter>
    <AuthorizationProvider>
      <Routes>
        <Route path={routes.pages.loginPage()} element={<LoginPage />} />
        <Route path={routes.pages.signUpPage()} element={<SignUpPage />} />
        <Route path="/" element={<ProtectedRoute element={<ChatMainPage />} />} />
        <Route
          path={routes.pages.chatMainPage()}
          element={<ProtectedRoute element={<ChatMainPage />} />}
        />
        <Route path={routes.pages.notFoundPage()} element={<NotFoundPage />} />
      </Routes>
    </AuthorizationProvider>
    <ToastContainer />
  </BrowserRouter>
);

export default App;
