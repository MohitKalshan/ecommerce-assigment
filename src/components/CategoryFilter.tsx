import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCategory } from "../redux/slices/filtersSlice";
import { fetchCategories } from "../services/api";
import type { AppDispatch, RootState } from "../redux/store";
import { useState } from "react";

export function CategoryFilter() {
  const dispatch = useDispatch<AppDispatch>();
  const selectedCategory = useSelector(
    (state: RootState) => state.filtersReducer.selectedCategory
  );
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCategories() {
      try {
        const cats = await fetchCategories();
        setCategories(cats);
      } catch (error) {
        console.error("Failed to load categories:", error);
      } finally {
        setLoading(false);
      }
    }
    loadCategories();
  }, []);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setCategory(e.target.value));
  };

  return (
    <div className="w-full">
      <label htmlFor="category" className="sr-only">
        Filter by category
      </label>
      <select
        id="category"
        value={selectedCategory}
        onChange={handleCategoryChange}
        disabled={loading}
        className="input-field cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed border-slate-100 shadow-sm focus:ring-4 focus:ring-blue-500/5"
        aria-label="Filter by category"
      >
        <option value="all">All Categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
}
