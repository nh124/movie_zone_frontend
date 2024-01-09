import { useEffect, useState } from "react";
import MovieManager from "../API/MovieManager";
import { useSelector } from "react-redux";

const GetSearch = () => {
  const SearchMovie = "";
  const [searchedResult, setSearchResult] = useState([]);
  const { SearchMoviePageIndex } = useSelector(
    (state: any) => state.MovieIndex
  );
  const getSearch = () => {
    const { searchMovie } = MovieManager();
    searchMovie(SearchMoviePageIndex, SearchMovie)
      .then((response) => {
        setSearchResult(response.results);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getSearch();
  }, [SearchMoviePageIndex]);
  return searchedResult;
};

export default GetSearch;
