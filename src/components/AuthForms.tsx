import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { User, KeyReset } from 'lucide-react';

interface AuthFormsProps {
  onSuccess?: () => void;
}

export const AuthForms = ({ onSuccess }: AuthFormsProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const { signIn, signUp, resetPassword, error } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isForgotPassword) {
        await resetPassword(email, newPassword);
        alert('Contraseña actualizada exitosamente');
      } else if (isLogin) {
        await signIn(email, password);
      } else {
        await signUp(email, password);
      }
      setEmail('');
      setPassword('');
      setNewPassword('');
      onSuccess?.();
    } catch (err) {
      console.error(err);
    }
  };

  if (isForgotPassword) {
    return (
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
        <div className="flex justify-center mb-6">
          <KeyReset className="h-12 w-12 text-indigo-600" />
        </div>
        <h2 className="text-2xl font-bold text-center mb-6">
          Recuperar Contraseña
        </h2>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Correo Electrónico
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nueva Contraseña
            </label>
            <input
              type="password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Actualizar Contraseña
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={() => setIsForgotPassword(false)}
            className="text-sm text-indigo-600 hover:text-indigo-500"
          >
            Volver al inicio de sesión
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
      <div className="flex justify-center mb-6">
        <User className="h-12 w-12 text-indigo-600" />
      </div>
      <h2 className="text-2xl font-bold text-center mb-6">
        {isLogin ? 'Iniciar Sesión' : 'Registrarse'}
      </h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Correo Electrónico
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Contraseña
          </label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          {isLogin ? 'Iniciar Sesión' : 'Registrarse'}
        </button>
      </form>

      <div className="mt-4 text-center space-y-2">
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="text-sm text-indigo-600 hover:text-indigo-500"
        >
          {isLogin
            ? '¿No tienes cuenta? Regístrate'
            : '¿Ya tienes cuenta? Inicia sesión'}
        </button>
        {isLogin && (
          <div>
            <button
              onClick={() => setIsForgotPassword(true)}
              className="text-sm text-indigo-600 hover:text-indigo-500"
            >
              ¿Olvidaste tu contraseña?
            </button>
          </div>
        )}
      </div>
    </div>
  );
};