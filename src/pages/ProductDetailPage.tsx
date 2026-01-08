import { useNavigate } from "react-router-dom";
import { ArrowLeft, Heart, Star } from "lucide-react";
import { selectIsFavorite } from "../features/products/productsSelectors";
import { useAppSelector } from "../redux/hooks";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { ErrorMessage } from "../components/ErrorMessage";
import { Badge } from "@/components/ui/badge";
import { useProduct } from "../hooks/useProduct";
import { useFavorites } from "../hooks/useFavorites";
import { formatCategory } from "../utils/formatCategory";

export function ProductDetailPage() {
  const navigate = useNavigate();
  const { product, loading, error, retry } = useProduct();
  const { toggle } = useFavorites();
  const isFavorite = useAppSelector((state) =>
    product ? selectIsFavorite(product.id)(state) : false
  );

  const handleToggleFavorite = () => {
    if (product) {
      toggle(product.id);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={retry} />;
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 text-lg mb-4">Product not found</p>
          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-6 py-12">
        <button
          onClick={() => navigate("/")}
          className="mb-8 text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Products
        </button>

        <div className="glass-card overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2 p-12 bg-white flex items-center justify-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-blue-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <img
                src={product.image}
                alt={product.title}
                className="max-w-full max-h-[500px] object-contain relative z-10 transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="md:w-1/2 p-12 flex flex-col">
              <div className="mb-6">
                <Badge className="bg-blue-50 text-blue-600 border-blue-200 uppercase tracking-widest">
                  {formatCategory(product.category)}
                </Badge>
              </div>
              <h1 className="text-4xl font-bold text-slate-900 mb-6 leading-tight">
                {product.title}
              </h1>
              <div className="flex items-center mb-8">
                <div className="flex items-center px-3 py-1.5 bg-yellow-50 rounded-xl mr-4">
                  <Star className="w-5 h-5 text-yellow-500 fill-current" />
                  <span className="ml-2 text-slate-900 font-bold">
                    {product.rating.rate}
                  </span>
                </div>
                <span className="text-slate-400 font-medium">
                  {product.rating.count} Verified Reviews
                </span>
              </div>
              <div className="mb-8">
                <span className="text-5xl font-bold text-slate-900">
                  ${product.price.toFixed(2)}
                </span>
              </div>
              <div className="prose prose-slate mb-10">
                <p className="text-slate-600 text-lg leading-relaxed">
                  {product.description}
                </p>
              </div>
              <div className="mt-auto pt-8 border-t border-slate-100">
                <button
                  onClick={handleToggleFavorite}
                  className={`w-full py-4 px-8 rounded-2xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 active:scale-[0.98] ${
                    isFavorite
                      ? "bg-rose-50 text-rose-600 border border-rose-100 hover:bg-rose-100"
                      : "bg-blue-600 text-white shadow-lg shadow-blue-500/30 hover:bg-blue-700 hover:shadow-blue-500/40"
                  }`}
                >
                  <Heart
                    className="w-6 h-6"
                    fill={isFavorite ? "currentColor" : "none"}
                  />
                  {isFavorite ? "Saved to Favorites" : "Add to Favorites"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
