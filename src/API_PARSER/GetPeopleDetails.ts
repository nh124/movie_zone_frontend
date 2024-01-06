import { useEffect, useState } from "react";
import MovieManager from "../API/MovieManager";

const GetPeopleDetails = (type, personID) => {
  const [movieDetails, setMovieDetails] = useState({});
  const { getMovieDetails } = MovieManager();

  const getDetails = () => {
    getMovieDetails(type, personID)
      .then((response) => {
        setMovieDetails(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (personID === undefined || personID === null || personID === "") return;
    getDetails();
  }, [personID]);

  return movieDetails;
};

export default GetPeopleDetails;
