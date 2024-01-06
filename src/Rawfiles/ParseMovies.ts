const ParseMovies = (movie, GenreDictionary) => {
  const image_base_url = import.meta.env.VITE_IMAGE_BASE_URL;

  const resultParsed = {
    id: movie?.id,
    backdrop_image_url: image_base_url + movie?.backdrop_path,
    genre: movie.genre_ids?.map((id) => GenreDictionary[id]),
    overview: movie?.overview,
    poster_image_url: image_base_url + movie?.poster_path,
    release_date: movie?.release_date,
    title: movie.title,
    vote_average: movie?.vote_average,
    popularity: movie?.popularity,
  };
  return resultParsed;
};

export default ParseMovies;
