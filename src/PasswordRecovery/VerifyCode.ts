import { useEffect, useState } from "react";
import UserManager from "../API/UserSignUp";

type CodeVerificationFormType = { email: ""; verification_code: "" };
const VerifyCode = (CodeVerificationForm: CodeVerificationFormType) => {
  const [status, setStatus] = useState({});

  const { verify_code } = UserManager();

  const verifyCode = () => {
    verify_code(CodeVerificationForm).catch((error) => {
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
