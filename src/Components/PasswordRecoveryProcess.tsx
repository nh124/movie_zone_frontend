import React from "react";
import { Form } from "react-router-dom";

const PasswordRecoveryProcess = ({ name, onSubmit, onChange, formValues }) => {
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
      />
    </div>
  );
};

export default PasswordRecoveryProcess;
