import ReactDOM from 'react-dom/client';
import init from './init';
import './index.css';

const app = () => {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(init());
};

app();
