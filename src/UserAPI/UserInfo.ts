import { useEffect, useState } from "react";
import UserInformationManager from "../API/UserInformationManager";

const UserInfo = (token) => {
  const { get_user } = UserInformationManager();
  const [userInfo, setUserInfo] = useState({});
  const [error, setError] = useState({});
  const getUser = () => {
    get_user(token)
      .then((response) => {
        setUserInfo(response.Data);
      })
      .catch((error) => {
        setError({
          error: error?.name,
        });
        console.log(error);
      });
  };
  useEffect(() => {
    if (token !== null) getUser();
  }, [token]);

  return { userInfo, error };
};

export default UserInfo;
