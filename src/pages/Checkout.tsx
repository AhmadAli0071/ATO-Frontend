
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import { CreditCard, Truck, Shield, CheckCircle } from 'lucide-react';

const Checkout = () => {
  const { items, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    state: 'none',
    zipCode: '',
    country: 'US'
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: ''
  });

  const [isProcessing, setIsProcessing] = useState(false);

  const handleShippingChange = (field: string, value: string) => {
    setShippingInfo(prev => ({ ...prev, [field]: value }));
  };

  const handlePaymentChange = (field: string, value: string) => {
    setPaymentInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    await new Promise(resolve => setTimeout(resolve, 2000));

    toast({
      title: "Order placed successfully!",
      description: "Thank you for your purchase. You will receive a confirmation email shortly.",
    });

    clearCart();
    navigate('/dashboard');
    setIsProcessing(false);
  };

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  const tax = totalPrice * 0.08;
  const shipping = totalPrice > 100 ? 0 : 9.99;
  const total = totalPrice + tax + shipping;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Checkout</h1>
          <p className="text-gray-600">Complete your purchase securely</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Shipping & Payment Forms */}
            <div className="lg:col-span-2 space-y-8">
              {/* Shipping Information */}
              <Card className="bg-white border border-gray-100 rounded-2xl shadow-lg">
                <CardHeader>
                  <CardTitle className="text-gray-900 text-2xl flex items-center">
                    <Truck className="h-6 w-6 mr-2 text-blue-500" />
                    Shipping Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-gray-900 font-medium">First Name</Label>
                      <Input
                        id="firstName"
                        value={shippingInfo.firstName}
                        onChange={(e) => handleShippingChange('firstName', e.target.value)}
                        required
                        className="border-gray-200 rounded-xl h-12 focus:border-blue-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-gray-900 font-medium">Last Name</Label>
                      <Input
                        id="lastName"
                        value={shippingInfo.lastName}
                        onChange={(e) => handleShippingChange('lastName', e.target.value)}
                        required
                        className="border-gray-200 rounded-xl h-12 focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-gray-900 font-medium">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={shippingInfo.email}
                        onChange={(e) => handleShippingChange('email', e.target.value)}
                        required
                        className="border-gray-200 rounded-xl h-12 focus:border-blue-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-gray-900 font-medium">Phone</Label>
                      <Input
                        id="phone"
                        value={shippingInfo.phone}
                        onChange={(e) => handleShippingChange('phone', e.target.value)}
                        required
                        className="border-gray-200 rounded-xl h-12 focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address" className="text-gray-900 font-medium">Street Address</Label>
                    <Input
                      id="address"
                      value={shippingInfo.address}
                      onChange={(e) => handleShippingChange('address', e.target.value)}
                      required
                      className="border-gray-200 rounded-xl h-12 focus:border-blue-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="city" className="text-gray-900 font-medium">City</Label>
                      <Input
                        id="city"
                        value={shippingInfo.city}
                        onChange={(e) => handleShippingChange('city', e.target.value)}
                        required
                        className="border-gray-200 rounded-xl h-12 focus:border-blue-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state" className="text-gray-900 font-medium">State</Label>
                      <Select value={shippingInfo.state} onValueChange={(value) => handleShippingChange('state', value)}>
                        <SelectTrigger className="border-gray-200 rounded-xl h-12 focus:border-blue-500">
                          <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border-gray-200 rounded-xl">
                          <SelectItem value="none">Select state</SelectItem>
                          <SelectItem value="CA">California</SelectItem>
                          <SelectItem value="NY">New York</SelectItem>
                          <SelectItem value="TX">Texas</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zipCode" className="text-gray-900 font-medium">ZIP Code</Label>
                      <Input
                        id="zipCode"
                        value={shippingInfo.zipCode}
                        onChange={(e) => handleShippingChange('zipCode', e.target.value)}
                        required
                        className="border-gray-200 rounded-xl h-12 focus:border-blue-500"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Information */}
              <Card className="bg-white border border-gray-100 rounded-2xl shadow-lg">
                <CardHeader>
                  <CardTitle className="text-gray-900 text-2xl flex items-center">
                    <CreditCard className="h-6 w-6 mr-2 text-blue-500" />
                    Payment Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="nameOnCard" className="text-gray-900 font-medium">Name on Card</Label>
                    <Input
                      id="nameOnCard"
                      value={paymentInfo.nameOnCard}
                      onChange={(e) => handlePaymentChange('nameOnCard', e.target.value)}
                      required
                      className="border-gray-200 rounded-xl h-12 focus:border-blue-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cardNumber" className="text-gray-900 font-medium">Card Number</Label>
                    <Input
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={paymentInfo.cardNumber}
                      onChange={(e) => handlePaymentChange('cardNumber', e.target.value)}
                      required
                      className="border-gray-200 rounded-xl h-12 focus:border-blue-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="expiryDate" className="text-gray-900 font-medium">Expiry Date</Label>
                      <Input
                        id="expiryDate"
                        placeholder="MM/YY"
                        value={paymentInfo.expiryDate}
                        onChange={(e) => handlePaymentChange('expiryDate', e.target.value)}
                        required
                        className="border-gray-200 rounded-xl h-12 focus:border-blue-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvv" className="text-gray-900 font-medium">CVV</Label>
                      <Input
                        id="cvv"
                        placeholder="123"
                        value={paymentInfo.cvv}
                        onChange={(e) => handlePaymentChange('cvv', e.target.value)}
                        required
                        className="border-gray-200 rounded-xl h-12 focus:border-blue-500"
                      />
                    </div>
                  </div>

                  {/* Security Features */}
                  <div className="bg-blue-50 rounded-xl p-4">
                    <div className="flex items-center space-x-3">
                      <Shield className="h-6 w-6 text-blue-600" />
                      <div>
                        <p className="text-blue-800 font-medium">Secure Payment</p>
                        <p className="text-blue-600 text-sm">Your payment information is encrypted and secure</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="bg-white border border-gray-100 rounded-2xl shadow-lg sticky top-8">
                <CardHeader>
                  <CardTitle className="text-gray-900 text-2xl">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Order Items */}
                  <div className="space-y-4">
                    {items.map((item) => (
                      <div key={item.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h4 className="text-gray-900 font-medium text-sm">{item.name}</h4>
                          <p className="text-gray-600 text-sm">Qty: {item.quantity}</p>
                          <p className="text-gray-900 font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <hr className="border-gray-200" />

                  {/* Price Breakdown */}
                  <div className="space-y-3">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal</span>
                      <span className="font-semibold">${totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Shipping</span>
                      <span className="font-semibold">{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Tax</span>
                      <span className="font-semibold">${tax.toFixed(2)}</span>
                    </div>
                  </div>

                  <hr className="border-gray-200" />

                  <div className="flex justify-between text-xl font-bold text-gray-900">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white h-12 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Processing...
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Place Order - ${total.toFixed(2)}
                      </div>
                    )}
                  </Button>

                  <div className="text-center text-sm text-gray-600">
                    By placing your order, you agree to our Terms of Service and Privacy Policy.
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
