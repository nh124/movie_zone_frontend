import { useEffect, useState } from "react";
import MovieManager from "../API/MovieManager";
import { useSelector } from "react-redux";
const GetTopRatedMovies = () => {
  const { getTopRated } = MovieManager();
  const [trendingMovies, setTrendingMovies] = useState([
    {
      adult: false,
      backdrop_path: "",
      genre_ids: [],
      id: 0,
      original_title: "",
      overview: "",
      popularity: 0,
      poster_path: "",
      release_date: "",
      title: "",
      video: false,
      vote_average: 0,
      vote_count: 0,
    },
  ]);
  const { TrendingMoviePageIndex } = useSelector(
    (state: any) => state.MovieIndex
  );
  const filter = (movies: any) => {
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
