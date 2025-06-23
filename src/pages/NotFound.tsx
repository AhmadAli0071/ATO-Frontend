
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Home, Search } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-16">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-lg mx-auto">
          {/* 404 Illustration */}
          <div className="mb-8">
            <div className="w-32 h-32 bg-blue-100 rounded-full mx-auto mb-6 flex items-center justify-center">
              <span className="text-4xl font-bold text-blue-600">404</span>
            </div>
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-4">Page Not Found</h1>
          <p className="text-gray-600 text-lg mb-8 leading-relaxed">
            Oops! The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="/">
              <Button className="bg-blue-500 hover:bg-blue-600 text-white rounded-xl px-8 py-3 transition-all duration-300 hover:scale-105">
                <Home className="mr-2 h-5 w-5" />
                Go Home
              </Button>
            </Link>
            <Button 
              variant="outline" 
              className="border-gray-200 text-gray-700 hover:bg-gray-50 rounded-xl px-8 py-3"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Go Back
            </Button>
          </div>

          {/* Quick Search */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 mb-8">
            <h3 className="text-gray-900 font-semibold mb-4 flex items-center justify-center">
              <Search className="h-5 w-5 mr-2 text-blue-500" />
              Quick Search
            </h3>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Search for products..."
                className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500"
              />
              <Button className="bg-blue-500 hover:bg-blue-600 text-white rounded-xl px-6">
                Search
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <h3 className="text-gray-900 font-semibold mb-6">Popular Pages</h3>
            <div className="grid grid-cols-2 gap-4">
              <Link 
                to="/products" 
                className="text-blue-500 hover:text-blue-600 py-2 px-4 rounded-xl hover:bg-blue-50 transition-colors duration-200"
              >
                All Products
              </Link>
              <Link 
                to="/contact" 
                className="text-blue-500 hover:text-blue-600 py-2 px-4 rounded-xl hover:bg-blue-50 transition-colors duration-200"
              >
                Contact Us
              </Link>
              <Link 
                to="/cart" 
                className="text-blue-500 hover:text-blue-600 py-2 px-4 rounded-xl hover:bg-blue-50 transition-colors duration-200"
              >
                Shopping Cart
              </Link>
              <Link 
                to="/login" 
                className="text-blue-500 hover:text-blue-600 py-2 px-4 rounded-xl hover:bg-blue-50 transition-colors duration-200"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
