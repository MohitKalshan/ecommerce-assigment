import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Search } from "lucide-react";
import { setSearchQuery } from "../redux/slices/filtersSlice";
import { debounce } from "../utils/debounce";
import type { AppDispatch } from "../redux/store";

export function SearchBar() {
  const dispatch = useDispatch<AppDispatch>();
  const [localQuery, setLocalQuery] = useState("");

  useEffect(() => {
    const debouncedDispatch = debounce((query: string) => {
      dispatch(setSearchQuery(query));
    }, 300);

    debouncedDispatch(localQuery);

    return () => {
      // Cleanup is handled by debounce function
    };
  }, [localQuery, dispatch]);

  return (
    <div className="w-full">
      <label htmlFor="search" className="sr-only">
        Search products
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          id="search"
          type="text"
          value={localQuery}
          onChange={(e) => setLocalQuery(e.target.value)}
          placeholder="Search items..."
          className="input-field pl-12 border-none shadow-none focus:ring-0"
          aria-label="Search products"
        />
      </div>
    </div>
  );
}
