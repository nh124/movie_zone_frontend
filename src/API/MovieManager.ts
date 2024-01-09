/* eslint-disable no-useless-catch */
import axios from "axios";
import Filter from "../Rawfiles/Filter";

type filterType = {
  sort_by: string;
  vote_average: string;
  year: string;
  genre: string;
};
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

  const searchMovie = async (
    searchMovieIndex: number,
    search: string | undefined
  ) => {
    if (search === undefined) return;
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
  const getDiscover = async (
    DiscoverMoviePageIndex: number,
    filter: filterType
  ) => {
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

  const getPeopleDetailsAPI_URL = (type: string, personID: number) => {
    const base_url = import.meta.env.VITE_MOVIE_API_URL;
    if (type === "credit") return base_url + `person/${personID}/movie_credits`;
    if (type === "details") return base_url + `person/${personID}`;
  };

  const getPeopleDetails = async (type: string, personID: number) => {
    const url = getPeopleDetailsAPI_URL(type, personID);
    if (url === undefined) throw new Error("Url not available");
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

  // type typeTypes = "details" || "credits" || "video" || "images" || "socials" || "creditDetails";

  const getUrl = (type: string, movieId: number) => {
    const base_url = import.meta.env.VITE_MOVIE_API_URL;
    if (type === "details") return base_url + `movie/${movieId}`;
    if (type === "credits") return base_url + `movie/${movieId}/credits`;
    if (type === "videos") return base_url + `movie/${movieId}/videos`;
    if (type === "images") return base_url + `movie/${movieId}/images`;
    if (type === "socials") return base_url + `movie/${movieId}/external_ids`;
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
