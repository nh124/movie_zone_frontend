/* eslint-disable no-useless-catch */
import axios from "axios";
const UserManager = () => {
  const register_user = async (registerFormData) => {
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

  const login_user = async (loginFormData) => {
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

  const reset_password = async (PhoneEmailVerificationForm) => {
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

  const verify_code = async (CodeVerificationForm) => {
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
  const update_password = async (updatedPasswordForm) => {
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
