import { createContext } from 'react';

export default createContext({
  isAuthorized: false,
  login: () => {},
  logout: () => {},
});
