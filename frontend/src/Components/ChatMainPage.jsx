import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const MainPage = () => {
  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem('token'));

  useEffect(() => {
    if (token === null) {
      navigate("/login");
    }
  }, [token, navigate]);

  return (
    <>
      <h3>Основная страница чата</h3>
    </>
  );
};

export default MainPage;
