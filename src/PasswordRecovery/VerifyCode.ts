import { useEffect, useState } from "react";
import UserManager from "../API/UserSignUp";

const VerifyCode = (CodeVerificationForm) => {
  const [status, setStatus] = useState({});

  const { verify_code } = UserManager();

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

  useEffect(() => {
    verifyCode();
  }, []);
  return status;
};
export default VerifyCode;
