import MagnifyingGlassIcon from "@heroicons/react/24/outline/MagnifyingGlassIcon";
import { useSearchParams } from "react-router-dom";

function SearchInput() {
  const [searchParams, setSearchParams] = useSearchParams();
  return (
    <div className="w-full max-w-lg mr lg:max-w-xs">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <div className="relative mr-4">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <MagnifyingGlassIcon
            className="h-5 w-5 text-slate-400"
            aria-hidden="true"
          />
        </div>
        <input
          id="search"
          name="search"
          className="block w-full rounded-md border border-slate-300 bg-slate py-2 pl-10 pr-3 leading-5 placeholder-slate-500 focus:border-slate-500 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-slate-500 sm:text-sm"
          placeholder="Search"
          type="search"
          onChange={({ target: { value } }) =>
            setSearchParams({ search: value })
          }
          value={searchParams.get("search") || ""}
        />
      </div>
    </div>
  );
}

export { SearchInput };
