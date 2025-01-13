import { useEffect, useState } from "react";
import UserManager from "../API/UserSignUp";
type PhoneEmailVerificationFormType = {
  email: string;
  phone: string;
};
const ResetPassword = (
  PhoneEmailVerificationForm: PhoneEmailVerificationFormType
) => {
  const [status, setStatus] = useState({});

  const { reset_password } = UserManager();

  const resetPassword = () => {
    reset_password(PhoneEmailVerificationForm).catch((error) => {
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
