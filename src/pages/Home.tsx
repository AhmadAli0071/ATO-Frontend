
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Heart, ShoppingCart, ArrowRight, Truck, Shield, RefreshCw } from 'lucide-react';

const Home = () => {
  const featuredProducts = [
    {
      id: '1',
      name: 'Premium Wireless Headphones',
      price: 299.99,
      originalPrice: 399.99,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop',
      rating: 4.8,
      reviews: 124,
      badge: 'Best Seller'
    },
    {
      id: '2',
      name: 'Smart Fitness Watch',
      price: 199.99,
      originalPrice: 249.99,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop',
      rating: 4.6,
      reviews: 89,
      badge: 'New'
    },
    {
      id: '3',
      name: 'Professional Camera',
      price: 899.99,
      image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=300&fit=crop',
      rating: 4.9,
      reviews: 67,
      badge: 'Popular'
    },
    {
      id: '4',
      name: 'Gaming Mechanical Keyboard',
      price: 159.99,
      originalPrice: 199.99,
      image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=300&fit=crop',
      rating: 4.7,
      reviews: 203,
      badge: 'Sale'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Verified Customer',
      comment: 'Amazing quality products and fast shipping. Highly recommended!',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b27c?w=60&h=60&fit=crop&crop=face'
    },
    {
      name: 'Mike Chen',
      role: 'Verified Customer',
      comment: 'Great customer service and excellent product variety.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face'
    },
    {
      name: 'Emily Davis',
      role: 'Verified Customer',
      comment: 'Best online shopping experience I\'ve had. Will definitely shop again!',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-yellow-50 to-orange-50 section-padding">
        <div className="container mx-auto container-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              <div className="space-y-4">
                <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
                  🎉 New Collection Available
                </Badge>
                <h1 className="text-5xl md:text-6xl font-bold text-gray-900 text-balance">
                  Discover Premium Products at 
                  <span className="text-yellow-500"> ATO Store</span>
                </h1>
                <p className="text-xl text-gray-600 text-balance max-w-lg">
                  Shop the latest trends with unbeatable quality and exceptional customer service. Your satisfaction is our priority.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/products">
                  <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold button-hover rounded-xl">
                    Shop Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button size="lg" variant="outline" className="border-2 border-gray-300 hover:border-yellow-500 hover:text-yellow-600 rounded-xl">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop" 
                alt="Hero Product"
                className="w-full h-96 object-cover rounded-3xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl">
                <div className="flex items-center space-x-3">
                  <div className="flex -space-x-2">
                    {[1,2,3].map((i) => (
                      <div key={i} className="w-8 h-8 rounded-full bg-yellow-500 border-2 border-white"></div>
                    ))}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">10,000+ Happy Customers</p>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                      <span className="ml-1 text-sm text-gray-600">4.9/5</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto container-padding">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-white rounded-2xl shadow-sm card-hover">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Free Shipping</h3>
              <p className="text-gray-600">Free delivery on orders over $100</p>
            </div>
            <div className="text-center p-8 bg-white rounded-2xl shadow-sm card-hover">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Payment</h3>
              <p className="text-gray-600">100% secure payment processing</p>
            </div>
            <div className="text-center p-8 bg-white rounded-2xl shadow-sm card-hover">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <RefreshCw className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Returns</h3>
              <p className="text-gray-600">30-day return policy</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section-padding">
        <div className="container mx-auto container-padding">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Products</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our handpicked selection of premium products
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="bg-white border-0 shadow-lg rounded-2xl overflow-hidden card-hover">
                <div className="relative">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  <Badge className="absolute top-3 left-3 bg-yellow-500 text-black">
                    {product.badge}
                  </Badge>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="absolute top-3 right-3 bg-white/80 hover:bg-white text-gray-700 rounded-full p-2"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <h3 className="font-semibold text-lg line-clamp-2">{product.name}</h3>
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                      ))}
                      <span className="text-sm text-gray-600 ml-2">({product.reviews})</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-gray-900">${product.price}</span>
                      {product.originalPrice && (
                        <span className="text-lg text-gray-500 line-through">${product.originalPrice}</span>
                      )}
                    </div>
                    <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-xl button-hover">
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/products">
              <Button size="lg" variant="outline" className="border-2 border-yellow-500 text-yellow-600 hover:bg-yellow-50 rounded-xl">
                View All Products
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Promotional Banner */}
      <section className="py-16 bg-gradient-to-r from-yellow-500 to-orange-500">
        <div className="container mx-auto container-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h2 className="text-4xl font-bold text-black mb-4">
                Limited Time Offer
              </h2>
              <p className="text-xl text-black/80 mb-8">
                Get up to 50% off on selected items. Don't miss out on this amazing deal!
              </p>
              <Link to="/products">
                <Button size="lg" className="bg-black text-white hover:bg-gray-800 rounded-xl button-hover">
                  Shop Sale Items
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
            <div className="text-center">
              <img 
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&h=300&fit=crop" 
                alt="Sale Banner"
                className="w-full max-w-md mx-auto rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="section-padding bg-gray-50">
        <div className="container mx-auto container-padding">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
            <p className="text-xl text-gray-600">Real reviews from real customers</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white border-0 shadow-lg rounded-2xl p-6 card-hover">
                <CardContent className="p-0">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                    "{testimonial.comment}"
                  </p>
                  <div className="flex items-center">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                      <p className="text-gray-600 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto container-padding">
          <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-0 rounded-3xl p-12 text-center">
            <CardContent className="p-0">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Stay Updated with ATO Store
              </h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Subscribe to our newsletter and be the first to know about new products, exclusive deals, and special offers.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
                <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 py-3 rounded-xl button-hover">
                  Subscribe
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Home;
