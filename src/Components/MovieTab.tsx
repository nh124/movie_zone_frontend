import { useDispatch, useSelector } from "react-redux";
import { setTab } from "../Redux/MovieStatusTabReducer";
import MovieManagerHook from "../Hooks/MovieManagerHook";
import { useNavigate } from "react-router-dom";

const MovieTab = () => {
  const { currentList } = useSelector((state: any) => state.MovieStatusTab);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div className="flex gap-3 sm:text-base text-sm items-center">
      <MovieManagerHook dispatch={dispatch} currentList={currentList} />
      <button
        onClick={() => navigate("/movies")}
        className={`bg-gray-800 px-2 rounded-xl shadow-lg hover:scale-105 duration-300 h-[40px]`}
      >
        Discover
      </button>
      <button
        className={`${
          currentList === "Trending" ? "text-[#AAAAAA]" : "text-[#666666]"
        }`}
        onClick={() => dispatch(setTab("Trending"))}
      >
        Trending
      </button>
      <button
        className={`${
          currentList === "Upcoming" ? "text-[#AAAAAA]" : "text-[#666666]"
        }`}
        onClick={() => dispatch(setTab("Upcoming"))}
      >
        Upcoming
      </button>
    </div>
  );
};

export default MovieTab;
