import { useEffect, useState } from "react";
import UserManager from "../API/UserSignUp";
type finalPasswordType = {
  email: string;
  password: string;
};

const UpdatePassword = (updatedPasswordForm: finalPasswordType) => {
  const [status, setStatus] = useState({});

  const { update_password } = UserManager();

  const updatePassword = () => {
    update_password(updatedPasswordForm)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        const { status, data } = error.response;
        setStatus({
          states: status,
          message: data.error,
        });
      });
  };
  useEffect(() => {
    updatePassword();
  }, []);

  return status;
};
export default UpdatePassword;
