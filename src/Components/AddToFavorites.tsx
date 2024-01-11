import { IoMdHeart } from "react-icons/io";
import UserListManager from "../API/UserListManager";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setNotificationStatus } from "../Redux/NotificationReducer";

const AddToFavorites = ({
  storedToken,
  movieId,
}: {
  storedToken: string | undefined;
  movieId: number;
}) => {
  const [favorites, setFavorites] = useState({
    favorite: "",
    bookmark: "",
  });
  const dispatch = useDispatch();
  const [userList, setUserList] = useState({
    email: "",
    favorites: "",
  });
  const [favoritesStatus, setFavoritesStatus] = useState(false);
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
        // console.log(response);
      })
      .catch(() => {
        // console.log(error);
        setUserListStatus(false);
      });
  }, [GetUserList, storedToken, userListStatus]);

  useEffect(() => {
    if (userList?.email !== undefined || !favoritesStatus) {
      return;
    }
    if (storedToken === undefined || storedToken === null || storedToken === "")
      return;

    AddToUserList(favorites, storedToken)
      .then((response) => {
        console.log(response);
        setFavoritesStatus(false);
        setUserListStatus(true);
      })
      .catch((error) => {
        console.log(error);
        setFavoritesStatus(false);
      });
  }, [favorites, AddToUserList, storedToken, favoritesStatus, userList]);

  useEffect(() => {
    if (storedToken === undefined || storedToken === null || storedToken === "")
      return;

    if (updateUserListStatus) {
      // console.log("updateUserListStatus");
      updateUserList(favorites, storedToken)
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
  }, [updateUserList, updateUserListStatus, storedToken, favorites]);

  useEffect(() => {
    if (storedToken === undefined || storedToken === null || storedToken === "")
      return;

    if (deleteUserListStatus) {
      console.log(favorites);
      deleteFromUserList(favorites, storedToken)
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
  }, [deleteFromUserList, deleteUserListStatus, storedToken, favorites]);

  const AddMovies = () => {
    if (storedToken === undefined) {
      dispatch(setNotificationStatus(true));
    }
    setFavorites((prev) => ({
      ...prev,
      favorite: movieId.toString(),
    }));
    if (userList?.email === undefined) {
      setFavoritesStatus(true);
    } else {
      setUpdateUserListStatus(true);
    }
  };
  const DeletingMovies = () => {
    if (storedToken === undefined) {
      dispatch(setNotificationStatus(true));
    }
    setFavorites((prev) => ({
      ...prev,
      favorite: movieId.toString(),
    }));
    setDeteleUserListStatus(true);
  };
  return userList?.favorites?.split(",").includes(movieId.toString()) ? (
    <button
      onClick={() => DeletingMovies()}
      className={`px-3 py-3 rounded-full  bg-[#FF0000] shadow-lg hover:scale-110 hover:cursor-pointer duration-300`}
    >
      <IoMdHeart size={20} />
    </button>
  ) : (
    <button
      onClick={() => AddMovies()}
      className={`px-3 py-3 rounded-full bg-[#304458] shadow-lg hover:scale-110 hover:cursor-pointer duration-300`}
    >
      <IoMdHeart size={20} />
    </button>
  );
};

export default AddToFavorites;
