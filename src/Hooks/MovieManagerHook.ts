import { useEffect } from "react";
import { useSelector } from "react-redux";
import { setCurrentTab } from "../Redux/MovieStatusTabReducer";
import { setStart, setEnd } from "../Redux/GridSizeIndexReducer";
import getTopRatedMovies from "../API_PARSER/GetTopRatedMovies";
import GetUpcomingMovies from "../API_PARSER/GetUpcomingMovies";
import RemoveDuplicatesFilter from "../Rawfiles/RemoveDuplicatesFilter";
import { Dispatch } from "redux";

const MovieManagerHook = ({
  dispatch,
  currentList,
}: {
  dispatch: Dispatch;
  currentList: string;
}) => {
  const { submitFilter } = useSelector((state: any) => state.filters);
  const getTopMovies = getTopRatedMovies();
  const getUpcomingMovies = GetUpcomingMovies();
  const { length } = useSelector((state: any) => state.GridSize);
  const { DiscoveryMoviePageIndex } = useSelector(
    (state: any) => state.MovieIndex
  );
  const { TrendingMoviePageIndex, UpcomingMoviePageIndex } = useSelector(
    (state: any) => state.MovieIndex
  );

  useEffect(() => {
    if (currentList === "Trending") dispatch(setCurrentTab(getTopMovies));
    if (currentList === "Upcoming") dispatch(setCurrentTab(getUpcomingMovies));
    dispatch(setStart(0));
    dispatch(setEnd(length));
  }, [currentList]);

  useEffect(() => {
    if (currentList === "Trending") {
      const uniqueMovies = RemoveDuplicatesFilter(getTopMovies);
      dispatch(setCurrentTab(uniqueMovies));
    }
    if (currentList === "Trending" && TrendingMoviePageIndex > 1) {
      const uniqueMovies = RemoveDuplicatesFilter(getTopMovies);
      dispatch(setCurrentTab(uniqueMovies));
    } else if (currentList === "Upcoming" && UpcomingMoviePageIndex > 1) {
      const uniqueMovies = RemoveDuplicatesFilter(getUpcomingMovies);
      dispatch(setCurrentTab(uniqueMovies));
    }
  }, [
    getTopMovies,
    getUpcomingMovies,
    TrendingMoviePageIndex,
    UpcomingMoviePageIndex,
    DiscoveryMoviePageIndex,
    submitFilter,
  ]);

  return null;
};

export default MovieManagerHook;
