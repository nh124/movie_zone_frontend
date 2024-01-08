import { useState } from "react";
import { useDispatch } from "react-redux";
import FilterSelector from "./FilterSelector";
import { setSubmitFilter } from "../Redux/filterReducer";
import { MdKeyboardDoubleArrowDown } from "react-icons/md";
import MovieFilters from "../Hooks/MovieFilters";

const Filter = ({ showFilters }: { showFilters: boolean }) => {
  const dispatch = useDispatch();
  const [expandDropDown, setExpandDropDown] = useState({
    name: "",
    status: false,
  });
  const [order, setOrder] = useState("desc");
  const filterOptions = MovieFilters();
  type filterType = {
    id: number;
    name: string;
    alt_name: string;
    filter: Array<string>;
  };
  return (
    <div
      className={`w-full h-auto sm:flex flex-row flex-wrap gap-2 py-2 px-2 max-sm:bg-slate-900 rounded-lg ${
        showFilters ? "flex" : "hidden"
      }`}
    >
      <div className="flex items-start">
        <button
          className={`bg-gray-800 rounded-md px-3 py-3 hover:bg-slate-900 `}
          onClick={() =>
            order === "desc" ? setOrder("asc") : setOrder("desc")
          }
        >
          <div
            className={`duration-300 ${
              order === "asc" ? "rotate-180" : "rotate-0"
            }`}
          >
            <MdKeyboardDoubleArrowDown color={"white"} size={19} />
          </div>
        </button>
      </div>
      {filterOptions.map((IndFilter: filterType) => (
        <FilterSelector
          key={IndFilter.id}
          name={IndFilter.name}
          alt_name={IndFilter.alt_name}
          expandDropDown={expandDropDown}
          setExpandDropDown={setExpandDropDown}
          filterOption={IndFilter.filter}
          order={order}
        />
      ))}
      <button
        className="px-3 py-3 bg-blue-800 text-white rounded-lg max-h-[50px]"
        onClick={() => dispatch(setSubmitFilter(true))}
      >
        Submit
      </button>
    </div>
  );
};

export default Filter;
