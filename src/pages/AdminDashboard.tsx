
import { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { Package, Users, ShoppingCart, BarChart3, Plus, Edit, Trash2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const AdminDashboard = () => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user?.isAdmin) {
    return (
      <div className="min-h-screen bg-gray-900 py-8">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Access Denied</h1>
          <p className="text-gray-400">You don't have permission to view this page.</p>
        </div>
      </div>
    );
  }

  const sidebarItems = [
    { name: 'Overview', href: '/admin', icon: BarChart3 },
    { name: 'Products', href: '/admin/products', icon: Package },
    { name: 'Orders', href: '/admin/orders', icon: ShoppingCart },
    { name: 'Users', href: '/admin/users', icon: Users },
  ];

  const isActive = (path: string) => {
    if (path === '/admin') {
      return location.pathname === '/admin';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-white mb-8">Admin Dashboard</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Admin Panel</CardTitle>
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
              <Route path="/" element={<OverviewContent />} />
              <Route path="/products" element={<ProductsContent />} />
              <Route path="/orders" element={<OrdersContent />} />
              <Route path="/users" element={<UsersContent />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

const OverviewContent = () => {
  const stats = [
    { title: 'Total Products', value: '156', icon: Package },
    { title: 'Total Orders', value: '1,234', icon: ShoppingCart },
    { title: 'Total Users', value: '567', icon: Users },
    { title: 'Revenue', value: '$45,678', icon: BarChart3 },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">{stat.title}</p>
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                  </div>
                  <Icon className="h-8 w-8 text-blue-400" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-gray-700">
              <span className="text-gray-300">New order #12347</span>
              <span className="text-gray-500 text-sm">2 minutes ago</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-700">
              <span className="text-gray-300">User registration: john@example.com</span>
              <span className="text-gray-500 text-sm">15 minutes ago</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-300">Product updated: Wireless Headphones</span>
              <span className="text-gray-500 text-sm">1 hour ago</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const ProductsContent = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [products] = useState([
    { id: 1, name: 'Premium Wireless Headphones', price: 299.99, stock: 15, status: 'Active' },
    { id: 2, name: 'Smart Fitness Watch', price: 199.99, stock: 8, status: 'Active' },
    { id: 3, name: 'Professional Camera', price: 899.99, stock: 3, status: 'Low Stock' },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Products</h2>
        <Button 
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </div>

      {showAddForm && (
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Add New Product</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="productName" className="text-white">Product Name</Label>
                  <Input id="productName" className="bg-gray-700 border-gray-600 text-white" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price" className="text-white">Price</Label>
                  <Input id="price" type="number" className="bg-gray-700 border-gray-600 text-white" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description" className="text-white">Description</Label>
                <textarea
                  id="description"
                  rows={3}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                />
              </div>
              <div className="flex space-x-2">
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                  Add Product
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setShowAddForm(false)}
                  className="border-gray-600 text-gray-300"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-white">Product</th>
                  <th className="px-6 py-3 text-left text-white">Price</th>
                  <th className="px-6 py-3 text-left text-white">Stock</th>
                  <th className="px-6 py-3 text-left text-white">Status</th>
                  <th className="px-6 py-3 text-left text-white">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-b border-gray-700">
                    <td className="px-6 py-4 text-white">{product.name}</td>
                    <td className="px-6 py-4 text-white">${product.price}</td>
                    <td className="px-6 py-4 text-white">{product.stock}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        product.status === 'Active' 
                          ? 'bg-green-900 text-green-300' 
                          : 'bg-yellow-900 text-yellow-300'
                      }`}>
                        {product.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <Button size="sm" variant="ghost" className="text-blue-400 hover:text-blue-300">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="text-red-400 hover:text-red-300">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const OrdersContent = () => {
  const orders = [
    { id: '#12345', customer: 'John Doe', total: 299.99, status: 'Processing', date: '2024-01-15' },
    { id: '#12346', customer: 'Jane Smith', total: 199.99, status: 'Shipped', date: '2024-01-14' },
    { id: '#12347', customer: 'Bob Johnson', total: 899.99, status: 'Delivered', date: '2024-01-13' },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Orders</h2>
      
      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-white">Order ID</th>
                  <th className="px-6 py-3 text-left text-white">Customer</th>
                  <th className="px-6 py-3 text-left text-white">Total</th>
                  <th className="px-6 py-3 text-left text-white">Status</th>
                  <th className="px-6 py-3 text-left text-white">Date</th>
                  <th className="px-6 py-3 text-left text-white">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-b border-gray-700">
                    <td className="px-6 py-4 text-white">{order.id}</td>
                    <td className="px-6 py-4 text-white">{order.customer}</td>
                    <td className="px-6 py-4 text-white">${order.total}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        order.status === 'Delivered' 
                          ? 'bg-green-900 text-green-300'
                          : order.status === 'Shipped'
                          ? 'bg-blue-900 text-blue-300'
                          : 'bg-yellow-900 text-yellow-300'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-white">{order.date}</td>
                    <td className="px-6 py-4">
                      <Button size="sm" variant="outline" className="border-gray-600 text-gray-300">
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const UsersContent = () => {
  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Customer', joined: '2024-01-10' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Customer', joined: '2024-01-12' },
    { id: 3, name: 'Admin User', email: 'admin@atostore.com', role: 'Admin', joined: '2024-01-01' },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Users</h2>
      
      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-white">Name</th>
                  <th className="px-6 py-3 text-left text-white">Email</th>
                  <th className="px-6 py-3 text-left text-white">Role</th>
                  <th className="px-6 py-3 text-left text-white">Joined</th>
                  <th className="px-6 py-3 text-left text-white">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b border-gray-700">
                    <td className="px-6 py-4 text-white">{user.name}</td>
                    <td className="px-6 py-4 text-white">{user.email}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        user.role === 'Admin' 
                          ? 'bg-purple-900 text-purple-300' 
                          : 'bg-gray-700 text-gray-300'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-white">{user.joined}</td>
                    <td className="px-6 py-4">
                      <Button size="sm" variant="outline" className="border-gray-600 text-gray-300">
                        Edit
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
