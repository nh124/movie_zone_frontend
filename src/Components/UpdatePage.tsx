import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { setStart, setEnd } from "../Redux/GridSizeIndexReducer";
import {
  IncrementTrendingMoviePageIndex,
  IncrementUpcomingMoviePageIndex,
  IncrementDiscoveryMoviePageIndex,
} from "../Redux/MovieIndexReducer";

const UpdatePage = ({ currentPage }: { currentPage: string }) => {
  const { start, end } = useSelector((state) => state.GridSizeIndex);
  const { currentList, currentTab } = useSelector(
    (state) => state.MovieStatusTab
  );
  const { length } = useSelector((state) => state.GridSize);
  const dispatch = useDispatch();
  const setPage = (forward: boolean) => {
    if (currentPage === "") return;
    if (currentPage === "discover" || currentPage === "search") {
      if (forward) {
        dispatch(setStart(start + length));
        dispatch(setEnd(end + length));
      } else if (start > 0) {
        dispatch(setStart(start - length));
        dispatch(setEnd(end - length));
      }
    }
    if (forward && start + length > currentTab.length) return;
    if (!forward && start - length < 0) return;

    if (forward) {
      dispatch(setStart(start + length));
      dispatch(setEnd(end + length));

      if (currentPage === "Home") {
        console.log("Incrementing indexes");
        if (currentList === "Trending")
          dispatch(IncrementTrendingMoviePageIndex());
        if (currentList === "Upcoming")
          dispatch(IncrementUpcomingMoviePageIndex());
      }
    } else {
      dispatch(setStart(start - length));
      dispatch(setEnd(end - length));
    }
  };

  return (
    <div className="flex flex-row gap-3 px-3 justify-end py-2">
      <button
        onClick={() => setPage(false)}
        className="w-full sm:w-[100px] py-1 bg-slate-600 flex justify-center rounded-lg hover:scale-105 duration-300 shadow-lg"
      >
        <MdOutlineKeyboardArrowLeft size={30} color="white" />
      </button>
      <button
        onClick={() => setPage(true)}
        className="w-full sm:w-[100px] py-1 bg-slate-600 flex justify-center rounded-lg hover:scale-105 duration-300 shadow-lg"
      >
        <MdOutlineKeyboardArrowRight size={30} color="white" />
      </button>
    </div>
  );
};

export default UpdatePage;
