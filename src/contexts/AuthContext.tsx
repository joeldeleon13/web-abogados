import React, { createContext, useContext, useState } from 'react';

// Define el tipo de usuario
interface User {
  email: string;
  password: string;
}

// Define el contexto de autenticación
const AuthContext = createContext<any>(null);

// Hook personalizado para usar el contexto de autenticación
export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  const signIn = async (email: string, password: string) => {
    try {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const existingUser = users.find((u: User) => u.email === email && u.password === password);
      if (existingUser) {
        setUser(existingUser);
        setError(null);
      } else {
        throw new Error('Correo electrónico o contraseña incorrectos');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al iniciar sesión');
      throw err;
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const existingUser = users.find((u: User) => u.email === email);
      if (existingUser) {
        throw new Error('El usuario ya existe');
      } else {
        const newUser = { email, password };
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        setUser(newUser);
        setError(null);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al registrarse');
      throw err;
    }
  };

  const signOut = () => {
    setUser(null);
  };

  const resetPassword = async (email: string, newPassword: string) => {
    try {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const userIndex = users.findIndex((u: User) => u.email === email);
      if (userIndex === -1) throw new Error('Usuario no encontrado');
      users[userIndex].password = newPassword;
      localStorage.setItem('users', JSON.stringify(users));
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al restablecer contraseña');
      throw err;
    }
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signUp, signOut, resetPassword, error }}>
      {children}
    </AuthContext.Provider>
  );
};