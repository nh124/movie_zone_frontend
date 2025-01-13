import { FaHeart } from "react-icons/fa";
import UserListManager from "../API/UserListManager";
import { useEffect, useRef, useState } from "react";
import MovieManager from "../API/MovieManager";
import { IoIosStar } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { MdAutoGraph } from "react-icons/md";
const SidePanelHome = () => {
  const storedTokenObject = localStorage.getItem("token");
  type TokenInfo = {
    storedToken: string | undefined;
    tokenExpired: boolean | undefined;
  };
  type movieType = {
    id: number;
    title: string;
    vote_average: number;
    vote_count: number;
    backdrop_path: string;
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
  type intervalType = NodeJS.Timeout;
  const { storedToken } = getToken();
  const [hoveredMovie, setHoveredMovie] = useState<number | null>(null);
  const [textOffset, setTextOffset] = useState(0);
  const [moviesIds, setMoviesIds] = useState([]);
  const { getUserLists } = UserListManager();
  const [getUserListsStatus, setGetUserLists] = useState(true);
  const [convertToJson, setConvertToJson] = useState(false);
  const [favoriteMovies, setFavoriteMovies] = useState<movieType[]>([]);
  const [intervalId, setIntervalId] = useState<intervalType>();
  const { getMovieDetails } = MovieManager();
  const [overFlow, setOverFlow] = useState(false);
  const [hover, setHover] = useState(false);
  const textContent = useRef(null);
  const container = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (overFlow && hover) {
      // Start the interval and store its ID
      const id = setInterval(() => {
        setTextOffset((prev) => prev + 10);
      }, 5);

      // Store the interval ID in state
      setIntervalId(id);
    } else {
      // Clear the interval and reset textOffset to 0
      clearInterval(intervalId);
      setTextOffset(0);
    }

    return () => clearInterval(intervalId);
  }, [overFlow, hover]);

  const calculateScoreAverage = (voting_average: number) => {
    const ratingAvg = Math.round(voting_average);
    return `${ratingAvg * 10}%`;
  };
  useEffect(() => {
    if (!convertToJson) return;

    // Create an array to store promises
    const promises = moviesIds.map((element) => {
      return getMovieDetails(element, "details")
        .then((response) => response)
        .catch(() => {
          return null; // Handle the error, e.g., by returning null
        });
    });

    // Wait for all promises to resolve
    Promise.all(promises).then((responses) => {
      // Filter out null responses (errors)
      const validResponses = responses.filter((response) => response !== null);

      // Update the state with valid responses
      setFavoriteMovies(validResponses);

      // Set convertToJson to false after processing all movies
      setConvertToJson(false);
    });
  }, [getMovieDetails, convertToJson, moviesIds]);
  type textContentType = {
    offsetWidth: number;
  };
  type containerContType = {
    scrollWidth: number;
  };
  useEffect(() => {
    if (textContent?.current === null || container?.current === null) return;
    const textCont = textContent?.current as textContentType;
    const containerCont = container?.current as containerContType;

    if (textCont.offsetWidth >= containerCont.scrollWidth) setOverFlow(true);
  }, [favoriteMovies]);

  useEffect(() => {
    if (storedToken === undefined) return;
    if (!getUserListsStatus) return;
    getUserLists(storedToken)
      .then((response: any) => {
        const { favorites } = response.message;
        const favoritesArray = favorites.split(",");
        setMoviesIds(favoritesArray);
        setGetUserLists(false);
        setConvertToJson(true);
      })
      .catch(() => {});
  }, [getUserLists, getUserListsStatus, storedToken]);

  return (
    <div className="w-full sm:w-[40%] h-[400px] md:h-[800px]">
      <div className="w-full h-full px-3 py-3">
        <div className="flex flex-col w-full h-full relative shadow-lg bg-gradient-to-t from-[#394554] rounded-lg">
          <div className="absolute w-[70%] h-[4px] sm:w-[4px] sm:h-[60%] sm:top-1/2 transform sm:-translate-y-1/2 -translate-x-1/2 left-1/2 sm:translate-x-0 sm:-left-4 rounded-lg bg-slate-500 -top-4"></div>
          <div className="w-full h-[60px] flex flex-row font-bold relative">
            <button
              className={`w-full relative h-full z-10 text-gray-400 text-xl border border-gray-400`}
            >
              Favorites
            </button>
          </div>

          {favoriteMovies.length <= 0 ? (
            <div className="w-full h-full">
              <div className="w-full h-full flex justify-center items-center">
                <FaHeart color="#334860" size={100} />
              </div>
            </div>
          ) : (
            <div className="w-full h-full flex flex-col px-3 py-6 text-gray-300 gap-4 overflow-y-auto">
              {favoriteMovies.map((movie: movieType, index: number) => (
                <button
                  className="w-full h-auto p-2 flex flex-row relative bg-slate-800 shadow-xl rounded-lg hover:scale-[100%] scale-95 duration-300"
                  key={movie?.id}
                  onClick={() => navigate(`/movie/${movie.id}`)}
                >
                  <div className="w-[40%] h-full overflow-hidden bg">
                    <img
                      src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
                      className="w-full h-full object-cover"
                      alt=""
                    />
                  </div>
                  <div
                    className="w-full h-full py-3 px-3 font-bold flex flex-col items-start gap-3 overflow-hidden group"
                    onMouseEnter={() => {
                      setHover(true);
                      setHoveredMovie(index);
                    }}
                    onMouseLeave={() => {
                      setHover(false);
                      setHoveredMovie(null);
                    }}
                  >
                    <div ref={container} className={`w-full h-auto text-start`}>
                      {overFlow ? (
                        <div
                          className="flex flex-row transition-height "
                          style={{
                            transform: `translateX(-${
                              hoveredMovie === index ? textOffset : 0
                            }px)`,
                            transition: `${
                              hoveredMovie === index ? "transform 10s ease" : ""
                            }`,
                          }}
                        >
                          <span className="whitespace-nowrap" ref={textContent}>
                            {hover && hoveredMovie === index
                              ? movie?.title
                              : movie?.title.slice(0, 17)}
                          </span>
                          {!hover && hoveredMovie !== index && <span>...</span>}
                        </div>
                      ) : (
                        <span className="whitespace-nowrap" ref={textContent}>
                          {movie?.title}
                        </span>
                      )}
                    </div>

                    <div
                      className="flex flex-row gap-3 text-sm"
                      title="Average Score"
                    >
                      <div className="flex flex-row items-center gap-1">
                        <IoIosStar />
                        {calculateScoreAverage(movie?.vote_average)}
                      </div>
                      <div
                        className="flex flex-row items-center gap-1"
                        title="Vote Count"
                      >
                        <MdAutoGraph />
                        {movie?.vote_count}
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
