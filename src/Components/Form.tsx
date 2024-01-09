import { useEffect, useState } from "react";
import formDictionary from "../Rawfiles/Forms";
type status = {
  status: string;
  message: string;
};
const Form = ({
  formType,
  onSubmit,
  onChange,
  formValues,
  setPasswordRecovery,
  submitStatus,
}: {
  formType: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  formValues: any;
  setPasswordRecovery: null | React.Dispatch<React.SetStateAction<boolean>>;
  submitStatus: status | undefined;
}) => {
  const {
    registration,
    login,
    phoneVerify,
    verificationCode,
    passwordRecovery,
  } = formDictionary();
  const getFormType = (formType: string) => {
    if (formType === "Register") {
      return registration;
    } else if (formType === "Login") {
      return login;
    } else if (formType === "Send") {
      return phoneVerify;
    } else if (formType === "Verify") {
      return verificationCode;
    } else if (formType === "Recovery") {
      return passwordRecovery;
    }
  };
  const [status, setStatus] = useState({
    status: "",
    message: "",
  });
  const currentForm = getFormType(formType);

  useEffect(() => {
    if (
      submitStatus !== undefined &&
      submitStatus.status !== "" &&
      submitStatus.message !== ""
    ) {
      setStatus(submitStatus);
    }
  }, [submitStatus]);

  if (currentForm === undefined) return;

  return (
    <div className="w-full h-full flex items-center flex-col">
      <form
        action=""
        className="flex flex-col gap-3 w-[80%] h-auto py-6"
        onSubmit={(e) => onSubmit(e)}
      >
        {status.status !== "200" && status.message !== "" && (
          <span className="text-red-400 font-bold">{status.message}</span>
        )}

        {currentForm.map((form) => {
          const { name, placeholder, type } = form;
          return (
            <div className="flex flex-col" key={form.id}>
              <label htmlFor={name}>{name}</label>
              <input
                onChange={onChange}
                type={type}
                name={name}
                value={formValues[name.toLowerCase()]} // Use dynamic property access
                id={name}
                maxLength={form?.maxLength}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:outline-none"
                placeholder={placeholder}
                required
              />
            </div>
          );
        })}
        <div className="w-full h-auto py-4 flex justify-center">
          <input
            type="Submit"
            className="w-full rounded-md py-2 bg-[#2463EB] text-white hover:cursor-pointer"
          />
        </div>
      </form>
      {setPasswordRecovery !== null && (
        <div>
          {formType === "Login" && (
            <button
              className="text-[#0077F6] font-bold hover:underline w-full"
              onClick={() => setPasswordRecovery(true)}
            >
              Forgot password
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Form;
