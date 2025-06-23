
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { User, Package, MapPin, Settings } from 'lucide-react';

const UserDashboard = () => {
  const { user } = useAuth();
  const location = useLocation();

  const sidebarItems = [
    { name: 'Profile', href: '/dashboard', icon: User },
    { name: 'Orders', href: '/dashboard/orders', icon: Package },
    { name: 'Addresses', href: '/dashboard/addresses', icon: MapPin },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
  ];

  const isActive = (path: string) => {
    if (path === '/dashboard') {
      return location.pathname === '/dashboard';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-white mb-8">My Account</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Welcome, {user?.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <nav className="space-y-2">
                  {sidebarItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link key={item.name} to={item.href}>
                        <Button
                          variant={isActive(item.href) ? "default" : "ghost"}
                          className={`w-full justify-start ${
                            isActive(item.href) 
                              ? 'bg-blue-600 text-white' 
                              : 'text-gray-300 hover:text-white hover:bg-gray-700'
                          }`}
                        >
                          <Icon className="mr-2 h-4 w-4" />
                          {item.name}
                        </Button>
                      </Link>
                    );
                  })}
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Routes>
              <Route path="/" element={<ProfileContent />} />
              <Route path="/orders" element={<OrdersContent />} />
              <Route path="/addresses" element={<AddressesContent />} />
              <Route path="/settings" element={<SettingsContent />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProfileContent = () => {
  const { user } = useAuth();
  
  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white">Profile Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-gray-400 text-sm">Name</label>
          <p className="text-white">{user?.name}</p>
        </div>
        <div>
          <label className="text-gray-400 text-sm">Email</label>
          <p className="text-white">{user?.email}</p>
        </div>
        <div>
          <label className="text-gray-400 text-sm">Member Since</label>
          <p className="text-white">January 2024</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          Edit Profile
        </Button>
      </CardContent>
    </Card>
  );
};

const OrdersContent = () => {
  const orders = [
    {
      id: '#12345',
      date: '2024-01-15',
      status: 'Delivered',
      total: 299.99,
      items: ['Premium Wireless Headphones']
    },
    {
      id: '#12346',
      date: '2024-01-10',
      status: 'Shipping',
      total: 199.99,
      items: ['Smart Fitness Watch']
    }
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-white">Order History</h2>
      {orders.map((order) => (
        <Card key={order.id} className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-white font-semibold">Order {order.id}</h3>
                <p className="text-gray-400 text-sm">Placed on {order.date}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm ${
                order.status === 'Delivered' 
                  ? 'bg-green-900 text-green-300' 
                  : 'bg-blue-900 text-blue-300'
              }`}>
                {order.status}
              </span>
            </div>
            <div className="space-y-2">
              {order.items.map((item, index) => (
                <p key={index} className="text-gray-300">{item}</p>
              ))}
            </div>
            <div className="flex justify-between items-center mt-4">
              <span className="text-white font-semibold">Total: ${order.total}</span>
              <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                View Details
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

const AddressesContent = () => {
  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white">Saved Addresses</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center py-8">
          <p className="text-gray-400 mb-4">No saved addresses yet</p>
          <Button className="bg-blue-600 hover:bg-blue-700">
            Add New Address
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const SettingsContent = () => {
  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white">Account Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-white font-semibold">Notifications</h3>
          <div className="space-y-2">
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="rounded" defaultChecked />
              <span className="text-gray-300">Email notifications</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="rounded" />
              <span className="text-gray-300">SMS notifications</span>
            </label>
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="text-white font-semibold">Privacy</h3>
          <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
            Download My Data
          </Button>
        </div>
        <div className="space-y-2">
          <h3 className="text-white font-semibold">Danger Zone</h3>
          <Button variant="destructive">
            Delete Account
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserDashboard;
