import { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentUsername } from '../Slice/usernameSlice';
import AuthorizationContext from '../Context/AuthorizationContext';

const useLoginUser = () => {
  const { login } = useContext(AuthorizationContext);
  const dispatch = useDispatch();

  const loginUser = ({ token, username }) => {
    dispatch(setCurrentUsername(username));
    localStorage.setItem('username', username);
    login(token);
  };

  return loginUser;
};

export default useLoginUser;
