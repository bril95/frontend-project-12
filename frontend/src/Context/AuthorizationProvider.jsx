import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AuthorizationContext from './AuthorizationContext';
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

  const isAuthorized = useSelector(selectIsAuthorized);

  const login = useMemo(
    () => (token) => {
      localStorage.setItem('token', token);
      dispatch(setAuthToken(token));
      dispatch(setIsAuthorized(true));
      navigate('/');
    },
    [dispatch, navigate]
  );

  const logout = useMemo(
    () => () => {
      localStorage.removeItem('token');
      dispatch(setAuthToken(null));
      dispatch(setIsAuthorized(false));
      navigate('/login');
    },
    [dispatch, navigate]
  );

  const value = useMemo(() => ({ isAuthorized, login, logout }), [isAuthorized, login, logout]);

  return (
    <AuthorizationContext.Provider value={value}>
      {children}
    </AuthorizationContext.Provider>
  );
};

export default AuthorizationProvider;
