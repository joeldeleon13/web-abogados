import React from 'react';
import { Link } from 'react-router-dom';
import { Scale, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export const Navbar = () => {
  const { user, signIn, signOut } = useAuth();

  return (
    <nav className="bg-indigo-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Scale className="h-8 w-8" />
            <span className="font-bold text-xl">VisaLegal Pro</span>
          </Link>
          <div className="flex items-center space-x-4">
            <Link to="/quiz" className="hover:text-indigo-200">Cuestionario</Link>
            <Link to="/contact" className="hover:text-indigo-200">Contacto</Link>
            {user ? (
              <div className="flex items-center space-x-2">
                <User className="h-6 w-6" />
                <span className="text-sm">{user.email}</span>
                <button onClick={signOut} className="hover:text-indigo-200">
                  Cerrar Sesión
                </button>
              </div>
            ) : (
              <button
                onClick={signIn}
                className="bg-white text-indigo-700 px-4 py-2 rounded-md hover:bg-indigo-100"
              >
                Iniciar Sesión
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};