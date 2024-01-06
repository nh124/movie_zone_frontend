import { useEffect, useState } from "react";
import MovieManager from "../API/MovieManager";
import { useSelector } from "react-redux";

const GetUpcomingMovies = () => {
  const { getUpcoming } = MovieManager();
  const [upcomingMovies, setUpcomingMovies] = useState([{}]);
  const { UpcomingMoviePageIndex } = useSelector(
    (state: any) => state.MovieIndex
  );
  const { start, end } = useSelector((state) => state.GridSizeIndex);

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

  const getUpcomingMovies = () => {
    getUpcoming(UpcomingMoviePageIndex)
      .then((response) => {
        const filteredMovies = filter(response.results);
        if (upcomingMovies.length === 1) {
          setUpcomingMovies(filteredMovies);
        } else if (upcomingMovies.length > 1 && upcomingMovies.length < 680) {
          setUpcomingMovies([...upcomingMovies, ...filteredMovies]);
        }
      })
      .catch((error) => {
        return error;
      });
  };
  useEffect(() => {
    if ((UpcomingMoviePageIndex) => 1 && UpcomingMoviePageIndex < 39)
      getUpcomingMovies();
  }, [UpcomingMoviePageIndex]);
  return upcomingMovies;
};

export default GetUpcomingMovies;
