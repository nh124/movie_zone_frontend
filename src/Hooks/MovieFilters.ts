import { useEffect, useState } from "react";
import GenreDict from "../API_PARSER/GenreDict";

const MovieFilters = () => {
  const [filterOptions, setFilterOptions] = useState([{}]);
  const Genre = GenreDict();
  useEffect(() => {
    const created_filter = [
      {
        id: 1,
        name: "Sort By",
        alt_name: "sort_by",
        filter: ["popularity", "vote_average"],
      },
      {
        id: 2,
        name: "years",
        alt_name: "year",
        filter: ["2018", "2019", "2020", "2021", "2022", "2023", "2024"],
      },
      {
        id: 3,
        name: "ratings",
        alt_name: "vote_average",
        filter: ["40%", "50%", "60%", "70%"],
      },
      { id: 4, name: "genre", alt_name: "genre", filter: Object.values(Genre) },
    ];
    setFilterOptions(created_filter);
  }, [Genre]);

  return filterOptions;
};

export default MovieFilters;
