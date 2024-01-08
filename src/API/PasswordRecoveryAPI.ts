import { useEffect, useState } from "react";
import UserManager from "./UserSignUp";

const PasswordRecoveryAPI = (
  PhoneEmailVerificationForm,
  CodeVerificationForm,
  updatedPasswordForm,
  submitStatus
) => {
  const [status, setStatus] = useState({});

  const { reset_password, verify_code, update_password } = UserManager();

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

  const verifyCode = () => {
    verify_code(CodeVerificationForm)
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
    if (submitStatus.phoneSubmitted) resetPassword();
    if (submitStatus.verifyCodeSubmitted) verifyCode();
    if (submitStatus.updatePasswordSubmitted) updatePassword();
  }, [submitStatus]);

  return status;
};

export default PasswordRecoveryAPI;
