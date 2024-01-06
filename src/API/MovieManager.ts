/* eslint-disable no-useless-catch */
import axios from "axios";
import Filter from "../Rawfiles/Filter";

const MovieManager = () => {
  const token = import.meta.env.VITE_MOVIE_AUTHORIZATION_TOKEN;
  const getLatestMovies = async () => {
    const queryParams = {
      language: "en-US",
      page: "1-5",
    };
    try {
      const response = await axios.get(
        import.meta.env.VITE_MOVIE_API_URL + "movie/now_playing",
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          params: queryParams,
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const getGenreList = async () => {
    const queryParams = {
      language: "en-US",
    };
    try {
      const response = await axios.get(
        import.meta.env.VITE_MOVIE_API_URL + "genre/movie/list",
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          params: queryParams,
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const getTopRated = async (TrendingMoviePageIndex: number) => {
    const queryParams = {
      language: "en-US",
      page: TrendingMoviePageIndex.toString(),
    };
    try {
      const response = await axios.get(
        import.meta.env.VITE_MOVIE_API_URL + "movie/top_rated",
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          params: queryParams,
        }
      );

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const searchMovie = async (searchMovieIndex: number, search) => {
    const queryParams = {
      language: "en-US",
      page: searchMovieIndex.toString(),
      query: search,
      include_adult: false,
    };
    try {
      const response = await axios.get(
        import.meta.env.VITE_MOVIE_API_URL + "search/movie",
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          params: queryParams,
        }
      );

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const getUpcoming = async (UpcomingMoviePageIndex: number) => {
    const queryParams = {
      language: "en-US",
      page: UpcomingMoviePageIndex.toString(),
    };
    try {
      const response = await axios.get(
        import.meta.env.VITE_MOVIE_API_URL + "movie/upcoming",
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          params: queryParams,
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  const getDiscover = async (DiscoverMoviePageIndex: number, filter) => {
    const queryParams = Filter({
      page: DiscoverMoviePageIndex,
      primary_release_year: filter.year,
      sort_by: filter.sort_by,
      vote_average_lte: filter.vote_average,
      with_genres: filter.genre,
    });

    try {
      const response = await axios.get(
        import.meta.env.VITE_MOVIE_API_URL + "discover/movie",
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          params: queryParams,
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const getPeopleDetailsAPI_URL = (type, personID) => {
    const base_url = import.meta.env.VITE_MOVIE_API_URL;
    if (type === "credit") return base_url + `person/${personID}/movie_credits`;
    if (type === "details") return base_url + `person/${personID}`;
  };

  const getPeopleDetails = async (type, personID) => {
    const url = getPeopleDetailsAPI_URL(type, personID);
    try {
      const response = await axios.get(url, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const getUrl = (type, movieId) => {
    const base_url = import.meta.env.VITE_MOVIE_API_URL;
    if (type === "details") return base_url + `movie/${movieId}`;
    if (type === "credits") return base_url + `movie/${movieId}/credits`;
    if (type === "videos") return base_url + `movie/${movieId}/videos`;
    if (type === "images") return base_url + `movie/${movieId}/images`;
    if (type === "socials") return base_url + `movie/${movieId}/external_ids`;
    if (type === "creditDetails")
      return base_url + `person/${personID}/movie_credits`;
  };

  const getMovieDetails = async (movieId: number, type: string) => {
    const url = getUrl(type, movieId);
    if (url === undefined) return;
    try {
      const response = await axios.get(url, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  return {
    getLatestMovies,
    getGenreList,
    getTopRated,
    getUpcoming,
    getDiscover,
    getMovieDetails,
    searchMovie,
    getPeopleDetails,
  };
};

export default MovieManager;
