/* eslint-disable no-useless-catch */
import axios from "axios";

const CommentManager = () => {
  type commentForm = {
    movieId: number;
    comment: string;
  };
  type editCommentForm = {
    comment: string;
  };
  const addComment = async (
    commentForm: commentForm,
    token: string | undefined
  ) => {
    if (token === undefined) return;
    try {
      const response = await axios.post(
        import.meta.env.VITE_SERVER_URL + "/addComment",
        commentForm,
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

  const getComment = async (movieId: number) => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_SERVER_URL + `/getComments/${movieId}`,
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

  const editComment = async (
    commentId: number,
    token: string,
    commentForm: editCommentForm
  ) => {
    try {
      const response = await axios.put(
        import.meta.env.VITE_SERVER_URL + `/editComment/${commentId}`,
        commentForm,
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

  const updateLike = async (commentId: number, token: string) => {
    try {
      const response = await axios.put(
        import.meta.env.VITE_SERVER_URL + `/updateLike/${commentId}`,
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
  const updateDisLike = async (commentId: number, token: string) => {
    try {
      const response = await axios.put(
        import.meta.env.VITE_SERVER_URL + `/updateDisLike/${commentId}`,
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

  const deleteComment = async (
    commentId: number,
    token: string | undefined
  ) => {
    if (token === undefined) return;
    try {
      const response = await axios.delete(
        import.meta.env.VITE_SERVER_URL + `/deleteComment/${commentId}`,
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
    addComment,
    getComment,
    updateLike,
    updateDisLike,
    editComment,
    deleteComment,
  };
};

export default CommentManager;
