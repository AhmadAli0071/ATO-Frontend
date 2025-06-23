
import { Link } from 'react-router-dom';
import { Heart, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="text-3xl font-bold text-gray-900 mb-4 block transition-all duration-300 hover:scale-105">
              ATO <span className="text-blue-600">Store</span>
            </Link>
            <p className="text-gray-600 text-lg mb-6 max-w-md">
              Your premium destination for quality products and exceptional service. We're committed to providing the best shopping experience.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-blue-600 hover:text-white transition-all duration-300 hover:scale-110">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-blue-600 hover:text-white transition-all duration-300 hover:scale-110">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-blue-600 hover:text-white transition-all duration-300 hover:scale-110">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-blue-600 hover:text-white transition-all duration-300 hover:scale-110">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-gray-900 font-semibold mb-4 text-lg">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-gray-600 hover:text-blue-600 transition-colors duration-300">Home</Link></li>
              <li><Link to="/products" className="text-gray-600 hover:text-blue-600 transition-colors duration-300">Products</Link></li>
              <li><Link to="/contact" className="text-gray-600 hover:text-blue-600 transition-colors duration-300">Contact</Link></li>
              <li><Link to="/cart" className="text-gray-600 hover:text-blue-600 transition-colors duration-300">Cart</Link></li>
              <li><Link to="/wishlist" className="text-gray-600 hover:text-blue-600 transition-colors duration-300">Wishlist</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-gray-900 font-semibold mb-4 text-lg">Support</h3>
            <ul className="space-y-3">
              <li><Link to="/contact" className="text-gray-600 hover:text-blue-600 transition-colors duration-300">Help Center</Link></li>
              <li><Link to="/contact" className="text-gray-600 hover:text-blue-600 transition-colors duration-300">Shipping Info</Link></li>
              <li><Link to="/contact" className="text-gray-600 hover:text-blue-600 transition-colors duration-300">Returns & Exchanges</Link></li>
              <li><Link to="/contact" className="text-gray-600 hover:text-blue-600 transition-colors duration-300">Size Guide</Link></li>
              <li><Link to="/contact" className="text-gray-600 hover:text-blue-600 transition-colors duration-300">Track Order</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              © 2024 ATO Store. All rights reserved. Made with <Heart className="h-4 w-4 text-red-500 inline mx-1" /> by ATO Team.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link to="/contact" className="text-gray-500 hover:text-blue-600 transition-colors duration-300">Privacy Policy</Link>
              <Link to="/contact" className="text-gray-500 hover:text-blue-600 transition-colors duration-300">Terms of Service</Link>
              <Link to="/contact" className="text-gray-500 hover:text-blue-600 transition-colors duration-300">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
