import { useParams } from "react-router-dom";
import { PageLayout } from "../Components/pageLayout";
import { useEffect, useState } from "react";
import MovieManager from "../API/MovieManager";
import GridLayout from "../Components/GridLayout";
import { useSelector } from "react-redux";
import GridResize from "../Hooks/gridResize";
import UpdatePage from "../Components/UpdatePage";
import ResponseResultType from "../Types/ResponseResultType";
import RemoveDuplicatesFilter from "../Rawfiles/RemoveDuplicatesFilter";
import Footer from "../Components/Footer";
const SearchResult = () => {
  const { searchedMovie } = useParams();
  const [showLogin, setShowLoading] = useState(false);
  const [pageLimit, setPageLimit] = useState(0);
  const [searchedResult, setSearchResult] = useState<ResponseResultType[]>([]);
  const [finalSearchedResult, setFinalSearchedResult] = useState<
    ResponseResultType[]
  >([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchStatus, setSearchStatus] = useState(true);

  const { searchMovie } = MovieManager();
  const { start, end } = useSelector((state: any) => state.GridSizeIndex);

  useEffect(() => {
    const filterMovies = RemoveDuplicatesFilter(searchedResult);
    // console.log(filterMovies);
    setFinalSearchedResult(filterMovies);
  }, [searchedResult]);

  useEffect(() => {
    setSearchStatus(true);
  }, [searchedMovie]);
  useEffect(() => {
    if (!searchStatus) return;
    searchMovie(currentPage, searchedMovie)
      .then((response) => {
        setPageLimit(response.total_pages);
        setSearchResult((prev: ResponseResultType[]) => [
          ...prev,
          ...response.results,
        ]);
        setSearchStatus(false);
      })
      .catch(() => {});
  }, [currentPage, searchMovie, searchedMovie, searchStatus]);

  useEffect(() => {
    if (currentPage >= pageLimit) return;
    setCurrentPage(currentPage + 1);
    setSearchStatus(true);
  }, [start, end]);

  return (
    <PageLayout showLogin={showLogin} setShowLoading={setShowLoading}>
      <GridResize />
      <UpdatePage currentPage="search" />
      <div className="w-full h-screen">
        <GridLayout
          start={start}
          end={end}
          MovieList={finalSearchedResult}
        ></GridLayout>
      </div>
      <Footer />
    </PageLayout>
  );
};

export default SearchResult;
