import { useState } from "react";
import Form from "./Form";

const PasswordRecoveryProcess = ({
  name,
  onSubmit,
  onChange,
  formValues,
}: {
  name: string;
  onSubmit: any;
  onChange: any;
  formValues: any;
}) => {
  const [submitStatus] = useState({
    status: "",
    message: "",
  });
  return (
    <div className="flex-shrink-0 w-full">
      {name === "Verify" && (
        <span className="w-[80%] text-center">
          Please enter the 6 digit code sent to this phone number ***-***-0607
        </span>
      )}
      {name === "Recovery" && (
        <span className="w-[80%] text-center">Enter your new password</span>
      )}
      <Form
        formType="phoneVerify"
        onSubmit={onSubmit}
        onChange={onChange}
        formValues={formValues}
        setPasswordRecovery={null}
        submitStatus={submitStatus}
      />
    </div>
  );
};

export default PasswordRecoveryProcess;
