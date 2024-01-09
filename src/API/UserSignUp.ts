/* eslint-disable no-useless-catch */
import axios from "axios";
const UserManager = () => {
  type registerFormType = {
    Name: string;
    Email: string;
    Phone: string;
    Password: string;
  };
  type loginFormType = {
    Email: string;
    Password: string;
  };

  type PhoneEmailVerificationFormType = {
    email: string;
    phone: string;
  };

  type finalPasswordType = {
    email: string;
    password: string;
  };

  type CodeVerificationFormType = { email: ""; verification_code: "" };

  const register_user = async (registerFormData: registerFormType) => {
    try {
      const response = await axios.post(
        import.meta.env.VITE_SERVER_URL + "/register",
        registerFormData,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const login_user = async (loginFormData: loginFormType) => {
    try {
      const response = await axios.post(
        import.meta.env.VITE_SERVER_URL + "/login",
        loginFormData,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const reset_password = async (
    PhoneEmailVerificationForm: PhoneEmailVerificationFormType
  ) => {
    try {
      const response = await axios.post(
        import.meta.env.VITE_SERVER_URL + "/resetPassword",
        PhoneEmailVerificationForm,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const verify_code = async (
    CodeVerificationForm: CodeVerificationFormType
  ) => {
    try {
      const response = await axios.post(
        import.meta.env.VITE_SERVER_URL + "/verifyCode",
        CodeVerificationForm,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  const update_password = async (updatedPasswordForm: finalPasswordType) => {
    try {
      const response = await axios.put(
        import.meta.env.VITE_SERVER_URL + "/updateUserPassword",
        updatedPasswordForm,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  return {
    register_user,
    login_user,
    reset_password,
    verify_code,
    update_password,
  };
};

export default UserManager;
