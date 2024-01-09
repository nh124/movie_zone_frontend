import DateConverter from "./DateConverter";

const ParseMovieDetails = (movie: any, type: string): any => {
  const image_base_url = import.meta.env.VITE_IMAGE_BASE_URL;
  const movieParsed = {
    id: movie?.id,
    backdrop_image_url: image_base_url + movie?.backdrop_path,
    homePage: movie?.homepage,
    originalTitle: movie?.original_title,
    overView: movie?.overview,
    genres: movie?.genres,
    status: movie?.status,
    spoken_languages: movie?.spoken_languages?.map((language: any) => ({
      id: language.id,
      english_name: language?.english_name,
      name: language?.name,
    })),
    productionCompanies: movie?.production_companies?.map((company: any) => ({
      id: company.id,
      name: company?.name,
      logoPath: image_base_url + company?.logo_path,
    })),
    voteAverage: movie?.vote_average,
    releaseDate: DateConverter(movie?.release_date),
    title: movie?.title,
    tagline: movie?.tagline,
    revenue: movie?.revenue,
    runtime: movie?.runtime,
  };

  const creditsParsed = {
    cast: movie?.cast?.map((cast: any) => ({
      id: cast.id,
      name: cast?.name,
      character: cast?.character,
      profileImage: image_base_url + cast?.profile_path,
    })),
    crew: movie?.crew
      ?.filter((cast: any) => cast?.job === "Director")
      ?.map((cast: any) => ({
        id: cast.id,
        name: cast?.name,
        job: cast?.job,
        department: cast?.known_for_department,
      })),
  };

  const videosParsed = {
    video: movie?.results
      ?.filter((video: any) => video?.type === "Trailer")
      ?.map((video: any) => ({ key: video.key })),
  };

  const imagesParsed = {
    backdrops: movie?.backdrops?.map((backdrop: any) => ({
      aspect_ratio: backdrop?.aspect_ratio,
      height: backdrop?.height,
      file_path: image_base_url + backdrop?.file_path,
      width: backdrop?.width,
    })),
    logos: movie?.logos?.map((logo: any) => ({
      aspect_ratio: logo?.aspect_ratio,
      height: logo?.height,
      file_path: image_base_url + logo?.file_path,
      width: logo?.width,
    })),
    posters: movie?.posters?.map((poster: any) => ({
      aspect_ratio: poster?.aspect_ratio,
      height: poster?.height,
      file_path: image_base_url + poster?.file_path,
      width: poster?.width,
    })),
  };

  if (type === "details") return movieParsed;
  if (type === "credits") return creditsParsed;
  if (type === "videos") return videosParsed;
  if (type === "images") return imagesParsed;
};

export default ParseMovieDetails;
