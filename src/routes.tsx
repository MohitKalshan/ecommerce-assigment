import { Routes, Route } from "react-router-dom";
import { ProductListingPage } from "./pages/ProductListingPage";
import { ProductDetailPage } from "./pages/ProductDetailPage";
import { FavoritesPage } from "./pages/FavoritesPage";
import { Link } from "react-router-dom";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ProductListingPage />} />
      <Route path="/product/:id" element={<ProductDetailPage />} />
      <Route path="/favorites" element={<FavoritesPage />} />
      <Route
        path="*"
        element={
          <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
              <p className="text-gray-600 mb-6">Page not found</p>
              <Link
                to="/"
                className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              >
                Go Home
              </Link>
            </div>
          </div>
        }
      />
    </Routes>
  );
}
