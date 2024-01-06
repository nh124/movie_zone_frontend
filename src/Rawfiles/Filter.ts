const MovieFilters = ({
  page,
  primary_release_year,
  sort_by,
  vote_average_lte,
  with_genres,
}: {
  page: number;
  primary_release_year: string;
  sort_by: string;
  vote_average_lte: string;
  with_genres: string;
}) => {
  const date = new Date();
  const year = date.getFullYear();
  const filter = {
    page: page,
    primary_release_year:
      primary_release_year === "" ? year : primary_release_year,
    sort_by: sort_by === "" ? "popularity.desc" : sort_by,
    "vote_average.lte":
      vote_average_lte === "" ? "" : parseInt(vote_average_lte, 10) / 10,
    with_genres: with_genres === "" ? "" : with_genres,
  };
  return filter;
};
export default MovieFilters;
