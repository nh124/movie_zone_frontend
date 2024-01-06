import { useEffect, useState } from "react";
import MovieManager from "../API/MovieManager";

const ParseSplashImageData = () => {
  const { getLatestMovies, getGenreList } = MovieManager();
  const image_base_url = import.meta.env.VITE_IMAGE_BASE_URL;
  const [genreDict, setGenreDict] = useState({});
  const [splashImage, setSplashImage] = useState([
    {
      id: 0,
      backdrop_image_url: "",
      genre: [],
      overview: "",
      poster_image_url: image_base_url,
      release_date: "",
      title: "",
      vote_average: 0,
      popularity: 0,
    },
  ]);
  const parseMovieResults = (result) => {
    const resultParsed = {
      id: result.id,
      backdrop_image_url: image_base_url + result.backdrop_path,
      genre: result.genre_ids.map((id) => genreDict[id]),
      overview: result.overview,
      poster_image_url: image_base_url + result.poster_path,
      release_date: result.release_date,
      title: result.title,
      vote_average: result.vote_average,
      popularity: result.popularity,
    };
    return resultParsed;
  };

  useEffect(() => {
    getGenreList()
      .then((response) => {
        const init_genreDict = {};
        response.genres.map((genre) => {
          init_genreDict[genre.id] = genre.name;
        });
        setGenreDict(init_genreDict);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    getLatestMovies()
      .then((response) => {
        const mappedResult = response.results
          .filter((result) => result.backdrop_path !== null)
          .filter((result) => result.overview !== null)
          .map((result) => parseMovieResults(result))
          .slice(0, 5);
        setSplashImage(mappedResult);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [genreDict]);

  return splashImage;
};

export default ParseSplashImageData;
