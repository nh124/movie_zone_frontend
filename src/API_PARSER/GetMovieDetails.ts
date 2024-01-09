import { useEffect, useState } from "react";
import MovieManager from "../API/MovieManager";

const GetMovieDetails = (movieID: string | undefined, type: string) => {
  const [movieDetails, setMovieDetails] = useState({});
  const { getMovieDetails } = MovieManager();

  const getDetails = () => {
    if (movieID === undefined) return;
    getMovieDetails(parseInt(movieID, 10), type)
      .then((response) => {
        setMovieDetails(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getDetails();
  }, []);

  return movieDetails;
};

export default GetMovieDetails;
