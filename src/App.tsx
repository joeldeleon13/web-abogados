import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Quiz } from './pages/Quiz';
import { ContactForm } from './components/ContactForm';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/contact" element={
              <div className="max-w-7xl mx-auto px-4 py-12">
                <h2 className="text-3xl font-bold text-center mb-8">Contáctanos</h2>
                <ContactForm />
              </div>
            } />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;