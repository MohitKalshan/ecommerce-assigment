import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Heart } from "lucide-react";
import { toggleFavorite } from "../redux/slices/favoritesSlice";
import { selectIsFavorite } from "../features/products/productsSelectors";
import type { Product } from "../types/product";
import type { AppDispatch, RootState } from "../redux/store";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const dispatch = useDispatch<AppDispatch>();
  const isFavorite = useSelector((state: RootState) =>
    selectIsFavorite(product.id)(state)
  );

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(toggleFavorite(product.id));
  };

  return (
    <Link
      to={`/product/${product.id}`}
      className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 group flex flex-col h-full border border-slate-50"
    >
      {/* Top Section with Gradient */}
      <div className="relative aspect-square bg-linear-to-b from-gray-300 via-gray-200 to-gray-100 p-10 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-contain relative z-10 drop-shadow-2xl group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />

        <button
          onClick={handleToggleFavorite}
          className="absolute top-3 right-3 p-1 bg-black/10 hover:bg-black/20 backdrop-blur-xl rounded-full transition-all duration-300 z-20"
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart
            className="w-6 h-6 text-white"
            fill={isFavorite ? "currentColor" : "none"}
          />
        </button>
      </div>

      {/* Bottom Section with Details */}
      <div className="p-6 pb-8 flex flex-col grow">
        <h3 className="text-base min-h-10 font-extrabold text-[#1A202C] mb-3 line-clamp-2 leading-tight tracking-tight">
          {product.title}
        </h3>

        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="outline" className="text-[10px] bg-blue-50 text-blue-600 border-blue-200 uppercase">
            {product.category}
          </Badge>
          <Badge variant="outline" className="text-[10px] bg-blue-50 text-blue-600 border-blue-200 uppercase">
            Premium Quality
          </Badge>
        </div>

        <p className="text-slate-400 text-sm leading-relaxed line-clamp-3 mb-8">
          {product.description}
        </p>

        <div className="mt-auto flex items-center justify-between gap-6">
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mb-2">
              Price
            </span>
            <span className="text-4xl font-black text-[#1A202C] leading-none">
              ${product.price.toFixed(2)}
            </span>
          </div>
          
        </div>
      </div>
    </Link>
  );
}
