import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsThunk } from "../redux/slices/productsSlice";
import { selectFilteredProducts } from "../features/products/productsSelectors";
import { ProductCard } from "../components/ProductCard";
import { SearchBar } from "../components/SearchBar";
import { CategoryFilter } from "../components/CategoryFilter";
import { SortSelector } from "../components/SortSelector";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { ErrorMessage } from "../components/ErrorMessage";
import type { AppDispatch, RootState } from "../redux/store";

export function ProductListingPage() {
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector(selectFilteredProducts);
  const { loading, error } = useSelector(
    (state: RootState) => state.productsReducer
  );

  useEffect(() => {
    dispatch(fetchProductsThunk());
  }, [dispatch]);

  const handleRetry = () => {
    dispatch(fetchProductsThunk());
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden mb-12">
        <div className="absolute inset-0 z-0">
          <img
            src="/assets/hero-bg.png"
            alt="Hero Background"
            className="w-full h-full object-cover opacity-60 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-50/20 via-slate-50/50 to-slate-50" />
        </div>

        <div className="container mx-auto px-6 pt-24 pb-16 relative z-10 text-center">
          <h1 className="text-6xl font-black text-slate-900 mb-6 tracking-tight">
            Discover <span className="text-gradient">Premium</span> Products
          </h1>
          <p className="text-slate-600 text-xl max-w-2xl mx-auto leading-relaxed">
            Experience the future of shopping with our curated collection of
            high-end items, designed for excellence and style.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 pb-12">
        <div className="mb-10 grid grid-cols-1 md:grid-cols-10 gap-4 items-center">
          <div className="md:col-span-6 lg:col-span-6">
            <SearchBar />
          </div>
          <div className="md:col-span-2 lg:col-span-2">
            <CategoryFilter />
          </div>
          <div className="md:col-span-2 lg:col-span-2">
            <SortSelector />
          </div>
        </div>

        {loading && <LoadingSpinner />}

        {error && <ErrorMessage message={error} onRetry={handleRetry} />}

        {!loading && !error && (
          <>
            {products.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">No products found.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
