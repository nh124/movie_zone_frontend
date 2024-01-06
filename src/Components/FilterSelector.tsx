import { IoCheckmark } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../Redux/filterReducer";
import GenreDict from "../API_PARSER/GenreDict";

const FilterSelector = ({
  expandDropDown,
  setExpandDropDown,
  filterOption,
  name,
  alt_name,
  order,
}) => {
  const Genre = GenreDict();
  const filterSize = (filterOption?.length * 100) / 2;
  const dispatch = useDispatch();
  const genreDict = GenreDict();
  const { filters } = useSelector((state) => state.filters);
  const AddFilter = (addedFiler, selectFilter) => {
    // console.log(addedFiler, selectFilter);
    if (alt_name === "genre") {
      const value = Object.keys(Genre).find((key) => Genre[key] === addedFiler);
      dispatch(
        setFilter({
          name: alt_name,
          filter: value,
        })
      );
    } else if (alt_name === "vote_average") {
      const value = parseInt(addedFiler, 10) / 100;
      dispatch(
        setFilter({
          name: alt_name,
          filter: value,
        })
      );
    } else {
      dispatch(
        setFilter({
          name: alt_name,
          filter: `${
            alt_name === "sort_by" ? addedFiler + "." + order : addedFiler
          }`,
        })
      );
    }
  };

  return (
    <div className="flex flex-row">
      <div className="flex flex-col gap-1">
        <div className="flex flex-row  items-center gap-0 bg-gray-700 w-full rounded-md px-3">
          <button
            className="px-3 py-3 bg-gray-700 rounded-md text-gray-300 flex flex-row justify-center items-center gap-2 w-full"
            onClick={() =>
              setExpandDropDown({
                name: name,
                status: !expandDropDown.status,
              })
            }
          >
            {filters.alt_name === alt_name ? filters.name : name}
            <IoIosArrowDown size={19} />
          </button>
        </div>

        <div
          className="w-full bg-gray-700 rounded-md flex flex-col text-white items-center transition-height shadow-lg max-h-[200px]"
          style={{
            height: `${
              expandDropDown.status && expandDropDown.name === name
                ? filterSize
                : 0
            }px`,
            overflow: `${filterOption?.length > 4 ? "auto" : "hidden"}`,

            transition: "height 0.3s ease",
          }}
        >
          {filterOption?.map((filter, index) => {
            const selectedFilter =
              alt_name === "vote_average"
                ? filters[alt_name]
                : filters[alt_name].replace(/\.asc|\.desc/g, "");

            return (
              <button
                onClick={() => AddFilter(filter, selectedFilter)}
                key={index}
                className="hover:bg-slate-800 duration-300 w-full px-3 h-[50px] py-3  relative rounded-md group flex flex-row justify-between shadow-md"
              >
                <span>{filter}</span>
                {alt_name === "genre"
                  ? genreDict[selectedFilter] === filter && (
                      <IoCheckmark size={20} />
                    )
                  : selectedFilter === filter && <IoCheckmark size={20} />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FilterSelector;
