
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { Star, Heart, ArrowLeft, Trash2, ShoppingCart } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Wishlist = () => {
  const { addToCart } = useCart();

  const wishlistItems = [
    {
      id: '1',
      name: 'Premium Wireless Headphones',
      price: 299.99,
      originalPrice: 399.99,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop',
      rating: 4.8,
      reviews: 124,
      category: 'Electronics',
      inStock: true,
      isOnSale: true
    },
    {
      id: '3',
      name: 'Professional Camera',
      price: 899.99,
      image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=300&fit=crop',
      rating: 4.9,
      reviews: 67,
      category: 'Photography',
      inStock: true
    },
    {
      id: '5',
      name: 'Wireless Bluetooth Speaker',
      price: 79.99,
      image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=300&fit=crop',
      rating: 4.5,
      reviews: 156,
      category: 'Electronics',
      inStock: false
    }
  ];

  const removeFromWishlist = (id: string) => {
    toast({
      title: "Removed from wishlist",
      description: "Item has been removed from your wishlist.",
    });
  };

  const moveToCart = (item: any) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image
    });
    removeFromWishlist(item.id);
    toast({
      title: "Added to cart!",
      description: `${item.name} has been moved to your cart.`,
    });
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center py-16">
            <div className="bg-white rounded-3xl p-16 shadow-lg border border-gray-100 max-w-md mx-auto">
              <Heart className="h-16 w-16 text-gray-300 mx-auto mb-6" />
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Wishlist is Empty</h1>
              <p className="text-gray-600 mb-8 text-lg">Save items you love for later!</p>
              <Link to="/products">
                <Button className="bg-blue-500 hover:bg-blue-600 text-white rounded-xl px-8 py-3 transition-all duration-300 hover:scale-105">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Wishlist</h1>
            <p className="text-gray-600">{wishlistItems.length} item{wishlistItems.length !== 1 ? 's' : ''} saved</p>
          </div>
          <Link to="/products">
            <Button variant="outline" className="border-gray-200 text-gray-700 hover:bg-gray-50 rounded-xl">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Continue Shopping
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistItems.map((item) => (
            <Card key={item.id} className="bg-white border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 rounded-2xl overflow-hidden">
              <CardHeader className="p-0">
                <div className="relative">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-48 object-cover"
                  />
                  {item.isOnSale && (
                    <Badge className="absolute top-3 left-3 bg-red-500 text-white hover:bg-red-600 rounded-full">
                      Sale
                    </Badge>
                  )}
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => removeFromWishlist(item.id)}
                    className="absolute top-3 right-3 bg-white/90 hover:bg-white text-red-500 hover:text-red-600 rounded-full p-2 shadow-sm"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  <Badge className="absolute bottom-3 left-3 bg-blue-500 text-white hover:bg-blue-600 rounded-full">
                    {item.category}
                  </Badge>
                  {!item.inStock && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="text-white font-semibold bg-black/70 px-4 py-2 rounded-xl">Out of Stock</span>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <CardTitle className="text-gray-900 text-lg mb-3 line-clamp-2 font-semibold">
                  {item.name}
                </CardTitle>
                <div className="flex items-center mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`h-4 w-4 ${i < Math.floor(item.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                    ))}
                    <span className="text-gray-600 text-sm ml-2">{item.rating}</span>
                    <span className="text-gray-400 text-sm ml-1">({item.reviews})</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-2xl font-bold text-gray-900">${item.price}</span>
                  {item.originalPrice && (
                    <span className="text-lg text-gray-400 line-through">${item.originalPrice}</span>
                  )}
                </div>
              </CardContent>
              <CardFooter className="p-6 pt-0 space-y-3">
                <Button 
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-all duration-300 hover:scale-105"
                  onClick={() => moveToCart(item)}
                  disabled={!item.inStock}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  {item.inStock ? 'Move to Cart' : 'Out of Stock'}
                </Button>
                <Link to={`/product/${item.id}`} className="w-full">
                  <Button variant="outline" className="w-full border-gray-200 text-gray-700 hover:bg-gray-50 rounded-xl">
                    View Details
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Recommendations */}
        <div className="mt-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">You might also like</h2>
            <div className="text-center">
              <Link to="/products">
                <Button className="bg-blue-500 hover:bg-blue-600 text-white rounded-xl px-8 py-3 transition-all duration-300 hover:scale-105">
                  Explore More Products
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
