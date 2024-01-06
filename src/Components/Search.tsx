import { useState } from "react";

const Search = ({ showSearch }) => {
  const [search, setSearch] = useState("");
  const onChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div
      className={`w-full h-auto bg-sky-900 absolute ${
        showSearch ? "translate-y-[53px] z-30" : "translate-y-[0px] -z-10"
      } flex justify-center items-center px-3 py-3 duration-300 ease-in-out`}
    >
      <form action={`/search/${search}`} className="w-full h-full">
        <input
          onChange={onChange}
          type="text"
          className="w-full h-full 
          px-3 py-2 bg-gray-700 text-white border border-gray-400 rounded-md focus:outline-none focus:border-blue-3"
          placeholder="Search a movie"
        />
      </form>
    </div>
  );
};

export default Search;
