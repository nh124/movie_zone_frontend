import { useEffect, useState } from "react";
import UserManager from "../API/UserSignUp";

const ResetPassword = (PhoneEmailVerificationForm) => {
  const [status, setStatus] = useState({});

  const { reset_password } = UserManager();

  const resetPassword = () => {
    reset_password(PhoneEmailVerificationForm)
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
    resetPassword();
  }, []);

  return status;
};
export default ResetPassword;
