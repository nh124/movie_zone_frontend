import { useEffect, useState } from "react";
import MovieManager from "../API/MovieManager";

type Genre = {
  id: number;
  name: string;
};

const GenreDict = () => {
  const [genreDict, setGenreDict] = useState<{ [key: number]: string }>({});
  const { getGenreList } = MovieManager();

  useEffect(() => {
    getGenreList()
      .then((response) => {
        const init_genreDict: { [key: number]: string } = {};
        response.genres?.map((genre: Genre) => {
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
