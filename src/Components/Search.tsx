import { useEffect, useRef, useState } from "react";

const Search = ({ showSearch }: { showSearch: boolean }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [search, setSearch] = useState("");
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    if (showSearch && inputRef.current) {
      inputRef.current.focus();
    }

    if (!showSearch) {
      setSearch("");
    }
  }, [showSearch]);

  return (
    <div
      className={`w-full h-auto bg-sky-900 absolute ${
        showSearch ? "translate-y-[53px] z-30" : "translate-y-[0px] -z-10"
      } flex justify-center items-center px-3 py-3 duration-300 ease-in-out`}
    >
      <form action={`/search/${search}`} className="w-full h-full">
        <input
          onChange={onChange}
          ref={inputRef}
          value={search}
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
