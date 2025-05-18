import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card from '../components/ui/Card';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast.success('Your message has been sent successfully!');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Contact Us</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have questions about admissions? Need help with your application? Our team is here to assist you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <Card className="p-6 text-center hover:shadow-lg transition-all duration-300">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Phone className="h-6 w-6 text-blue-800" />
              </div>
            </div>
            <h3 className="text-xl font-medium text-gray-800 mb-2">Call Us</h3>
            <p className="text-gray-600 mb-4">Our admission helpline is available Monday to Saturday, 9 AM to 5 PM.</p>
            <a href="tel:+911234567890" className="text-blue-800 font-medium">+91 123-456-7890</a>
          </Card>

          <Card className="p-6 text-center hover:shadow-lg transition-all duration-300">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Mail className="h-6 w-6 text-blue-800" />
              </div>
            </div>
            <h3 className="text-xl font-medium text-gray-800 mb-2">Email Us</h3>
            <p className="text-gray-600 mb-4">Send us an email and we'll get back to you within 24 hours.</p>
            <a href="mailto:admissions@collegeportal.edu" className="text-blue-800 font-medium">admissions@collegeportal.edu</a>
          </Card>

          <Card className="p-6 text-center hover:shadow-lg transition-all duration-300">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <MapPin className="h-6 w-6 text-blue-800" />
              </div>
            </div>
            <h3 className="text-xl font-medium text-gray-800 mb-2">Visit Us</h3>
            <p className="text-gray-600 mb-4">Come visit our campus and meet with our admissions counselors.</p>
            <p className="text-gray-800">123 University Road, Knowledge City, State - 100001</p>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <Card className="p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">
                    What are the admission requirements?
                  </h3>
                  <p className="text-gray-600">
                    Admission requirements vary by program. Generally, we require a minimum of 50-60% marks in qualifying examinations. Please check the specific course page for detailed eligibility criteria.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">
                    When is the application deadline?
                  </h3>
                  <p className="text-gray-600">
                    The application deadline for the academic year 2025-26 is June 15, 2025. However, we recommend applying early as seats fill up quickly.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">
                    How can I track my application status?
                  </h3>
                  <p className="text-gray-600">
                    After submitting your application, you can check your admission status using your application ID and registered email on our Status page.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">
                    Are scholarships available?
                  </h3>
                  <p className="text-gray-600">
                    Yes, we offer merit-based scholarships for students who have scored above 90% in their qualifying examinations. Additional scholarships are available for students from economically weaker sections.
                  </p>
                </div>
              </div>
            </Card>
          </div>
          
          <div className="lg:col-span-3">
            <Card className="p-6">
              <div className="flex items-center mb-6">
                <MessageSquare className="text-blue-800 mr-2" />
                <h2 className="text-2xl font-bold text-gray-800">Send Us a Message</h2>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Full Name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                  
                  <Input
                    label="Email Address"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <Input
                  label="Subject"
                  name="subject"
                  type="text"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
                
                <div className="mb-4">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    required
                  ></textarea>
                </div>
                
                <Button type="submit" isLoading={isLoading}>
                  <Send size={16} className="mr-2" />
                  Send Message
                </Button>
              </form>
            </Card>
          </div>
        </div>

        <div className="mt-12">
          <Card className="p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Our Location</h2>
            <div className="w-full h-80 bg-gray-300 rounded-lg">
              {/* Insert Google Maps iframe or similar map component here */}
              <div className="w-full h-full flex items-center justify-center bg-gray-200 rounded-lg">
                <p className="text-gray-500">Interactive Map Would Appear Here</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;