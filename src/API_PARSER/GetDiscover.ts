import { useEffect, useState } from "react";
import MovieManager from "../API/MovieManager";
import { useDispatch, useSelector } from "react-redux";
import { setSubmitFilter } from "../Redux/filterReducer";

const GetDiscover = () => {
  const [discoverMovies, setDiscoverMovies] = useState([{}]);
  const { submitFilter } = useSelector((state) => state.filters);

  const dispatch = useDispatch();
  const { DiscoveryMoviePageIndex } = useSelector((state) => state.MovieIndex);

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

  const getDiscoverMovies = () => {
    const { getDiscover } = MovieManager();
    getDiscover(DiscoveryMoviePageIndex, filters)
      .then((response) => {
        const filteredMovies = filter(response.results);
        if (discoverMovies.length === 1) {
          setDiscoverMovies(filteredMovies);
        } else if (discoverMovies.length > 1) {
          setDiscoverMovies([...discoverMovies, ...filteredMovies]);
        }
        dispatch(setSubmitFilter(false));
      })
      .catch((error) => {
        return error;
      });
  };

  useEffect(() => {
    // if (submitFilter || DiscoveryMoviePageIndex > 1) {
    getDiscoverMovies();
    // }
  }, [submitFilter, DiscoveryMoviePageIndex]);
  return discoverMovies;
};

export default GetDiscover;
