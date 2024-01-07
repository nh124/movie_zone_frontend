import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import logo from "../assets/logo.png";
import Form from "./Form";
import DualTab from "./DualTab";
import PasswordRecovery from "./PasswordRecovery";
import UserManager from "../API/UserSignUp";
const UserLogin = ({ showLogin, setShowLoading }) => {
  const [signUpChoice, setSignUpChoice] = useState("Login");
  const [passwordRecovery, setPasswordRecovery] = useState(false);
  const [phoneVerification, setPhoneVerification] = useState(false);
  const [registerForm, setRegisterForm] = useState({
    Name: "",
    Email: "",
    Phone: "",
    Password: "",
  });
  const [loginForm, setLoginForm] = useState({
    Email: "",
    Password: "",
  });
  const [status, setStatus] = useState({
    status: "",
    message: "",
  });
  const { register_user, login_user } = UserManager();
  const [submitStatus, setSubmitStatus] = useState({
    registerFormSubmitted: false,
    loginFormSubmitted: false,
  });

  const exitLogin = (token) => {
    console.log(token);
    const tokenString = JSON.stringify(token);
    localStorage.setItem("token", tokenString);
    setShowLoading(false);
  };
  useEffect(() => {
    if (submitStatus.registerFormSubmitted) {
      register_user(registerForm)
        .then(() => {
          setSignUpChoice("Login");
        })
        .catch((error) => {
          const { status, data } = error.response;
          setStatus({
            status: status,
            message: data.message,
          });
        });
      setSubmitStatus((prevForm) => ({
        ...prevForm,
        registerFormSubmitted: false,
      }));
    }
  }, [submitStatus, register_user, registerForm]);

  useEffect(() => {
    if (submitStatus.loginFormSubmitted) {
      login_user(loginForm)
        .then((response) => {
          if (response?.access_token) exitLogin(response?.access_token);
        })
        .catch((error) => {
          const { status, data } = error.response;
          setStatus({
            status: status,
            message: data.message,
          });
        });
      setSubmitStatus((prevForm) => ({
        ...prevForm,
        loginFormSubmitted: false,
      }));
    }
  }, [submitStatus, login_user, loginForm]);

  const onChangeRegister = (e) => {
    const { name, value } = e.target;
    setRegisterForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const onChangeLogin = (e) => {
    const { name, value } = e.target;
    setLoginForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const onSubmitRegister = (event) => {
    event.preventDefault();
    setSubmitStatus((prevForm) => ({
      ...prevForm,
      registerFormSubmitted: true,
    }));
  };
  const onSubmitLogin = (event) => {
    event.preventDefault();
    console.log(loginForm);
    setSubmitStatus((prevForm) => ({
      ...prevForm,
      loginFormSubmitted: true,
    }));
  };

  const setDefault = (close) => {
    setLoginForm({
      Email: "",
      Password: "",
    });
    setStatus({
      status: "",
      message: "",
    });
    setRegisterForm({
      Name: "",
      Email: "",
      Phone: "",
      Password: "",
    });
    if (close === "close") {
      setShowLoading(false);
      setSignUpChoice("Login");
    }
  };

  return (
    <div
      className={`absolute left-0 top-0 w-full h-screen z-50  ${
        showLogin ? "visible" : "invisible"
      }`}
    >
      <div className="w-full h-full flex justify-center items-center relative">
        <div
          className={`absolute top-0 left-0 bg-black/50 duration-300 w-full h-full ${
            showLogin ? "opacity-100" : "opacity-0"
          }`}
        ></div>
        <div
          className={`sm:w-[450px] sm:max-w-[450px] w-[100%] sm:h-[650px] h-[100%] flex flex-col bg-[#1F2937] rounded-lg text-gray-400 duration-500 relative overflow-hidden ${
            showLogin ? "translate-y-0" : "-translate-y-[200%]"
          }`}
        >
          {/* forgotPassword */}
          <PasswordRecovery
            setSignUpChoice={setSignUpChoice}
            setShowLoading={setShowLoading}
            passwordRecovery={passwordRecovery}
            setPasswordRecovery={setPasswordRecovery}
          />

          <div className="absolute top-0 right-0 group">
            <button className="px-3 py-3" onClick={() => setDefault("close")}>
              <div className="group-hover:scale-110 group-hover:rotate-90 duration-300">
                <IoMdClose size={30} />
              </div>
            </button>
          </div>
          <div className="flex justify-center items-center w-full h-[20%] font-bold">
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

          <div className="w-full h-fit flex flex-col items-center gap-3 overflow-hidden">
            <div className="w-full h-fit">
              <DualTab
                setDefault={setDefault}
                setTab={setSignUpChoice}
                setStatus={setStatus}
                currentValue={signUpChoice}
                DuoTabType="signUp"
              />
            </div>

            <div className="flex flex-row w-full h-auto">
              <div
                className={`w-full flex justify-center py-6 flex-shrink-0 duration-300 ${
                  signUpChoice === "Login"
                    ? "translate-x-0"
                    : "-translate-x-[100%]"
                }`}
              >
                <Form
                  formType="Login"
                  submitStatus={status}
                  onSubmit={onSubmitLogin}
                  onChange={onChangeLogin}
                  formValues={loginForm}
                  setPasswordRecovery={setPasswordRecovery}
                />
              </div>
              <div
                className={`w-full flex justify-center flex-shrink-0 duration-300 ${
                  signUpChoice === "Register"
                    ? "-translate-x-[100%]"
                    : "translate-x-0"
                } `}
              >
                <Form
                  formType="Register"
                  onSubmit={onSubmitRegister}
                  onChange={onChangeRegister}
                  formValues={loginForm}
                  setPasswordRecovery={setPasswordRecovery}
                  submitStatus={status}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
