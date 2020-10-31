import { createContext } from 'react';

const auth = createContext({
  user: null,
  loggedIn: false,
  login: () => {},
  logOut: () => {},
});

export default auth;
