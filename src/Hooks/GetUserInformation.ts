import { useEffect, useState } from "react";
import UserInformationManager from "../API/UserInformationManager";
import GetUser from "./GetUser";

const GetUserInformation = () => {
  const { get_user, setExpiredToken } = UserInformationManager();
  const storedTokenObject = localStorage.getItem("token");
  type user = {
    storedToken: string | null;
    user: any;
  };
  const [userInfo, setUserInfo] = useState({});
  type TokenInfo = {
    storedToken: string | undefined;
    tokenExpired: boolean | undefined;
  };

  const getToken = (): TokenInfo => {
    if (storedTokenObject === null) {
      return {
        storedToken: undefined,
        tokenExpired: undefined,
      };
    }

    const storedTokenJson = JSON.parse(storedTokenObject);
    const storedToken = storedTokenJson?.token;
    const tokenExpired = storedTokenJson?.expired;
    return { storedToken, tokenExpired };
  };
  const { storedToken, tokenExpired } = getToken();
  const user = GetUser(storedToken, get_user, tokenExpired, setExpiredToken);

  useEffect(() => {
    setUserInfo(user);
  }, [user]);

  return userInfo;
};

export default GetUserInformation;
