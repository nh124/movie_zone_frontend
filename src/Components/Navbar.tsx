/* eslint-disable react-hooks/exhaustive-deps */
import { SetStateAction, useState } from "react";
import logo from "../assets/logo.png";
import { CiSearch, CiLogout } from "react-icons/ci";
import { IoCloseOutline, IoPerson } from "react-icons/io5";
import UserInformationManager from "../API/UserInformationManager";
import { useNavigate } from "react-router-dom";
import GetUser from "../Hooks/GetUser";
import Search from "./Search";

const Navbar = ({
  setShowLoading,
}: {
  setShowLoading: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const [showSearch, setShowSearch] = useState(false);
  const [showUserMany, setShowUserMany] = useState(false);
  const { get_user, setExpiredToken } = UserInformationManager();
  const storedTokenObject = localStorage.getItem("token");
  type TokenInfo = {
    storedToken: string | undefined;
    tokenExpired: boolean | undefined;
  };
  const getToken = (): TokenInfo => {
    if (storedTokenObject === null) {
      return {
        storedToken: undefined,
        tokenExpired: undefined,
      };
    }
    const storedTokenJson = JSON.parse(storedTokenObject);
    const storedToken = storedTokenJson?.token;
    const tokenExpired = storedTokenJson?.expired;
    return { storedToken, tokenExpired };
  };
  const { storedToken, tokenExpired } = getToken();

  const navigate = useNavigate();
  const user = GetUser(storedToken, get_user, tokenExpired, setExpiredToken);
  const removeToken = () => {
    if (storedToken === undefined) return;
    const tokenForm = {
      token: storedToken,
    };
    setExpiredToken(storedToken, tokenForm)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    navigate("/");
    window.location.reload();
    localStorage.removeItem("token");
    setShowUserMany(false);
  };

  return (
    <div className="w-full  h-[50px] bg-sky-900/50 font-white flex justify-center relative">
      <div className="flex fle-row justify-between items-center w-full  xl:w-[1920px] relative">
        <button
          className="flex flex-row items-center w-auto text-xl font-bold text-cyan-50 z-10"
          onClick={() => {
            navigate("/");
            window.location.reload();
          }}
        >
          <div className="sm:w-[70px] w-[56px] px-3 py-3">
            <img className="w-full h-full object-cover" src={logo} alt="logo" />
          </div>
          <span>MovieZone</span>
        </button>
        <ul className="flex flex-row justify-center items-center gap-5 px-4 h-[70%] z-10">
          <div className="flex flex-row w-auto overflow-hidden h-full justify-start items-center relative">
            <button onClick={() => setShowSearch(!showSearch)}>
              {showSearch ? (
                <IoCloseOutline size={25} color="white" />
              ) : (
                <CiSearch size={25} color="white" />
              )}
            </button>
          </div>
          {storedToken === null ||
          storedToken === "" ||
          storedToken === undefined ? (
            <button
              className="px-1 py-1 bg-blue-300 rounded-md h-full flex justify-center items-center w-[70px]"
              onClick={() => setShowLoading(true)}
            >
              Sign In
            </button>
          ) : (
            <button
              className="text-gray-300 font-bold items-center w-fit overflow-hidden"
              onClick={() => setShowUserMany(!showUserMany)}
            >
              <IoPerson size="30" color="white" />
            </button>
          )}
        </ul>
        <div
          className={`absolute top-[50px] right-1 w-[250px] h-fit z-30 bg-sky-900 rounded-bl-lg rounded-br-lg flex flex-col font-bold text-gray-400 py-2 px-2 duration-300  ${
            showUserMany ? "translate-y-0 z-30" : "-translate-y-[200%]"
          }`}
        >
          {/* <button className="w-full h-full flex justify-start items-center px-2 py-2 shadow-lg hover:scale-105 duration-300 gap-3">
            <div className="w-[50px] h-full flex justify-center items-center bg-slate-800 rounded-full px-1 py-2">
              <IoPerson size="30" color="white" />
            </div>
            <span>Account Preferences</span>
          </button> */}
          <div className="px-2 py-2 w-full shadow-lg">
            <span> Welcome {user?.name}</span>
            <span className="text-sm text-gray-500 "> {user?.email}</span>
          </div>

          <button
            className="w-full h-full flex justify-start items-center px-2 py-2 shadow-lg hover:scale-105 duration-300 gap-3"
            onClick={() => removeToken()}
          >
            <div className="w-[50px] h-full flex justify-center items-center bg-slate-800 rounded-full px-1 py-2">
              <CiLogout size="30" color="white" />
            </div>
            <span>Logout</span>
          </button>
        </div>
        <Search showSearch={showSearch} />
      </div>
    </div>
  );
};

export default Navbar;
