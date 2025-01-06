import React from 'react';
import { QuizSection } from '../components/QuizSection';
import { QuizManager } from '../components/QuizManager';
import { AuthForms } from '../components/AuthForms';
import { AdminPanel } from '../components/AdminPanel';
import { useAuth } from '../contexts/AuthContext';

export const Quiz = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-8">
            Acceso al Sistema
          </h1>
          <AuthForms />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">
          Sistema de Cuestionarios
        </h1>
        
        {user.isAdmin && (
          <>
            <AdminPanel />
            <QuizManager />
          </>
        )}
        
        <QuizSection />
      </div>
    </div>
  );
};