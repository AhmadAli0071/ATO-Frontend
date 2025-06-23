
import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useCart } from '@/contexts/CartContext';
import { Star, Heart, Filter, Grid, List, ShoppingCart } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Products = () => {
  const { addToCart } = useCart();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('name');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedRating, setSelectedRating] = useState('all');

  const allProducts = [
    {
      id: '1',
      name: 'Premium Wireless Headphones',
      price: 299.99,
      originalPrice: 399.99,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop',
      rating: 4.8,
      reviews: 124,
      category: 'Electronics',
      description: 'High-quality wireless headphones with noise cancellation',
      isOnSale: true
    },
    {
      id: '2',
      name: 'Smart Fitness Watch',
      price: 199.99,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop',
      rating: 4.6,
      reviews: 89,
      category: 'Wearables',
      description: 'Advanced fitness tracking with heart rate monitoring'
    },
    {
      id: '3',
      name: 'Professional Camera',
      price: 899.99,
      image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=300&fit=crop',
      rating: 4.9,
      reviews: 67,
      category: 'Photography',
      description: 'High-resolution camera for professional photography'
    },
    {
      id: '4',
      name: 'Gaming Mechanical Keyboard',
      price: 159.99,
      originalPrice: 199.99,
      image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=300&fit=crop',
      rating: 4.7,
      reviews: 203,
      category: 'Gaming',
      description: 'RGB mechanical keyboard with customizable keys',
      isOnSale: true
    },
    {
      id: '5',
      name: 'Wireless Bluetooth Speaker',
      price: 79.99,
      image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=300&fit=crop',
      rating: 4.5,
      reviews: 156,
      category: 'Electronics',
      description: 'Portable speaker with excellent sound quality'
    },
    {
      id: '6',
      name: 'Smartphone Stand',
      price: 29.99,
      image: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=400&h=300&fit=crop',
      rating: 4.3,
      reviews: 234,
      category: 'Accessories',
      description: 'Adjustable stand for phones and tablets'
    }
  ];

  const categories = ['Electronics', 'Wearables', 'Photography', 'Gaming', 'Accessories'];

  const filteredProducts = useMemo(() => {
    let filtered = allProducts;

    if (selectedCategories.length > 0) {
      filtered = filtered.filter(product => selectedCategories.includes(product.category));
    }

    if (priceRange.min) {
      filtered = filtered.filter(product => product.price >= parseFloat(priceRange.min));
    }
    if (priceRange.max) {
      filtered = filtered.filter(product => product.price <= parseFloat(priceRange.max));
    }

    if (selectedRating !== 'all') {
      filtered = filtered.filter(product => product.rating >= parseFloat(selectedRating));
    }

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [selectedCategories, priceRange, selectedRating, sortBy]);

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories(prev => [...prev, category]);
    } else {
      setSelectedCategories(prev => prev.filter(c => c !== category));
    }
  };

  const handleAddToCart = (product: any) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image
    });
    toast({
      title: "Added to cart!",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const ProductCard = ({ product, isListView = false }: { product: any; isListView?: boolean }) => (
    <Card className={`bg-white border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 rounded-2xl overflow-hidden ${isListView ? 'flex' : ''}`}>
      <CardHeader className={`p-0 ${isListView ? 'w-48 flex-shrink-0' : ''}`}>
        <div className="relative">
          <img 
            src={product.image} 
            alt={product.name}
            className={`w-full object-cover ${isListView ? 'h-32 rounded-l-2xl rounded-tr-none' : 'h-48 rounded-t-2xl'}`}
          />
          {product.isOnSale && (
            <Badge className="absolute top-3 left-3 bg-red-500 text-white hover:bg-red-600 rounded-full">
              Sale
            </Badge>
          )}
          <Button
            size="sm"
            variant="ghost"
            className="absolute top-3 right-3 bg-white/90 hover:bg-white text-gray-700 rounded-full p-2 shadow-sm"
          >
            <Heart className="h-4 w-4" />
          </Button>
          <Badge className="absolute bottom-3 left-3 bg-blue-500 text-white hover:bg-blue-600 rounded-full">
            {product.category}
          </Badge>
        </div>
      </CardHeader>
      <div className={isListView ? 'flex-1 flex flex-col' : ''}>
        <CardContent className="p-6 flex-1">
          <CardTitle className="text-gray-900 text-lg mb-2 line-clamp-2 font-semibold">
            {product.name}
          </CardTitle>
          {isListView && (
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
              {product.description}
            </p>
          )}
          <div className="flex items-center mb-3">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
              ))}
              <span className="text-gray-600 text-sm ml-2">{product.rating}</span>
              <span className="text-gray-400 text-sm ml-1">({product.reviews})</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-gray-900">${product.price}</span>
            {product.originalPrice && (
              <span className="text-lg text-gray-400 line-through">${product.originalPrice}</span>
            )}
          </div>
        </CardContent>
        <CardFooter className="p-6 pt-0 space-y-3">
          <Button 
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105"
            onClick={() => handleAddToCart(product)}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
          <Link to={`/product/${product.id}`} className="w-full">
            <Button variant="outline" className="w-full border-gray-200 text-gray-700 hover:bg-gray-50 rounded-xl">
              View Details
            </Button>
          </Link>
        </CardFooter>
      </div>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-80 space-y-6">
            <Card className="bg-white border border-gray-100 rounded-2xl">
              <CardHeader className="pb-4">
                <CardTitle className="text-gray-900 flex items-center text-xl">
                  <Filter className="h-5 w-5 mr-2 text-blue-500" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Categories */}
                <div>
                  <h3 className="text-gray-900 font-semibold mb-4">Categories</h3>
                  <div className="space-y-3">
                    {categories.map(category => (
                      <div key={category} className="flex items-center space-x-3">
                        <Checkbox
                          id={category}
                          checked={selectedCategories.includes(category)}
                          onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)}
                          className="border-gray-300"
                        />
                        <label htmlFor={category} className="text-gray-700 text-sm cursor-pointer">
                          {category}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <h3 className="text-gray-900 font-semibold mb-4">Price Range</h3>
                  <div className="space-y-3">
                    <Input
                      type="number"
                      placeholder="Min price"
                      value={priceRange.min}
                      onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                      className="border-gray-200 rounded-xl"
                    />
                    <Input
                      type="number"
                      placeholder="Max price"
                      value={priceRange.max}
                      onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                      className="border-gray-200 rounded-xl"
                    />
                  </div>
                </div>

                {/* Rating Filter */}
                <div>
                  <h3 className="text-gray-900 font-semibold mb-4">Minimum Rating</h3>
                  <Select value={selectedRating} onValueChange={setSelectedRating}>
                    <SelectTrigger className="border-gray-200 rounded-xl">
                      <SelectValue placeholder="Any rating" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-gray-200 rounded-xl">
                      <SelectItem value="all">Any rating</SelectItem>
                      <SelectItem value="4">4+ stars</SelectItem>
                      <SelectItem value="4.5">4.5+ stars</SelectItem>
                      <SelectItem value="4.8">4.8+ stars</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Products */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  All Products
                </h1>
                <p className="text-gray-600">
                  Showing {filteredProducts.length} products
                </p>
              </div>
              
              <div className="flex items-center gap-4">
                {/* View Mode */}
                <div className="flex border border-gray-200 rounded-xl overflow-hidden">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className="rounded-none bg-blue-500 hover:bg-blue-600"
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className="rounded-none bg-blue-500 hover:bg-blue-600"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>

                {/* Sort */}
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48 border-gray-200 rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-gray-200 rounded-xl">
                    <SelectItem value="name">Sort by Name</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Products Grid/List */}
            <div className={`${
              viewMode === 'grid' 
                ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6' 
                : 'space-y-6'
            }`}>
              {filteredProducts.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  isListView={viewMode === 'list'} 
                />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-16">
                <div className="bg-white rounded-2xl p-12 shadow-sm border border-gray-100">
                  <p className="text-gray-500 text-lg mb-6">No products found matching your criteria.</p>
                  <Button 
                    variant="outline" 
                    className="border-gray-200 text-gray-700 hover:bg-gray-50 rounded-xl"
                    onClick={() => {
                      setSelectedCategories([]);
                      setPriceRange({ min: '', max: '' });
                      setSelectedRating('all');
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
