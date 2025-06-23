
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { Star, Heart, ArrowLeft, Minus, Plus, ShoppingCart, Truck, Shield, RefreshCw, MessageCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const product = {
    id: id || '1',
    name: 'Premium Wireless Headphones',
    price: 299.99,
    originalPrice: 399.99,
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&h=600&fit=crop'
    ],
    rating: 4.8,
    reviews: 124,
    category: 'Electronics',
    description: 'Experience premium sound quality with our flagship wireless headphones. Featuring advanced noise cancellation technology, 30-hour battery life, and crystal-clear audio for the ultimate listening experience. These headphones are designed for music lovers who demand the best in audio quality and comfort.',
    features: [
      'Active Noise Cancellation',
      '30-hour battery life',
      'Premium leather headband',
      'Bluetooth 5.0 connectivity',
      'Quick charge: 15 min = 3 hours',
      'Voice assistant compatible'
    ],
    specifications: {
      'Brand': 'ATO Audio',
      'Model': 'ATO-WH-001',
      'Color': 'Midnight Black',
      'Weight': '250g',
      'Frequency Response': '20Hz - 20kHz',
      'Impedance': '32 ohms'
    },
    inStock: true,
    stockCount: 15,
    isOnSale: true
  };

  const reviews = [
    {
      id: 1,
      user: 'Sarah Johnson',
      rating: 5,
      comment: 'Amazing sound quality and comfort. Best headphones I\'ve ever owned! The noise cancellation is incredible.',
      date: '2024-01-15',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b27c?w=60&h=60&fit=crop&crop=face'
    },
    {
      id: 2,
      user: 'Mike Chen',
      rating: 4,
      comment: 'Great noise cancellation, though the bass could be a bit stronger. Overall very satisfied with the purchase.',
      date: '2024-01-10',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face'
    },
    {
      id: 3,
      user: 'Emily Davis',
      rating: 5,
      comment: 'Perfect for long flights. Battery life is exactly as advertised. Comfort is outstanding even after hours of use.',
      date: '2024-01-08',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face'
    }
  ];

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0]
      });
    }
    toast({
      title: "Added to cart!",
      description: `${quantity} ${product.name} added to your cart.`,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link to="/products" className="text-blue-500 hover:text-blue-600 flex items-center transition-colors duration-200">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Products
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-6">
            <div className="aspect-square bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
              <img 
                src={product.images[selectedImage]} 
                alt={product.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
              {product.isOnSale && (
                <Badge className="absolute top-4 left-4 bg-red-500 text-white hover:bg-red-600 rounded-full">
                  Sale -25%
                </Badge>
              )}
            </div>
            <div className="grid grid-cols-3 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square bg-white rounded-xl overflow-hidden border-2 transition-all duration-200 hover:shadow-lg ${
                    selectedImage === index ? 'border-blue-500 shadow-lg' : 'border-gray-200'
                  }`}
                >
                  <img 
                    src={image} 
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            <div>
              <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-200 rounded-full">
                {product.category}
              </Badge>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
              
              <div className="flex items-center mb-6">
                <div className="flex items-center mr-6">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                    />
                  ))}
                  <span className="text-gray-700 ml-2 font-semibold">{product.rating}</span>
                </div>
                <span className="text-gray-500">({product.reviews} reviews)</span>
              </div>

              <div className="flex items-center space-x-4 mb-6">
                <span className="text-4xl font-bold text-gray-900">${product.price}</span>
                {product.originalPrice && (
                  <span className="text-2xl text-gray-400 line-through">${product.originalPrice}</span>
                )}
                {product.isOnSale && (
                  <Badge className="bg-green-100 text-green-800 rounded-full">
                    Save ${(product.originalPrice! - product.price).toFixed(2)}
                  </Badge>
                )}
              </div>
              
              <p className="text-gray-600 leading-relaxed text-lg">{product.description}</p>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="space-y-6">
              <div className="flex items-center space-x-6">
                <span className="text-gray-900 font-semibold text-lg">Quantity:</span>
                <div className="flex items-center space-x-3">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="h-12 w-12 p-0 border-gray-200 rounded-xl hover:bg-gray-50"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="text-gray-900 px-6 py-3 bg-gray-50 rounded-xl font-semibold text-lg min-w-[80px] text-center">
                    {quantity}
                  </span>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setQuantity(quantity + 1)}
                    className="h-12 w-12 p-0 border-gray-200 rounded-xl hover:bg-gray-50"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <span className="text-gray-500">({product.stockCount} in stock)</span>
              </div>

              <div className="flex space-x-4">
                <Button 
                  onClick={handleAddToCart}
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-4 text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105"
                  disabled={!product.inStock}
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart
                </Button>
                <Button 
                  variant="outline" 
                  className="border-gray-200 text-gray-700 hover:bg-gray-50 py-4 px-6 rounded-xl"
                >
                  <Heart className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Features */}
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Key Features</h3>
              <ul className="space-y-3">
                {product.features.map((feature, index) => (
                  <li key={index} className="text-gray-700 flex items-center text-lg">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-4"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200">
              <div className="text-center">
                <Truck className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                <p className="text-sm font-semibold text-gray-900">Free Shipping</p>
                <p className="text-xs text-gray-600">On orders over $100</p>
              </div>
              <div className="text-center">
                <Shield className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                <p className="text-sm font-semibold text-gray-900">2 Year Warranty</p>
                <p className="text-xs text-gray-600">Full coverage</p>
              </div>
              <div className="text-center">
                <RefreshCw className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                <p className="text-sm font-semibold text-gray-900">30-Day Returns</p>
                <p className="text-xs text-gray-600">No questions asked</p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Specifications */}
          <Card className="bg-white border border-gray-100 rounded-2xl">
            <CardHeader>
              <CardTitle className="text-gray-900 text-2xl">Specifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-3 border-b border-gray-100 last:border-b-0">
                    <span className="text-gray-600 font-medium">{key}</span>
                    <span className="text-gray-900 font-semibold">{value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Reviews */}
          <Card className="bg-white border border-gray-100 rounded-2xl">
            <CardHeader>
              <CardTitle className="text-gray-900 text-2xl flex items-center">
                <MessageCircle className="h-6 w-6 mr-2 text-blue-500" />
                Customer Reviews
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {reviews.map((review) => (
                  <div key={review.id} className="pb-6 border-b border-gray-100 last:border-b-0">
                    <div className="flex items-start space-x-4">
                      <img
                        src={review.avatar}
                        alt={review.user}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-gray-900 font-semibold">{review.user}</span>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`h-4 w-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-700 mb-2 leading-relaxed">{review.comment}</p>
                        <span className="text-gray-500 text-sm">{review.date}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
