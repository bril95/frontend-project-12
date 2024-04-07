import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './createStore';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginPage from './Components/LoginPage';
import NotFoundPage from './Components/NotFoundPage';
import ChatMainPage from './Components/ChatMainPage';
import SignUpPage from './Components/SignUpPage';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<ChatMainPage />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
