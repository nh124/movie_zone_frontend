import { useEffect, useState } from "react";
import MovieManager from "../API/MovieManager";

const GetMovieDetails = (movieID, type) => {
  const [movieDetails, setMovieDetails] = useState({});
  const { getMovieDetails } = MovieManager();

  const getDetails = () => {
    getMovieDetails(movieID, type)
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
