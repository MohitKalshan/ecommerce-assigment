import { Link } from "react-router-dom";

export function Navbar() {
  return (
    <header className="glass-nav">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          <Link
            to="/"
            className="text-2xl font-bold hover:opacity-80 transition-opacity"
          >
            E-Commerce
          </Link>
          <nav className="flex items-center space-x-8">
            <Link
              to="/"
              className="text-slate-600 hover:text-blue-600 font-medium transition-colors"
            >
              Products
            </Link>
            <Link
              to="/favorites"
              className="text-slate-600 hover:text-blue-600 font-medium transition-colors"
            >
              Favorites
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
