import { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

export const LoginContext = createContext<{
  username?: string,
  setUsername?: (username: string) => void,
  userId?: number,
  setUserId?: (userId: number) => void,
}>({});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState(0);

  useEffect(() => {
    if(!userId) {
      setUserId(Number(Cookies.get('user')));
    }

    if (userId) {
      const response = async () => {
        const res = await fetch(`/api/getUser?uid=${userId}`);
        const data = await res.json();
        setUsername(data.username);
      }
      response();
    }
  }, [userId, username]);

  return <LoginContext.Provider value={{ username, setUsername, userId, setUserId }}>
    {children}
  </LoginContext.Provider>
};

export default AuthProvider;
