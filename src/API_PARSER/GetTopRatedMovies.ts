import { useEffect, useState } from "react";
import MovieManager from "../API/MovieManager";
import { useSelector } from "react-redux";

const GetTopRatedMovies = () => {
  const { getTopRated } = MovieManager();
  const [trendingMovies, setTrendingMovies] = useState([{}]);
  const { TrendingMoviePageIndex } = useSelector(
    (state: any) => state.MovieIndex
  );
  const filter = (movies) => {
    const movie_list = [];
    for (const movie of movies) {
      if (
        movie.backdrop_path !== null &&
        movie.genre_ids.length > 0 &&
        movie.overview !== ""
      ) {
        movie_list.push(movie);
      }
    }
    return movie_list;
  };
  const getTopRatedMovies = () => {
    getTopRated(TrendingMoviePageIndex)
      .then((response) => {
        const filteredMovies = filter(response.results);
        if (trendingMovies.length === 1) {
          setTrendingMovies(filteredMovies);
        } else if (trendingMovies.length > 1) {
          setTrendingMovies([...trendingMovies, ...filteredMovies]);
        }
      })
      .catch((error) => {
        return error;
      });
  };
  useEffect(() => {
    getTopRatedMovies();
  }, [TrendingMoviePageIndex]);
  return trendingMovies;
};

export default GetTopRatedMovies;
