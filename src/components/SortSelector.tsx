import { useDispatch, useSelector } from "react-redux";
import { setSortBy } from "../redux/slices/filtersSlice";
import type { SortOption } from "../types/product";
import type { AppDispatch, RootState } from "../redux/store";

export function SortSelector() {
  const dispatch = useDispatch<AppDispatch>();
  const sortBy = useSelector((state: RootState) => state.filtersReducer.sortBy);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSortBy(e.target.value as SortOption));
  };

  return (
    <div className="w-full">
      <label htmlFor="sort" className="sr-only">
        Sort by price
      </label>
      <select
        id="sort"
        value={sortBy}
        onChange={handleSortChange}
        className="input-field cursor-pointer border-slate-100 shadow-sm focus:ring-4 focus:ring-blue-500/5"
        aria-label="Sort by price"
      >
        <option value="none">No Sort</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
      </select>
    </div>
  );
}
