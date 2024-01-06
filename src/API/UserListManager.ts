/* eslint-disable no-useless-catch */
import axios from "axios";

const UserListManager = () => {
  const AddToUserList = async (userListForm, token) => {
    try {
      const response = await axios.post(
        import.meta.env.VITE_SERVER_URL + "/addToUserList",
        userListForm,
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

  const GetUserList = async (token) => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_SERVER_URL + "/getUserList",
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

  const updateUserList = async (userListForm, token) => {
    try {
      const response = await axios.put(
        import.meta.env.VITE_SERVER_URL + "/updateUserList",
        userListForm,
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

  const getUserLists = async (token) => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_SERVER_URL + "/getUserList",
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

  const deleteFromUserList = async (userListForm, token) => {
    try {
      const response = await axios.put(
        import.meta.env.VITE_SERVER_URL + "/deleteFromUserList",
        userListForm,
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
    AddToUserList,
    GetUserList,
    updateUserList,
    deleteFromUserList,
    getUserLists,
  };
};

export default UserListManager;
