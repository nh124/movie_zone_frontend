type ResponseResultType = {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: Array<number>;
  id: number;
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

export default ResponseResultType;
