import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import { store } from './api/createStore';
import LoginPage from './Components/LoginPage';
import NotFoundPage from './Components/NotFoundPage';
import ChatMainPage from './Components/ChatMainPage';
import SignUpPage from './Components/SignUpPage';
import { I18nextProvider } from 'react-i18next';
import i18n from './Internationalization/i18n';
import routes from './api/routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';

const rollbarConfig = {
  accessToken: 'a29abbb6aa3a4fde90c839d9a64dad50',
  environment: 'testenv',
};

const App = () => {
  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <RollbarProvider config={rollbarConfig}>
          <ErrorBoundary>
            <BrowserRouter>
              <Routes>
                <Route path={routes.pages.loginPage()} element={<LoginPage />} />
                <Route path={routes.pages.chatMainPage()} element={<ChatMainPage />} />
                <Route path={routes.pages.notFoundPage()} element={<NotFoundPage />} />
                <Route path={routes.pages.signUpPage()} element={<SignUpPage />} />
              </Routes>
            </BrowserRouter>
          </ErrorBoundary>
        </RollbarProvider>
        <ToastContainer />
      </I18nextProvider>
    </Provider>
  );
}

export default App;
