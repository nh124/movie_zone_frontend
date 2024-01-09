/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type tokenForm = {
  token: string;
};
type SetExpiredTokenFunction = (
  token: string,
  formData: tokenForm
) => Promise<void>;

type responseType = {
  Data: {
    id: number;
    name: string;
    email: string;
    phone: string;
  };
};
type GetDataType = (token: string) => Promise<responseType>;
const GetUser = (
  storedToken: string | undefined,
  getData: GetDataType,
  tokenExpired: boolean | undefined,
  setExpiredToken: SetExpiredTokenFunction
) => {
  const [token, setToken] = useState("");
  const [fetch, setFetch] = useState(false);
  const [user, setUser] = useState({
    id: 0,
    email: "",
    name: "",
    phone: "",
  });
  const navigate = useNavigate();
  const removeToken = () => {
    if (storedToken === undefined) return;
    const tokenForm = {
      token: storedToken,
    };
    setExpiredToken(storedToken, tokenForm)
      .then(() => {
        // console.log(response);
      })
      .catch(() => {
        // console.log(error);
      });
    navigate("/");
    localStorage.removeItem("token");
  };

  useEffect(() => {
    if (storedToken === null || storedToken === undefined || tokenExpired) {
      setToken("");
      return;
    }
    if (storedToken !== token) {
      setFetch(false);
      setToken(storedToken);
    }
  }, [getData, storedToken, token, tokenExpired]);

  useEffect(() => {
    let isMounted = true;
    if (!token || token === "" || token === null || tokenExpired) {
      return () => {
        isMounted = false;
      };
    }
    if (!fetch) {
      getData(token)
        .then((response: responseType) => {
          if (isMounted) {
            setUser(response.Data);
          }
        })
        .catch(() => {
          removeToken();
        })
        .finally(() => {
          if (isMounted) {
            setFetch(true);
          }
        });
    }
    return () => {
      isMounted = false;
    };
  }, [token, getData, fetch, tokenExpired, removeToken]);

  return user;
};

export default GetUser;
