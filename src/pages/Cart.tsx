
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCart } from '@/contexts/CartContext';
import { Minus, Plus, Trash2, ArrowLeft, ShoppingBag, Heart } from 'lucide-react';

const Cart = () => {
  const { items, updateQuantity, removeFromCart, totalPrice, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center py-16">
            <div className="bg-white rounded-3xl p-16 shadow-sm border border-gray-100 max-w-md mx-auto">
              <ShoppingBag className="h-16 w-16 text-gray-300 mx-auto mb-6" />
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h1>
              <p className="text-gray-600 mb-8 text-lg">Start adding some amazing products to your cart!</p>
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
            <p className="text-gray-600">{items.length} item{items.length !== 1 ? 's' : ''} in your cart</p>
          </div>
          <Button
            variant="outline"
            onClick={clearCart}
            className="border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 rounded-xl"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Clear Cart
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <Card key={item.id} className="bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row gap-6">
                    <div className="relative">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full sm:w-32 h-32 object-cover rounded-xl"
                      />
                      <Button
                        size="sm"
                        variant="ghost"
                        className="absolute top-2 right-2 bg-white/90 hover:bg-white text-gray-700 rounded-full p-1.5 shadow-sm"
                      >
                        <Heart className="h-3 w-3" />
                      </Button>
                    </div>
                    
                    <div className="flex-1 space-y-4">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-1">{item.name}</h3>
                        <p className="text-2xl font-bold text-blue-600">${item.price}</p>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="h-10 w-10 p-0 border-gray-200 rounded-xl hover:bg-gray-50"
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="text-gray-900 px-4 py-2 bg-gray-50 rounded-xl font-semibold min-w-[60px] text-center">
                            {item.quantity}
                          </span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="h-10 w-10 p-0 border-gray-200 rounded-xl hover:bg-gray-50"
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-600 hover:bg-red-50 rounded-xl"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Remove
                        </Button>
                      </div>
                      
                      <div className="pt-2 border-t border-gray-100">
                        <p className="text-gray-600 text-lg">
                          Subtotal: <span className="font-semibold text-gray-900">${(item.price * item.quantity).toFixed(2)}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="bg-white border border-gray-100 rounded-2xl sticky top-8">
              <CardHeader className="pb-4">
                <CardTitle className="text-gray-900 text-2xl">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span className="font-semibold">${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="font-semibold text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax</span>
                    <span className="font-semibold">${(totalPrice * 0.08).toFixed(2)}</span>
                  </div>
                </div>
                
                <hr className="border-gray-200" />
                
                <div className="flex justify-between text-xl font-bold text-gray-900">
                  <span>Total</span>
                  <span>${(totalPrice * 1.08).toFixed(2)}</span>
                </div>
                
                <div className="space-y-3 pt-4">
                  <Link to="/checkout" className="w-full">
                    <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-xl py-3 text-lg font-semibold transition-all duration-300 hover:scale-105">
                      Proceed to Checkout
                    </Button>
                  </Link>
                  <Link to="/products" className="w-full">
                    <Button variant="outline" className="w-full border-gray-200 text-gray-700 hover:bg-gray-50 rounded-xl py-3">
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Continue Shopping
                    </Button>
                  </Link>
                </div>
                
                <div className="bg-blue-50 rounded-xl p-4 mt-6">
                  <p className="text-blue-800 text-sm font-medium">
                    🎉 Free shipping on orders over $100!
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
