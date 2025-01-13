// import { useEffect, useState } from "react";
// import MovieManager from "../API/MovieManager";

// const ParseSplashImageData = () => {
//   const { getLatestMovies, getGenreList } = MovieManager();
//   const image_base_url = import.meta.env.VITE_IMAGE_BASE_URL;
//   const [genreDict, setGenreDict] = useState({});

//   type MovieDataType = {
//     adult: boolean;
//     backdrop_path: string;
//     genre_ids: number[];
//     id: number;
//     original_language: string;
//     original_title: string;
//     overview: string;
//     popularity: number;
//     poster_path: string;
//     release_date: string;
//     title: string;
//     video: boolean;
//     vote_average: number;
//     vote_count: number;
//   };

//   type responseType = {
//     dates: {
//       minimum: string;
//       maximum: string;
//     };
//     page: number;
//     results: Array<MovieDataType>;
//     total_pages: number;
//     total_results: number;
//   };
//   type GenreType = {
//     id: number;
//     name: string;
//   };
//   type genreResponseType = {
//     genres: Array<GenreType>
//   }
//   const [splashImage, setSplashImage] = useState([
//     {
//       id: 0,
//       backdrop_image_url: "",
//       genre: [],
//       overview: "",
//       poster_image_url: image_base_url,
//       release_date: "",
//       title: "",
//       vote_average: 0,
//       popularity: 0,
//     },
//   ]);
//   const parseMovieResults = (result: MovieDataType) => {
//     const resultParsed = {
//       id: result.id,
//       backdrop_image_url: image_base_url + result.backdrop_path,
//       genre: result.genre_ids.map((id) => genreDict[id]),
//       overview: result.overview,
//       poster_image_url: image_base_url + result.poster_path,
//       release_date: result.release_date,
//       title: result.title,
//       vote_average: result.vote_average,
//       popularity: result.popularity,
//     };
//     return resultParsed;
//   };

//   useEffect(() => {
//     getGenreList()
//       .then((response: genreResponseType) => {
//         console.log(response);
//         const init_genreDict = {} as GenreType;
//         response.genres.map((genre) => {
//           init_genreDict[genre.id] = genre.name;
//         });
//         setGenreDict(init_genreDict);
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   }, []);

//   useEffect(() => {
//     getLatestMovies()
//       .then((response: responseType) => {
//         console.log(response);
//         const mappedResult = response.results
//           .filter((result) => result.backdrop_path !== null)
//           .filter((result) => result.overview !== null)
//           .map((result) => parseMovieResults(result))
//           .slice(0, 5);
//         setSplashImage(mappedResult);
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   }, [genreDict]);

//   return splashImage;
// };

// export default ParseSplashImageData;

import { useEffect, useState } from "react";
import MovieManager from "../API/MovieManager";

type MovieDataType = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

type responseType = {
  dates: {
    minimum: string;
    maximum: string;
  };
  page: number;
  results: Array<MovieDataType>;
  total_pages: number;
  total_results: number;
};

type GenreType = Record<number, string>;
type genreResponseType = {
  genres: Array<{ id: number; name: string }>;
};

const ParseSplashImageData = () => {
  const { getLatestMovies, getGenreList } = MovieManager();
  const image_base_url = import.meta.env.VITE_IMAGE_BASE_URL;
  const [genreDict, setGenreDict] = useState<GenreType | null>(null);

  const [splashImage, setSplashImage] = useState<
    Array<{
      id: number;
      backdrop_image_url: string;
      genre: Array<string>;
      overview: string;
      poster_image_url: string;
      release_date: string;
      title: string;
      vote_average: number;
      popularity: number;
    }>
  >([
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

  const parseMovieResults = (result: MovieDataType) => {
    if (genreDict === null) {
      return {
        id: 0,
        backdrop_image_url: "",
        genre: [],
        overview: "",
        poster_image_url: "",
        release_date: "",
        title: "",
        vote_average: 0,
        popularity: 0,
      };
    }
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
      .then((response: genreResponseType) => {
        const init_genreDict: GenreType = {};
        response.genres.forEach((genre) => {
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
      .then((response: responseType) => {
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
