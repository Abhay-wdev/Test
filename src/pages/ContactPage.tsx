
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email) {
      toast.error("Please fill in required fields");
      return;
    }

    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('leads')
        .insert({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          source: 'contact_form'
        });

      if (error) {
        console.error('Error submitting lead:', error);
        toast.error("Failed to submit your message. Please try again.");
      } else {
        toast.success("Thank you! Your message has been sent successfully.");
        setFormData({ name: "", email: "", phone: "", message: "" });
      }
    } catch (error) {
      console.error('Error submitting lead:', error);
      toast.error("Failed to submit your message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container-custom">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-spice-earth mb-4">Contact Us</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            स्वाद से बढ़कर कुछ नहीं - Get in touch with us for the finest authentic Indian spices and ingredients
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-spice-earth">Get In Touch</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start space-x-4">
                  <Phone className="h-6 w-6 text-spice-paprika mt-1" />
                  <div>
                    <h3 className="font-semibold text-spice-earth">Phone</h3>
                    <p className="text-gray-600">+91 98765 43210</p>
                    <p className="text-gray-600">+91 87654 32109</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <Mail className="h-6 w-6 text-spice-paprika mt-1" />
                  <div>
                    <h3 className="font-semibold text-spice-earth">Email</h3>
                    <p className="text-gray-600">info@suswastik.com</p>
                    <p className="text-gray-600">orders@suswastik.com</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <MapPin className="h-6 w-6 text-spice-paprika mt-1" />
                  <div>
                    <h3 className="font-semibold text-spice-earth">Address</h3>
                    <p className="text-gray-600">
                      123 Spice Market Street<br />
                      Delhi, India - 110001
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <Clock className="h-6 w-6 text-spice-paprika mt-1" />
                  <div>
                    <h3 className="font-semibold text-spice-earth">Business Hours</h3>
                    <p className="text-gray-600">Monday - Saturday: 9:00 AM - 8:00 PM</p>
                    <p className="text-gray-600">Sunday: 10:00 AM - 6:00 PM</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Brand Taglines */}
            <Card>
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  <h3 className="text-xl font-bold text-spice-earth">Why Choose Suswastik?</h3>
                  <div className="space-y-2 text-gray-600">
                    <p className="italic">"स्वाद से बढ़कर कुछ नहीं"</p>
                    <p>"Authentic flavors, premium quality"</p>
                    <p>"From our kitchen to yours, with love"</p>
                    <p>"Taste the tradition, feel the difference"</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-spice-earth">Send us a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email address"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Enter your phone number"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-spice-paprika hover:bg-spice-paprika/90"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
