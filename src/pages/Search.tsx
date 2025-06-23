
import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useCart } from '@/contexts/CartContext';
import { Star, Heart, Search as SearchIcon } from 'lucide-react';

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const { addToCart } = useCart();

  // Mock search results
  const allProducts = [
    {
      id: '1',
      name: 'Premium Wireless Headphones',
      price: 299.99,
      image: '/placeholder.svg',
      rating: 4.8,
      reviews: 124,
      category: 'Electronics',
      description: 'High-quality wireless headphones with noise cancellation'
    },
    {
      id: '2',
      name: 'Smart Fitness Watch',
      price: 199.99,
      image: '/placeholder.svg',
      rating: 4.6,
      reviews: 89,
      category: 'Wearables',
      description: 'Advanced fitness tracking with heart rate monitoring'
    },
    {
      id: '3',
      name: 'Professional Camera',
      price: 899.99,
      image: '/placeholder.svg',
      rating: 4.9,
      reviews: 67,
      category: 'Photography',
      description: 'High-resolution camera for professional photography'
    },
    {
      id: '4',
      name: 'Gaming Mechanical Keyboard',
      price: 159.99,
      image: '/placeholder.svg',
      rating: 4.7,
      reviews: 203,
      category: 'Gaming',
      description: 'RGB mechanical keyboard with customizable keys'
    },
    {
      id: '5',
      name: 'Wireless Bluetooth Speaker',
      price: 79.99,
      image: '/placeholder.svg',
      rating: 4.5,
      reviews: 156,
      category: 'Electronics',
      description: 'Portable speaker with excellent sound quality'
    }
  ];

  const searchResults = allProducts.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams({ q: searchQuery });
  };

  useEffect(() => {
    const query = searchParams.get('q');
    if (query) {
      setSearchQuery(query);
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        {/* Search Header */}
        <div className="mb-8">
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-6">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-gray-800 border-gray-600 text-white pr-12 h-12 text-lg"
              />
              <Button
                type="submit"
                size="sm"
                className="absolute right-1 top-1 h-10 w-10 p-0 bg-blue-600 hover:bg-blue-700"
              >
                <SearchIcon className="h-5 w-5" />
              </Button>
            </div>
          </form>

          {searchQuery && (
            <div className="text-center">
              <h1 className="text-2xl font-bold text-white mb-2">
                Search Results for "{searchQuery}"
              </h1>
              <p className="text-gray-400">
                {searchResults.length} {searchResults.length === 1 ? 'result' : 'results'} found
              </p>
            </div>
          )}
        </div>

        {/* Search Results */}
        {searchQuery ? (
          searchResults.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {searchResults.map((product) => (
                <Card key={product.id} className="bg-gray-800 border-gray-700 hover:border-blue-500 transition-all duration-300">
                  <CardHeader className="p-0">
                    <div className="relative">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                      <Button
                        size="sm"
                        variant="ghost"
                        className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white"
                      >
                        <Heart className="h-4 w-4" />
                      </Button>
                      <Badge className="absolute top-2 left-2 bg-blue-600">
                        {product.category}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <CardTitle className="text-white text-lg mb-2 line-clamp-2">
                      {product.name}
                    </CardTitle>
                    <p className="text-gray-400 text-sm mb-2 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex items-center mb-2">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-gray-300 text-sm ml-1">{product.rating}</span>
                        <span className="text-gray-500 text-sm ml-1">({product.reviews})</span>
                      </div>
                    </div>
                    <p className="text-2xl font-bold text-blue-400">${product.price}</p>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 space-y-2">
                    <Button 
                      className="w-full bg-blue-600 hover:bg-blue-700"
                      onClick={() => addToCart({
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        image: product.image
                      })}
                    >
                      Add to Cart
                    </Button>
                    <Link to={`/product/${product.id}`} className="w-full">
                      <Button variant="outline" className="w-full border-gray-600 text-gray-300 hover:bg-gray-600">
                        View Details
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <SearchIcon className="h-16 w-16 text-gray-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-4">No Results Found</h2>
              <p className="text-gray-400 mb-8">
                We couldn't find any products matching "{searchQuery}". Try different keywords or browse our categories.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  variant="outline" 
                  className="border-gray-600 text-gray-300 hover:bg-gray-700"
                  onClick={() => {
                    setSearchQuery('');
                    setSearchParams({});
                  }}
                >
                  Clear Search
                </Button>
                <Link to="/products">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Browse All Products
                  </Button>
                </Link>
              </div>
            </div>
          )
        ) : (
          <div className="text-center py-12">
            <SearchIcon className="h-16 w-16 text-gray-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-4">Search ATO Store</h2>
            <p className="text-gray-400 mb-8">
              Find the perfect products from our extensive collection
            </p>
            
            {/* Popular Searches */}
            <div className="max-w-md mx-auto">
              <h3 className="text-white font-semibold mb-4">Popular Searches</h3>
              <div className="flex flex-wrap gap-2 justify-center">
                {['headphones', 'watch', 'camera', 'keyboard', 'speaker'].map((term) => (
                  <Button
                    key={term}
                    variant="outline"
                    size="sm"
                    className="border-gray-600 text-gray-300 hover:bg-gray-700"
                    onClick={() => {
                      setSearchQuery(term);
                      setSearchParams({ q: term });
                    }}
                  >
                    {term}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
