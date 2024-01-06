import { FaBookmark, FaHeart, FaThumbsDown, FaThumbsUp } from "react-icons/fa";
import UserListManager from "../API/UserListManager";
import { useEffect, useState } from "react";
import UserInformationManager from "../API/UserInformationManager";
import GetUser from "../Hooks/GetUser";
import GetMovieDetails from "../API_PARSER/GetMovieDetails";
import MovieManager from "../API/MovieManager";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const SidePanelHome = ({ collectionTab, setCollectionTab }) => {
  const { get_user, setExpiredToken } = UserInformationManager();
  const storedTokenObject = localStorage.getItem("token");
  const storedTokenJson = JSON.parse(storedTokenObject);
  const storedToken = storedTokenJson?.token;
  const tokenExpired = storedTokenJson?.expired;
  const user = GetUser(storedToken, get_user, tokenExpired, setExpiredToken);
  const [moviesIds, setMoviesIds] = useState([]);
  const { getUserLists } = UserListManager();
  const [getUserListsStatus, setGetUserLists] = useState(true);
  const [convertToJson, setConvertToJson] = useState(false);
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  const { getMovieDetails } = MovieManager();

  //   useEffect(() => {
  //     if (!convertToJson) return;
  //     for (const elements of moviesIds) {
  //       getMovieDetails(elements, "details")
  //         .then((responce) => {
  //           setFavoriteMovies((prev) => [...prev, responce]);
  //           setConvertToJson(false);
  //         })
  //         .catch((err) => {
  //           console.log(err);
  //         });
  //     }
  //   }, [getMovieDetails, convertToJson, moviesIds]);
  const navigate = useNavigate();
  useEffect(() => {
    if (!convertToJson) return;

    // Create an array to store promises
    const promises = moviesIds.map((element) => {
      return getMovieDetails(element, "details")
        .then((response) => response)
        .catch((err) => {
          console.log(err);
          return null; // Handle the error, e.g., by returning null
        });
    });

    // Wait for all promises to resolve
    Promise.all(promises).then((responses) => {
      // Filter out null responses (errors)
      const validResponses = responses.filter((response) => response !== null);
      console.log(validResponses);

      // Update the state with valid responses
      setFavoriteMovies(validResponses);

      // Set convertToJson to false after processing all movies
      setConvertToJson(false);
    });
  }, [getMovieDetails, convertToJson, moviesIds]);

  useEffect(() => {
    if (storedToken === null) return;
    if (!getUserListsStatus) return;
    getUserLists(storedToken)
      .then((responce) => {
        const { favorites } = responce.message;
        const favoritesArray = favorites.split(",");
        setMoviesIds(favoritesArray);
        setGetUserLists(false);
        setConvertToJson(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [getUserLists, getUserListsStatus, storedToken]);

  useEffect(() => {
    console.log(favoriteMovies);
  }, [favoriteMovies]);
  return (
    <div className="w-full sm:w-[30%] h-[700px]">
      <div className="w-full h-full px-3 py-3">
        <div className="flex flex-col w-full h-full relative shadow-lg bg-gradient-to-t from-[#394554] rounded-lg">
          <div className="absolute w-[70%] h-[4px] sm:w-[4px] sm:h-[60%] sm:top-1/2 transform sm:-translate-y-1/2 -translate-x-1/2 left-1/2 sm:translate-x-0 sm:-left-4 rounded-lg bg-slate-500 -top-4"></div>
          <div className="w-full h-[60px] flex flex-row font-bold relative">
            <button
              onClick={() => setCollectionTab("Favorites")}
              className={`w-full relative h-full z-10 text-gray-400 text-xl border border-gray-400`}
            >
              Favorites
            </button>
            {/* <button
                  onClick={() => setCollectionTab("Watch Later")}
                  className={`relative w-full h-full z-10 ${
                    collectionTab === "Watch Later"
                      ? "text-gray-700"
                      : "text-gray-300 border-t border-r border-b border-gray-500"
                  }`}
                >
                  Watch Later
                </button> */}
            {/* <div
                  className={`w-[50%] duration-300 h-full absolute top-0 bg-[#60A5FA] ${
                    collectionTab === "Favorites"
                      ? "translate-x-0"
                      : "translate-x-[100%]"
                  }`}
                ></div> */}
          </div>

          {favoriteMovies.length <= 0 ? (
            <div className="w-full h-full">
              <div className="w-full h-full flex justify-center items-center">
                <FaHeart color="#334860" size={100} />
              </div>
            </div>
          ) : (
            <div className="w-full h-full flex flex-col px-3 py-6 text-gray-300 gap-4 overflow-y-auto">
              {favoriteMovies.map((movie, index) => (
                <button
                  className="w-full h-[100px] p-2 flex flex-row relative bg-slate-800 shadow-xl rounded-lg hover:scale-[100%] scale-95 duration-300"
                  key={movie?.id}
                  onClick={() => navigate(`/movie/${movie.id}`)}
                >
                  <button className="absolute -top-2 -right-3 rounded-full bg-slate-800 shadow-xl border border-gray-300 hover:scale-110 duration-300">
                    <IoMdClose size={22} />
                  </button>
                  <div className="w-[20%] h-full overflow-hidden">
                    <img
                      src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
                      className="w-full h-full object-cover"
                      alt=""
                    />
                  </div>
                  <div className="w-[80%] h-full py-3 px-3 font-bold flex flex-col items-start gap-3">
                    <span>{movie?.title}</span>
                    <div className="flex flex-row gap-3 text-sm">
                      <div className="flex flex-row] gap-2">
                        <div>
                          <FaThumbsUp size={19} />
                        </div>
                        <span>100</span>
                      </div>
                      <div className="flex flex-row] gap-2">
                        <div>
                          <FaThumbsDown size={19} />
                        </div>
                        <span>100</span>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SidePanelHome;
