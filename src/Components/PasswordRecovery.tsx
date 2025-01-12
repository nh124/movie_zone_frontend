import { IoMdClose } from "react-icons/io";
import logo from "../assets/logo.png";
import Form from "./Forms/Form";
import { FormEvent, useEffect, useState } from "react";
import UserManager from "../API/UserSignUp";
import checkLogo from "../assets/Eo_circle_green_checkmark.svg.png";

const PasswordRecovery = ({
  passwordRecovery,
  setPasswordRecovery,
  setShowLoading,
  setSignUpChoice,
}: {
  passwordRecovery: boolean;
  setPasswordRecovery: React.Dispatch<React.SetStateAction<boolean>>;
  setShowLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setSignUpChoice: React.Dispatch<React.SetStateAction<string>>;
}) => {
  type CodeVerificationFormType = { email: ""; verification_code: "" };
  const Steps = [
    { no: 1, step: "Send" },
    { no: 2, step: "Verify" },
    { no: 3, step: "Recovery" },
  ];
  const [status, setStatus] = useState({
    status: "",
    message: "",
  });
  const [PhoneEmailVerification, setPhoneEmailVerification] = useState({
    email: "",
    phone: "",
  });
  const { reset_password, verify_code, update_password } = UserManager();

  const [submitStatus, setSubmitStatus] = useState({
    phoneSubmitted: false,
    verifyCodeSubmitted: false,
    updatePasswordSubmitted: false,
  });

  const [currentStep, setCurrentStep] = useState({ no: 1, step: "Send" });

  const [code, setCode] = useState<CodeVerificationFormType>({
    email: "",
    verification_code: "",
  });
  const [newPassword, setNewPassword] = useState({
    password: "",
    confirmPassword: "",
  });
  const [finalPassword, setFinalPassword] = useState({
    email: "",
    password: "",
  });

  const setDefault = () => {
    setShowLoading(false);
    setPasswordRecovery(false);
    setSignUpChoice("Login");
    setCurrentStep({ no: 1, step: "Send" });
    setCode({ email: "", verification_code: "" });
    setNewPassword({
      password: "",
      confirmPassword: "",
    });
    setFinalPassword({
      email: "",
      password: "",
    });
    setSubmitStatus({
      phoneSubmitted: false,
      verifyCodeSubmitted: false,
      updatePasswordSubmitted: false,
    });
    setPhoneEmailVerification({
      email: "",
      phone: "",
    });
    setStatus({
      status: "",
      message: "",
    });
  };

  useEffect(() => {
    if (newPassword.password !== newPassword.confirmPassword) {
      setStatus({
        status: "300",
        message: "Password does not match",
      });
    } else {
      setStatus({
        status: "",
        message: "",
      });
    }
  }, [newPassword]);

  useEffect(() => {
    const { email, phone } = PhoneEmailVerification;
    if (email === "" || phone === "") return;
    if (submitStatus.phoneSubmitted) {
      reset_password(PhoneEmailVerification)
        .then(() => {
          setCurrentStep({ no: 2, step: "Verify" });
          setStatus({
            status: "",
            message: "",
          });
        })
        .catch((error) => {
          const { status, data } = error.response;
          console.log(status, data);
          setStatus({
            status: status,
            message: data.error,
          });
        });
      setSubmitStatus((prevForm) => ({
        ...prevForm,
        phoneSubmitted: false,
      }));
    }
  }, [PhoneEmailVerification, submitStatus, reset_password]);

  useEffect(() => {
    const { email, verification_code } = code;
    if (email === "" || verification_code === "") return;
    if (submitStatus.verifyCodeSubmitted) {
      verify_code(code)
        .then(() => {
          setCurrentStep({ no: 3, step: "Recovery" });
          setStatus({
            status: "",
            message: "",
          });
        })
        .catch((error) => {
          const { status, data } = error.response;
          // console.log(status, data.message);
          setStatus({
            status: status,
            message: data.message,
          });
        });
      setSubmitStatus((prevForm) => ({
        ...prevForm,
        verifyCodeSubmitted: false,
      }));
    }
  }, [code, submitStatus, verify_code]);

  useEffect(() => {
    const { email, password } = finalPassword;
    if (email === "" || password === "") return;
    if (
      submitStatus.updatePasswordSubmitted &&
      newPassword.password === newPassword.confirmPassword
    ) {
      update_password(finalPassword)
        .then(() => {
          setCurrentStep({ no: 4, step: "Completed" });
          setStatus({
            status: "",
            message: "",
          });
        })
        .catch((error) => {
          const { status, data } = error.response;
          console.log(status, data);
          setStatus({
            status: status,
            message: data.error,
          });
        });

      setSubmitStatus((prevForm) => ({
        ...prevForm,
        updatePasswordSubmitted: false,
      }));
    }
  }, [finalPassword, submitStatus, update_password]);

  const onChangePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPhoneEmailVerification((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };
  // const onChangeCode = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { value } = e.target;
  //   setCode((prevForm) => ({
  //     ...prevForm,
  //     verification_code: value,
  //   }));
  // };

  const onChangeCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setCode(
      (prevForm) =>
        ({
          ...prevForm,
          verification_code: value,
        } as CodeVerificationFormType)
    );
  };
  const onChangeNewPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewPassword((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const passwordRecoveryComplete = () => {
    setPasswordRecovery(false);
    setSignUpChoice("Login");
  };
  const onSubmitPhone = (event: FormEvent) => {
    // setCurrentStep({ no: 2, step: "Verify" });
    event.preventDefault();
    setSubmitStatus((prevForm) => ({
      ...prevForm,
      phoneSubmitted: true,
    }));
  };
  // const onSubmitCode = (event: React.FormEvent) => {
  //   event.preventDefault();
  //   setCode((prevForm) => ({
  //     ...prevForm,
  //     email: PhoneEmailVerification.email,
  //   }));
  //   console.log("code submission before");
  //   setSubmitStatus((prevForm) => ({
  //     ...prevForm,
  //     verifyCodeSubmitted: true,
  //   }));
  // };
  const onSubmitCode = (event: React.FormEvent) => {
    event.preventDefault();
    // setCode((prevForm) => ({
    //   ...prevForm,
    //   email: PhoneEmailVerification.email,
    // }));
    setCode(
      (prevForm) =>
        ({
          ...prevForm,
          email: PhoneEmailVerification.email,
        } as CodeVerificationFormType)
    );

    console.log("code submission before");
    setSubmitStatus((prevForm) => ({
      ...prevForm,
      verifyCodeSubmitted: true,
    }));
  };
  const onNewPasswordSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const { password, confirmPassword } = newPassword;
    if (password === confirmPassword) {
      setFinalPassword({
        email: PhoneEmailVerification.email,
        password: password,
      });
      setSubmitStatus((prevForm) => ({
        ...prevForm,
        updatePasswordSubmitted: true,
      }));
    }
  };

  return (
    <div
      className={`absolute w-full h-full bg-[#1F2937] top-0 left-0 z-20 duration-300 ${
        passwordRecovery ? "translate-y-0" : "translate-y-[100%]"
      } `}
    >
      <div className="w-full h-full relative">
        <div className="absolute top-0 right-0 group">
          <button className="px-3 py-3" onClick={() => setDefault()}>
            <div className="group-hover:scale-110 group-hover:rotate-90 duration-300">
              <IoMdClose size={30} />
            </div>
          </button>
        </div>
        <div className="flex justify-center items-center w-full h-[20%] font-bold">
          <div className="w-full h-fit flex flex-row items-center justify-center shadow-lg">
            <div className="flex flex-row items-center w-auto text-xl font-bold text-cyan-50 z-10">
              <div className="sm:w-[70px] w-[56px] px-3 py-3">
                <img
                  className="w-full h-full object-cover"
                  src={logo}
                  alt="logo"
                />
              </div>
            </div>
            <span className="text-xl">Welcome to MovieZone</span>
          </div>
        </div>
        <div className="w-full h-full flex items-center flex-col">
          <span className="text-xl font-bold text-gray-400">
            Password Recovery
          </span>
          <div className="w-[350px] h-[100px] flex justify-between items-center relative">
            <div className="w-full h-[2px] absolute left-0 top-1/2 transform -translate-y-1/2 bg-slate-500">
              <div
                className={`h-full bg-black duration-300`}
                style={{
                  width: `${(currentStep.no - 1) * 50}%`,
                }}
              ></div>
            </div>
            {Steps.map((step, index) => (
              <div
                className="relative text-sm font-bold text-gray-400"
                key={index}
              >
                <div>
                  <div
                    className={`w-[20px] h-[20px] rounded-full duration-300 ${
                      index < currentStep.no ? "bg-slate-900" : "bg-slate-500"
                    } `}
                  ></div>
                </div>
                <span className="absolute -bottom-5 left-1/2 transform -translate-x-1/2">
                  {step.step}
                </span>
              </div>
            ))}
          </div>
          <div className="w-full flex flex-row relative">
            {currentStep.no === 1 && (
              <div className="flex-shrink-0 w-full">
                <Form
                  submitStatus={status}
                  formType="Send"
                  onSubmit={onSubmitPhone}
                  onChange={onChangePhone}
                  formValues={PhoneEmailVerification}
                  setPasswordRecovery={null}
                />
              </div>
            )}
            {currentStep.no === 2 && (
              <div className="flex flex-col items-center w-full animate-slideAnimation">
                <span className="w-[80%] text-center">
                  Please enter the 6 digit code sent to this phone number
                  ***-***-0607
                </span>
                <Form
                  submitStatus={status}
                  formType="Verify"
                  onSubmit={onSubmitCode}
                  onChange={onChangeCode}
                  formValues={PhoneEmailVerification}
                  setPasswordRecovery={null}
                />
              </div>
            )}
            {currentStep.no === 3 && (
              <div className="flex flex-col items-center w-full animate-slideAnimation">
                <span className="w-[80%] text-center">
                  Enter your new password
                </span>
                <Form
                  submitStatus={status}
                  formType="Recovery"
                  onSubmit={onNewPasswordSubmit}
                  onChange={onChangeNewPassword}
                  formValues={PhoneEmailVerification}
                  setPasswordRecovery={null}
                />
              </div>
            )}
          </div>
          {currentStep.step === "Completed" && passwordRecovery && (
            <div className="w-full h-full absolute top-0 left-0 bg-[#1F2937] z-10 flex justify-center items-center text-center flex-col gap-3">
              <span className="font-bold">
                Congratulations You have Successfully updated you're password!
              </span>
              <div className="w-full h-[200px] flex justify-center">
                <img
                  src={checkLogo}
                  alt=""
                  className="w-[50%] sm:w-[40%] h-fit object-cover"
                />
              </div>
              <button
                className="px-5 py-3 font-bold border hover:bg-slate-700"
                onClick={() => passwordRecoveryComplete()}
              >
                Login
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PasswordRecovery;
