import {createContext, useState, useEffect, useContext} from 'react';
import Cookies from 'js-cookie';

const defaultValues = {
  id: '',
  username: '',
};

type AuthenticatedUser = typeof defaultValues

export const userContext = createContext<AuthenticatedUser>(defaultValues);

const Provider = ({ children }: any) => {
  const [user, setUser] = useState<AuthenticatedUser>(defaultValues);

  const userId = Cookies.get('user');

  useEffect(() => {
    if (userId) {
      const response = async () => {
        const res = await fetch(`http://localhost:3000/api/getUser?uid=${userId}`);
        const data = await res.json();
        setUser({
          ...user,
          id: userId,
          username: data.username,
        });
      }
      response();
    }
  }, [userId, user]);

  return <userContext.Provider value={user}>{children}</userContext.Provider>
};

export const useUser = () => useContext(userContext);

export default Provider;
