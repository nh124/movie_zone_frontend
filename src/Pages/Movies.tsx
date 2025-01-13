import { PageLayout } from "../Components/pageLayout";
import { FaFilter } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Filter from "../Components/Filter";
import GridLayout from "../Components/GridLayout";
import GridResize from "../Hooks/gridResize";
import UpdatePage from "../Components/UpdatePage";
import RemoveDuplicatesFilter from "../Rawfiles/RemoveDuplicatesFilter";
import ResponseResultType from "../Types/ResponseResultType";
import { useEffect, useState } from "react";
import MovieManager from "../API/MovieManager";
import { setSubmitFilter } from "../Redux/filterReducer";
import { setEnd, setStart } from "../Redux/GridSizeIndexReducer";
import Footer from "../Components/Footer";
const Movies = () => {
  const { start, end } = useSelector((state: any) => state.GridSizeIndex);
  const [discoverMovies, setDiscoverMovies] = useState<
    Array<ResponseResultType>
  >([]);
  const [showLogin, setShowLoading] = useState(false);
  const dispatch = useDispatch();
  const [showFilters, setShowFilters] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [pageIndex, showPageIndex] = useState(1);
  const [pageInc, setPageInc] = useState(false);
  const { filters, submitFilter } = useSelector((state: any) => state.filters);
  const { getDiscover } = MovieManager();
  const [filteredDiscoverMovies, setFilteredDiscoverMovies] = useState<
    Array<ResponseResultType>
  >([]);
  const { length } = useSelector((state: any) => state.GridSize);

  type responseType = {
    page: number;
    results: Array<ResponseResultType>;
    total_pages: number;
    total_results: number;
  };
  const filterMovies = (movies: Array<ResponseResultType>) => {
    const filtered = movies.filter((movie) => movie.backdrop_path !== null);
    return filtered;
  };
  useEffect(() => {
    dispatch(setSubmitFilter(true));
  }, []);

  useEffect(() => {
    if (pageIndex >= totalPages) return;
    showPageIndex(pageIndex + 1);
    setPageInc(true);
  }, [start, end]);

  useEffect(() => {
    if (discoverMovies.length <= 0) return;
    const filter_Movies = RemoveDuplicatesFilter(discoverMovies);
    setFilteredDiscoverMovies(filter_Movies);
  }, [discoverMovies]);

  useEffect(() => {
    if (!pageInc) return;
    getDiscover(pageIndex, filters)
      .then((response: responseType) => {
        const filteredMovies = filterMovies(response.results);
        setDiscoverMovies((prev) => [...prev, ...filteredMovies]);
        setTotalPages(response?.total_pages);
        setPageInc(false);
      })
      .catch(() => {});
  }, [pageIndex, filters, getDiscover, pageInc]);

  useEffect(() => {
    if (!submitFilter) return;
    getDiscover(pageIndex, filters)
      .then((response) => {
        const filteredMovies = filterMovies(response.results);
        setDiscoverMovies(filteredMovies);
        dispatch(setStart(0));
        dispatch(setEnd(length));
        setTotalPages(response?.total_pages);
        dispatch(setSubmitFilter(false));
      })
      .catch(() => {
        // console.log(error);
        dispatch(setSubmitFilter(false));
      });
  }, [getDiscover, pageIndex, filters, dispatch, submitFilter, length]);

  return (
    <PageLayout showLogin={showLogin} setShowLoading={setShowLoading}>
      <GridResize />
      <div>
        <div className="w-full h-auto">
          <div className="flex flex-col gap-2 py-4 px-4 ">
            <div className="flex flex-row items-center justify-between">
              <span className="text-xl font-bold text-white">Movies</span>
              <button
                className="px-2 py-2 bg-slate-800 w-fit rounded-lg sm:hidden"
                onClick={() => setShowFilters(!showFilters)}
              >
                <FaFilter size={20} color="gray" />
              </button>
            </div>
            <div className="flex flex-row w-full h-auto">
              <Filter showFilters={showFilters} />
              <div className="w-full">
                <UpdatePage currentPage="discover" />
              </div>
            </div>

            <div className="w-full max-h-[1600px] sm:max-h-[1100px] h-[1100px]">
              <GridLayout
                MovieList={filteredDiscoverMovies}
                start={start}
                end={end}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </PageLayout>
  );
};

export default Movies;
