import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { UserPlus } from 'lucide-react';

export const AdminPanel = () => {
  const { user, makeAdmin, error } = useAuth();
  const [newAdminEmail, setNewAdminEmail] = useState('');

  if (!user?.isAdmin) return null;

  const handleMakeAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await makeAdmin(newAdminEmail);
      setNewAdminEmail('');
      alert('Usuario actualizado a administrador exitosamente');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <UserPlus className="h-5 w-5 text-indigo-600" />
        Panel de Administrador
      </h3>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      <form onSubmit={handleMakeAdmin} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Correo del usuario a hacer administrador
          </label>
          <input
            type="email"
            value={newAdminEmail}
            onChange={(e) => setNewAdminEmail(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="correo@ejemplo.com"
          />
        </div>
        <button
          type="submit"
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          <UserPlus className="h-5 w-5" />
          Hacer Administrador
        </button>
      </form>
    </div>
  );
};