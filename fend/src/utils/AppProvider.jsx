import React, { createContext, useContext, useState} from 'react';
import { useNavigate } from 'react-router-dom';

const AppContext = createContext();

export const AppProvider = ({ children }) => {

  const [auth, setAuth] = useState(false);
  const [message, setMessage] = useState('');
  const [firstname, setFirstname] = useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  const userData = [auth,message,firstname,role]

  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios
      .get("http://localhost:8081/user")
      .then((res) => {
        if (res.data.Status === "OK") {
          setAuth(true);
          setFirstname(res.data.firstname);
          setRole(res.data.role);
        } else {
          setAuth(false);
          setMessage(res.data.Error);
          navigate("/");
        }
      })
      .then((err) => console.log(err));
  }, []);

  return (
    <AppContext.Provider value={{ userData }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);