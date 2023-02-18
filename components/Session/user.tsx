import {createContext, useState, useEffect, useContext} from 'react';
import Cookies from 'js-cookie';

const defaultValues = {
  username: '',
};

type AuthenticatedUser = typeof defaultValues

const Context = createContext<AuthenticatedUser>(defaultValues);

const Provider = ({ children }: any) => {
  const [user, setUser] = useState<AuthenticatedUser>(defaultValues);

  const userId = Cookies.get('userId');

  useEffect(() => {
    if (true) {
      const response = async () => {
        const res = await fetch(`http://localhost:3000/api/getUser?uid=1`);
        const data = await res.json();
        console.log(data)
        return data;
      }
      response();
    } else {
      setUser({ username: 'user@domain.com'});
    }
  }, []);

  return <Context.Provider value={user}>{children}</Context.Provider>
};

export const useUser = () => useContext(Context);

export default Provider;
