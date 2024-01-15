import { IoMdClose } from "react-icons/io";
import logo from "../assets/logo.png";
import Form from "./Form";
import { useEffect, useState } from "react";
import UserManager from "../API/UserSignUp";
import checkLogo from "../assets/Eo_circle_green_checkmark.svg.png";

const PhoneVerification = ({
  phoneVerification,
  setPhoneVerification,
  setShowLoading,
  setSignUpChoice,
  registerForm,
}: {
  phoneVerification: boolean;
  setPhoneVerification: React.Dispatch<React.SetStateAction<boolean>>;
  setShowLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setSignUpChoice: React.Dispatch<React.SetStateAction<string>>;
  registerForm: any;
}) => {
  const [verificationCode, setVerificationCode] = useState("");
  const [submitStatus, setSubmitStatus] = useState({
    status: "",
    message: "",
  });
  const onChangeVerificationCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVerificationCode(e.target.value);
  };
  const onSubmitVerificationCode = (event: React.FormEvent) => {
    event.preventDefault();
    setVerificationCodeStatus(true);
  };
  const [verificationCodeSent, setVerificationCodeSent] = useState(true);
  const { verify_code, reset_password } = UserManager();
  const [verificationCodeStatus, setVerificationCodeStatus] = useState(false);
  const [verificationSuccessful, setVerificationSuccessful] = useState(false);
  useEffect(() => {
    const { Email, Phone } = registerForm;
    if (Email === "" || Phone === "") return;
    const phoneVerificationForm = {
      email: Email,
      phone: Phone,
    };
    if (phoneVerification && verificationCodeSent) {
      reset_password(phoneVerificationForm)
        .then(() => {
          setVerificationCodeSent(false);
          setSubmitStatus({
            status: "",
            message: "",
          });
        })
        .catch((error) => {
          const { status, data } = error.response;
          console.log(status, data);
          setSubmitStatus({
            status: status,
            message: data.error,
          });
        });
      setSubmitStatus((prevForm) => ({
        ...prevForm,
        phoneSubmitted: false,
      }));
    }
  }, [
    submitStatus,
    reset_password,
    registerForm,
    phoneVerification,
    verificationCodeSent,
  ]);

  useEffect(() => {
    const { Email } = registerForm;
    const verificationCodeForm = {
      email: Email,
      verification_code: verificationCode,
    };
    if (Email === "" || verificationCode === "") return;
    if (verificationCodeStatus) {
      verify_code(verificationCodeForm)
        .then(() => {
          setVerificationSuccessful(true);
          setSubmitStatus({
            status: "",
            message: "",
          });
        })
        .catch((error) => {
          const { status, data } = error.response;
          setSubmitStatus({
            status: status,
            message: data.message,
          });
        });
      setSubmitStatus((prevForm) => ({
        ...prevForm,
        verifyCodeSubmitted: false,
      }));
    }
  }, [verificationCodeStatus, registerForm, verificationCode, verify_code]);

  return (
    <div
      className={`absolute w-full h-full bg-[#1F2937] top-0 left-0 z-20 duration-300 ${
        phoneVerification ? "translate-y-0" : "translate-y-[100%]"
      } `}
    >
      <div className="w-full h-full relative">
        <div className="absolute top-0 right-0 group">
          <button
            className="px-3 py-3"
            onClick={() => {
              setShowLoading(false);
              setSignUpChoice("Login");
            }}
          >
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
            Phone Verification
          </span>

          <div className="w-full flex flex-row relative">
            <div className="flex flex-col items-center w-full animate-slideAnimation">
              <span className="w-[80%] text-center">
                Please enter the 6 digit code sent to this phone number
                ***-***-0607
              </span>
              <Form
                submitStatus={submitStatus}
                formType="Verify"
                onSubmit={onSubmitVerificationCode}
                onChange={onChangeVerificationCode}
                formValues={verificationCode}
                setPasswordRecovery={null}
              />
            </div>
          </div>
          {verificationSuccessful && (
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
                onClick={() => setPhoneVerification(false)}
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

export default PhoneVerification;
