
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { Mail, Phone, MapPin, Clock, Send, MessageCircle } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message sent!",
      description: "Thank you for contacting us. We'll get back to you soon.",
    });
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="w-16 h-16 bg-blue-500 rounded-2xl mx-auto mb-6 flex items-center justify-center">
              <MessageCircle className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
            <p className="text-gray-600 text-xl max-w-2xl mx-auto">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="bg-white border border-gray-100 rounded-2xl shadow-lg">
                <CardHeader>
                  <CardTitle className="text-gray-900 text-2xl flex items-center">
                    <Send className="h-6 w-6 mr-2 text-blue-500" />
                    Send us a message
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-gray-900 font-medium">Full Name</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => handleChange('name', e.target.value)}
                          required
                          className="border-gray-200 rounded-xl h-12 focus:border-blue-500"
                          placeholder="Your full name"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-gray-900 font-medium">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleChange('email', e.target.value)}
                          required
                          className="border-gray-200 rounded-xl h-12 focus:border-blue-500"
                          placeholder="your.email@example.com"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject" className="text-gray-900 font-medium">Subject</Label>
                      <Input
                        id="subject"
                        value={formData.subject}
                        onChange={(e) => handleChange('subject', e.target.value)}
                        required
                        className="border-gray-200 rounded-xl h-12 focus:border-blue-500"
                        placeholder="What is this about?"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-gray-900 font-medium">Message</Label>
                      <textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => handleChange('message', e.target.value)}
                        required
                        rows={6}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                        placeholder="Tell us more about your inquiry..."
                      />
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full bg-blue-500 hover:bg-blue-600 text-white h-12 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
                    >
                      <Send className="h-4 w-4 mr-2" />
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              <Card className="bg-white border border-gray-100 rounded-2xl shadow-lg">
                <CardHeader>
                  <CardTitle className="text-gray-900 text-xl">Get in Touch</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Mail className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-gray-900 font-semibold mb-1">Email</h3>
                      <p className="text-gray-600">support@atostore.com</p>
                      <p className="text-gray-600">sales@atostore.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Phone className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-gray-900 font-semibold mb-1">Phone</h3>
                      <p className="text-gray-600">+1 (555) 123-4567</p>
                      <p className="text-gray-600">+1 (555) 987-6543</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-gray-900 font-semibold mb-1">Address</h3>
                      <p className="text-gray-600">
                        123 Commerce Street<br />
                        Suite 100<br />
                        San Francisco, CA 94103
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Clock className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-gray-900 font-semibold mb-1">Business Hours</h3>
                      <p className="text-gray-600">
                        Monday - Friday: 9:00 AM - 6:00 PM PST<br />
                        Saturday: 10:00 AM - 4:00 PM PST<br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border border-gray-100 rounded-2xl shadow-lg">
                <CardHeader>
                  <CardTitle className="text-gray-900 text-xl">Quick Help</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="text-gray-900 font-semibold mb-2">How long does shipping take?</h4>
                    <p className="text-gray-600 text-sm">Standard shipping takes 3-5 business days. Express shipping is available for 1-2 business days.</p>
                  </div>
                  <div>
                    <h4 className="text-gray-900 font-semibold mb-2">What is your return policy?</h4>
                    <p className="text-gray-600 text-sm">We offer a 30-day return policy for all unused items in their original packaging.</p>
                  </div>
                  <div>
                    <h4 className="text-gray-900 font-semibold mb-2">Do you offer international shipping?</h4>
                    <p className="text-gray-600 text-sm">Yes, we ship worldwide. International shipping costs and delivery times vary by location.</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Map Section */}
          <div className="mt-16">
            <Card className="bg-white border border-gray-100 rounded-2xl shadow-lg overflow-hidden">
              <div className="h-96 bg-gray-100 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Interactive map would be displayed here</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
