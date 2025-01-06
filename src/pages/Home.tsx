import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, Users, Clock } from 'lucide-react';

export const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div 
        className="relative bg-cover bg-center h-[600px]"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")'
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="text-white">
            <h1 className="text-5xl font-bold mb-4">Expert Immigration & Visa Services</h1>
            <p className="text-xl mb-8">Professional guidance for your immigration journey</p>
            <Link
              to="/contact"
              className="bg-indigo-600 text-white px-8 py-3 rounded-md hover:bg-indigo-700 transition"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <Globe className="h-12 w-12 mx-auto text-indigo-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Global Expertise</h3>
              <p className="text-gray-600">Comprehensive knowledge of international immigration laws</p>
            </div>
            <div className="text-center">
              <Users className="h-12 w-12 mx-auto text-indigo-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Personalized Service</h3>
              <p className="text-gray-600">Tailored solutions for your unique situation</p>
            </div>
            <div className="text-center">
              <Clock className="h-12 w-12 mx-auto text-indigo-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Efficient Processing</h3>
              <p className="text-gray-600">Quick and accurate handling of your case</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};