import { useEffect, useState } from "react";
import MovieManager from "../API/MovieManager";

const GenreDict = () => {
  const [genreDict, setGenreDict] = useState({});
  const { getGenreList } = MovieManager();
  useEffect(() => {
    getGenreList()
      .then((response) => {
        const init_genreDict = {};
        response.genres?.map((genre) => {
          init_genreDict[genre.id] = genre.name;
        });
        setGenreDict(init_genreDict);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return genreDict;
};

export default GenreDict;
