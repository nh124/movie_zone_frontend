import { useEffect, useState } from "react";
import { IoBookmark } from "react-icons/io5";
import UserListManager from "../API/UserListManager";

const AddToBookmark = ({ storedToken, movieId }) => {
  const [bookmark, setBookmark] = useState({
    favorite: "",
    bookmark: "",
  });

  const [userList, setUserList] = useState({});
  const [bookmarkStatus, setBookmarkStatus] = useState(false);
  const [userListStatus, setUserListStatus] = useState(true);

  const [updateUserListStatus, setUpdateUserListStatus] = useState(false);
  const [deleteUserListStatus, setDeteleUserListStatus] = useState(false);
  const { AddToUserList, GetUserList, updateUserList, deleteFromUserList } =
    UserListManager();

  useEffect(() => {
    if (
      storedToken === undefined ||
      storedToken === null ||
      storedToken === "" ||
      !userListStatus
    )
      return;
    GetUserList(storedToken)
      .then((response) => {
        setUserList(response?.message);
        setUserListStatus(false);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
        setUserListStatus(false);
      });
  }, [GetUserList, storedToken, userListStatus]);

  useEffect(() => {
    if (userList?.email !== undefined || !bookmarkStatus) {
      return;
    }
    if (storedToken === undefined || storedToken === null || storedToken === "")
      return;

    AddToUserList(bookmark, storedToken)
      .then((response) => {
        console.log(response);
        setBookmarkStatus(false);
        setUserListStatus(true);
      })
      .catch((error) => {
        console.log(error);
        setBookmarkStatus(false);
      });
  }, [bookmark, AddToUserList, storedToken, bookmarkStatus, userList]);

  useEffect(() => {
    if (storedToken === undefined || storedToken === null || storedToken === "")
      return;

    if (updateUserListStatus) {
      console.log("updateUserListStatus");
      updateUserList(bookmark, storedToken)
        .then((response) => {
          console.log(response);
          setUpdateUserListStatus(false);
          setUserListStatus(true);
        })
        .catch((error) => {
          console.log(error);
          setUpdateUserListStatus(false);
        });
    }
  }, [updateUserList, updateUserListStatus, storedToken, bookmark]);

  useEffect(() => {
    if (storedToken === undefined || storedToken === null || storedToken === "")
      return;

    if (deleteUserListStatus) {
      console.log(bookmark);
      deleteFromUserList(bookmark, storedToken)
        .then((response) => {
          console.log(response);
          setDeteleUserListStatus(false);
          setUserListStatus(true);
        })
        .catch((error) => {
          console.log(error);
          setDeteleUserListStatus(false);
        });
    }
  }, [deleteFromUserList, deleteUserListStatus, storedToken, bookmark]);

  const AddMovies = () => {
    setBookmark((prev) => ({
      ...prev,
      bookmark: movieId,
    }));
    if (userList?.email === undefined) {
      setBookmarkStatus(true);
    } else {
      setUpdateUserListStatus(true);
    }
  };
  const DeletingMovies = () => {
    setBookmark((prev) => ({
      ...prev,
      bookmark: movieId,
    }));
    setDeteleUserListStatus(true);
  };
  return userList?.bookmark?.split(",").includes(movieId.toString()) ? (
    <button
      onClick={() => DeletingMovies()}
      className={`px-3 py-3 rounded-full  bg-[#FF0000] shadow-lg hover:scale-110 hover:cursor-pointer duration-300`}
    >
      <IoBookmark size={20} />
    </button>
  ) : (
    <button
      onClick={() => AddMovies()}
      className={`px-3 py-3 rounded-full bg-[#304458] shadow-lg hover:scale-110 hover:cursor-pointer duration-300`}
    >
      <IoBookmark size={20} />
    </button>
  );
};

export default AddToBookmark;
