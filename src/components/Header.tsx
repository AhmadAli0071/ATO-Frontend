
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, User, Heart, ShoppingCart, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { totalItems } = useCart();
  const { user, logout } = useAuth();
  const location = useLocation();

  const navigationItems = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto container-padding">
        {/* Top bar */}
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-gray-900 transition-all duration-300 hover:scale-105">
            ATO <span className="text-blue-600">Store</span>
          </Link>

          {/* Search bar - Desktop */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-gray-50 border-gray-200 text-gray-900 pr-12 h-12 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              />
              <Button
                type="submit"
                size="sm"
                className="absolute right-1 top-1 h-10 w-10 p-0 bg-blue-600 hover:bg-blue-700 rounded-lg transition-all duration-300 hover:scale-105"
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </form>

          {/* Right side icons */}
          <div className="flex items-center space-x-2">
            {user ? (
              <div className="hidden md:flex items-center space-x-3">
                <span className="text-sm text-gray-600">Hi, {user.name}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={logout}
                  className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-300"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <Link to="/login">
                <Button variant="ghost" size="sm" className="hidden md:flex items-center space-x-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-300">
                  <User className="h-4 w-4" />
                  <span>Login</span>
                </Button>
              </Link>
            )}

            <Link to="/wishlist" className="relative">
              <Button variant="ghost" size="sm" className="p-3 text-gray-600 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all duration-300 hover:scale-105">
                <Heart className="h-5 w-5" />
              </Button>
            </Link>

            <Link to="/cart" className="relative">
              <Button variant="ghost" size="sm" className="p-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-300 hover:scale-105">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-blue-600 text-xs text-white animate-pulse">
                    {totalItems}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden p-3 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all duration-300"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Navigation - Desktop */}
        <nav className="hidden md:flex space-x-8 pb-4">
          {navigationItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`text-sm font-medium transition-all duration-300 hover:text-blue-600 relative group ${
                isActive(item.href) ? 'text-blue-600' : 'text-gray-600'
              }`}
            >
              {item.name}
              <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transform transition-transform duration-300 ${
                isActive(item.href) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
              }`}></span>
            </Link>
          ))}
          {user?.isAdmin && (
            <Link
              to="/admin"
              className={`text-sm font-medium transition-all duration-300 hover:text-blue-600 relative group ${
                location.pathname.startsWith('/admin') ? 'text-blue-600' : 'text-gray-600'
              }`}
            >
              Admin
              <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transform transition-transform duration-300 ${
                location.pathname.startsWith('/admin') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
              }`}></span>
            </Link>
          )}
          {user && (
            <Link
              to="/dashboard"
              className={`text-sm font-medium transition-all duration-300 hover:text-blue-600 relative group ${
                location.pathname.startsWith('/dashboard') ? 'text-blue-600' : 'text-gray-600'
              }`}
            >
              Dashboard
              <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transform transition-transform duration-300 ${
                location.pathname.startsWith('/dashboard') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
              }`}></span>
            </Link>
          )}
        </nav>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 animate-fade-in">
          <div className="container mx-auto container-padding py-4 space-y-4">
            {/* Mobile search */}
            <form onSubmit={handleSearch} className="flex">
              <div className="relative w-full">
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-gray-50 border-gray-200 text-gray-900 pr-12 h-12 rounded-xl focus:ring-2 focus:ring-blue-500"
                />
                <Button
                  type="submit"
                  size="sm"
                  className="absolute right-1 top-1 h-10 w-10 p-0 bg-blue-600 hover:bg-blue-700 rounded-lg"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </form>

            {/* Mobile navigation */}
            <nav className="space-y-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block py-3 px-4 text-sm font-medium transition-all duration-300 rounded-lg ${
                    isActive(item.href) ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              {user?.isAdmin && (
                <Link
                  to="/admin"
                  className={`block py-3 px-4 text-sm font-medium transition-all duration-300 rounded-lg ${
                    location.pathname.startsWith('/admin') ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Admin
                </Link>
              )}
              {user && (
                <Link
                  to="/dashboard"
                  className={`block py-3 px-4 text-sm font-medium transition-all duration-300 rounded-lg ${
                    location.pathname.startsWith('/dashboard') ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
              )}
            </nav>

            {/* Mobile auth */}
            {user ? (
              <div className="space-y-2 pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600 px-4">Hi, {user.name}</p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    logout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full justify-start text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <div className="pt-4 border-t border-gray-200">
                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="ghost" size="sm" className="w-full justify-start flex items-center space-x-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
                    <User className="h-4 w-4" />
                    <span>Login</span>
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
