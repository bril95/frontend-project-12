import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthorizationContext from './AuthorizationContext';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthToken, setIsAuthorized, selectIsAuthorized } from '../Slice/authSlice';

const AuthorizationProvider = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(setAuthToken(token));
      dispatch(setIsAuthorized(true));
    }
  }, [dispatch]);

  const login = (token) => {
    localStorage.setItem('token', token);
    dispatch(setAuthToken(token));
    dispatch(setIsAuthorized(true));
    navigate('/');
  };

  const logout = () => {
    localStorage.removeItem('token');
    dispatch(setAuthToken(null));
    dispatch(setIsAuthorized(false));
    navigate('/login');
  };

  const isAuthorized = useSelector(selectIsAuthorized);

  return (
    <AuthorizationContext.Provider value={{ isAuthorized, login, logout }}>
      {children}
    </AuthorizationContext.Provider>
  );
};

export default AuthorizationProvider;