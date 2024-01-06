/* eslint-disable no-useless-catch */
import axios from "axios";
const UserInformationManager = () => {
  const get_user = async (token) => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_SERVER_URL + "/getUser",
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  const setExpiredToken = async (token, formData) => {
    try {
      const response = await axios.put(
        import.meta.env.VITE_SERVER_URL + "/expiredToken",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  return {
    get_user,
    setExpiredToken,
  };
};

export default UserInformationManager;
