import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ArrowLeft, Heart } from "lucide-react";
import { selectFavoriteProducts } from "../features/products/productsSelectors";
import { ProductCard } from "../components/ProductCard";

export function FavoritesPage() {
  const favoriteProducts = useSelector(selectFavoriteProducts);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 mb-2">
              My Favorites
            </h1>
            <p className="text-slate-500">
              The products you've saved for later.
            </p>
          </div>
          <Link
            to="/"
            className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Products
          </Link>
        </div>

        {favoriteProducts.length === 0 ? (
          <div className="glass-card text-center py-20 px-6">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-50 rounded-full mb-6">
              <Heart className="h-10 w-10 text-blue-400" fill="none" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              No favorites yet
            </h2>
            <p className="text-slate-500 mb-8 max-w-sm mx-auto">
              Start adding products to your favorites to see them here. Browse
              our collection to find something you love!
            </p>
            <Link to="/" className="btn-primary inline-block">
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {favoriteProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
