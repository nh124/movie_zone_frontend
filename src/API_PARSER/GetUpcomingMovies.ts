import { useEffect, useState } from "react";
import MovieManager from "../API/MovieManager";
import { useSelector } from "react-redux";

const GetUpcomingMovies = () => {
  const { getUpcoming } = MovieManager();
  const [upcomingMovies, setUpcomingMovies] = useState([
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
  const { UpcomingMoviePageIndex } = useSelector(
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
    if (UpcomingMoviePageIndex >= 1 && UpcomingMoviePageIndex < 39)
      getUpcomingMovies();
  }, [UpcomingMoviePageIndex]);
  return upcomingMovies;
};

export default GetUpcomingMovies;
