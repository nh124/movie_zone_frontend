/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const GetUser = (storedToken, getData, tokenExpired, setExpiredToken) => {
  const [token, setToken] = useState("");
  const [fetch, setFetch] = useState(false);
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const removeToken = () => {
    const tokenForm = {
      token: storedToken,
    };
    setExpiredToken(storedToken, tokenForm)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
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
        .then((response) => {
          if (isMounted) {
            setUser(response.Data);
          }
        })
        .catch((error) => {
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
