import { useEffect, useState } from "react";
import GetMovieDetails from "../API_PARSER/GetMovieDetails";
import ParseMovieDetails from "../Rawfiles/ParseMovieDetails";
import ScoreCircle from "./ScoreCircle";
import { IoBookmark, IoStar } from "react-icons/io5";
import { IoMdHeart } from "react-icons/io";
import { FaPlay } from "react-icons/fa";
import TimeConverter from "../Rawfiles/TimeConverter";
import AddToBookmark from "./AddToBookmark";
import AddToFavorites from "./AddToFavorites";
import GetUser from "../Hooks/GetUser";
import UserInformationManager from "../API/UserInformationManager";

const SplashScreen = ({ movieId, setPlayTrailers }) => {
  const [details, setDetails] = useState({});
  const [credits, setCredits] = useState({});
  const query_details = GetMovieDetails(movieId, "details");
  const query_credits = GetMovieDetails(movieId, "credits");

  const { get_user, setExpiredToken } = UserInformationManager();
  const storedTokenObject = localStorage.getItem("token");
  const storedTokenJson = JSON.parse(storedTokenObject);
  const storedToken = storedTokenJson?.token;
  const tokenExpired = storedTokenJson?.expired;
  const user = GetUser(storedToken, get_user, tokenExpired, setExpiredToken);

  useEffect(() => {
    const parsedDetails = ParseMovieDetails(query_details, "details");
    const parsedCredit = ParseMovieDetails(query_credits, "credits");
    setDetails(parsedDetails);
    setCredits(parsedCredit);
  }, [query_details, query_credits]);

  const setRating = (ratingAvg) => {
    const rating = Math.round(ratingAvg) / 10;
    return rating * 100;
  };

  return (
    <div className="w-full h-[500px] 2xl:h-[700px] rounded-md overflow-hidden relative ">
      <div className="z-20 absolute top-0 left-0 bg-gradient-to-r from-[#283747] w-full h-full flex flex-col justify-end px-[5%] text-white gap-3 md:justify-center">
        <span className="lg:text-5xl md:text-4xl text-xl font-bold">
          {details?.title}
        </span>
        <div className="sm:flex flex-row gap-3 flex-wrap w-full py-3 hidden items-center">
          {details?.genres?.map((genre) => (
            <span
              key={genre?.id}
              className="bg-gray-700/70 sm:px-2 px-3 py-1 rounded-lg text-sm sm:text-base"
            >
              {genre.name}
            </span>
          ))}
          <span className="font-bold">{details?.releaseDate}</span>

          <span className="font-bold">{TimeConverter(details?.runtime)}</span>
        </div>
        <div className="w-fit h-fit flex flex-row gap-2">
          <div className="w-[70px]">
            <ScoreCircle
              percentage={setRating(details?.voteAverage)}
              type="movie_display"
            />
          </div>

          <div className="flex justify-center items-center font-bold">
            <span>User Score</span>
          </div>
          <div className="flex flex-row justify-center items-center gap-3">
            {/* <AddToBookmark storedToken={storedToken} movieId={movieId} /> */}
            <AddToFavorites storedToken={storedToken} movieId={movieId} />
          </div>
        </div>
        <button
          className="w-fit px-3 py-3 flex flex-row gap-2 font-bold hover:cursor-pointer"
          onClick={() => setPlayTrailers(true)}
        >
          <FaPlay size={20} />
          <span>Play Trailer </span>
        </button>
        <div className="italic text-sm sm:text-base">{details?.tagline}</div>
        <div className="w-full md:w-[50%] h-[100px] grid grid-cols-2 grid-rows-2 text-sm sm:text-base">
          <div className="flex flex-col ">
            <span className="font-bold">Production Company</span>
            <div className="flex flex-col gap-2 sm:flex-row w-fit">
              {details?.productionCompanies?.length > 3
                ? details?.productionCompanies?.slice(0, 2).map((company) => (
                    <div
                      className="w-fit h-fit flex items-start flex-col"
                      key={company.id}
                    >
                      <span className="bg-gradient-to-t from-[#4e44449f] rounded-md">
                        {company?.name}
                      </span>
                    </div>
                  ))
                : details?.productionCompanies?.map((company) => (
                    <div
                      className="w-fit h-fit flex items-start flex-col"
                      key={company.id}
                    >
                      <span className="bg-gradient-to-t from-[#4e44449f] rounded-md">
                        {company?.name}
                      </span>
                    </div>
                  ))}
            </div>
          </div>

          {credits?.crew?.map((crew) => (
            <div
              className="w-full h-full flex items-start flex-col"
              key={crew.id}
            >
              <span className="font-bold">{crew?.job}</span>
              <span className="bg-gradient-to-t from-[#4e44449f] rounded-md">
                {crew?.name}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full h-[50%] absolute bottom-0 bg-gradient-to-t from-[#283747] z-10 "></div>
      <img
        src={details.backdrop_image_url}
        className="w-full h-full object-cover relative z-0"
        alt=""
      />
    </div>
  );
};

export default SplashScreen;
