import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export const ContactForm = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: user?.email || '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Store in localStorage
    const messages = JSON.parse(localStorage.getItem('messages') || '[]');
    messages.push({ ...formData, timestamp: new Date().toISOString() });
    localStorage.setItem('messages', JSON.stringify(messages));
    alert('Message sent successfully!');
    setFormData({ name: '', email: user?.email || '', subject: '', message: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Subject</label>
        <input
          type="text"
          required
          value={formData.subject}
          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Message</label>
        <textarea
          required
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>
      <button
        type="submit"
        className="flex items-center justify-center w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
      >
        <Send className="h-5 w-5 mr-2" />
        Send Message
      </button>
    </form>
  );
};