import { useParams } from "react-router-dom";
import { PageLayout } from "../Components/pageLayout";
import { useEffect, useState } from "react";
import MovieManager from "../API/MovieManager";
import GridLayout from "../Components/GridLayout";
import { useSelector } from "react-redux";
import GridResize from "../Hooks/gridResize";
import UpdatePage from "../Components/UpdatePage";
import RemoveDuplicatesFilter from "../Rawfiles/RemoveDuplicatesFilter";
const SearchResult = () => {
  const { searchedMovie } = useParams();
  const [showLogin, setShowLoading] = useState(false);
  const [pageLimit, setPageLimit] = useState(0);
  const [searchedResult, setSearchResult] = useState([]);
  const [finalSearchedResult, setFinalSearchedResult] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchStatus, setSearchStatus] = useState(true);

  const { searchMovie } = MovieManager();
  const { start, end } = useSelector((state) => state.GridSizeIndex);

  useEffect(() => {
    const filterMovies = RemoveDuplicatesFilter(searchedResult);
    setFinalSearchedResult(filterMovies);
    console.log(searchedResult);
  }, [searchedResult]);

  useEffect(() => {
    setSearchStatus(true);
  }, [searchedMovie]);
  useEffect(() => {
    if (!searchStatus) return;
    searchMovie(currentPage, searchedMovie)
      .then((response) => {
        setPageLimit(response.total_pages);
        setSearchResult((prev) => [...prev, ...response.results]);
        setSearchStatus(false);
      })
      .catch((error) => {
        console.log(error);
      });
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
    </PageLayout>
  );
};

export default SearchResult;
