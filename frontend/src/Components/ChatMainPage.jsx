import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetChannelsQuery } from '../usersApi';
import { useDispatch } from 'react-redux';
import { setAuthToken } from '../Slice/authSlice';

const MainPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token !== null) {
      dispatch(setAuthToken(token));
    }
  }, [token, dispatch]);

  const { data, error } = useGetChannelsQuery();

  useEffect(() => {
    if (token === null) {
      navigate("/login");
    }
  
    if (error) {
      console.error(error);
    }
  
    if (data) {
      console.log(data);
    }
  }, [token, navigate, error, data]);

  return (
    <>
      <h3>Основная Страница</h3>
    </>
  );
};

export default MainPage;
