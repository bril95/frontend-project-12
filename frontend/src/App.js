import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import PageLogin from './Components/PageLogin';
import Page404 from './Components/Page404';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<PageLogin />} />
        <Route path="/*" element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
