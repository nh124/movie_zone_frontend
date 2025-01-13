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
      })
      .catch(() => {
        setUserListStatus(false);
      });
  }, [GetUserList, storedToken, userListStatus]);

  useEffect(() => {
    if (userList?.email !== "" || !favoritesStatus) {
      return;
    }
    if (storedToken === undefined || storedToken === null || storedToken === "")
      return;

    AddToUserList(favorites, storedToken)
      .then(() => {
        setFavoritesStatus(false);
        setUserListStatus(true);
      })
      .catch(() => {
        setFavoritesStatus(false);
      });
  }, [favorites, AddToUserList, storedToken, favoritesStatus, userList]);

  useEffect(() => {
    if (storedToken === undefined || storedToken === null || storedToken === "")
      return;

    if (updateUserListStatus) {
      updateUserList(favorites, storedToken)
        .then(() => {
          setUpdateUserListStatus(false);
          setUserListStatus(true);
        })
        .catch(() => {
          setUpdateUserListStatus(false);
        });
    }
  }, [updateUserList, updateUserListStatus, storedToken, favorites, userList]);

  useEffect(() => {
    if (storedToken === undefined || storedToken === null || storedToken === "")
      return;

    if (deleteUserListStatus) {
      deleteFromUserList(favorites, storedToken)
        .then(() => {
          setDeteleUserListStatus(false);
          setUserListStatus(true);
        })
        .catch(() => {
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
    if (userList?.email === "") {
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
