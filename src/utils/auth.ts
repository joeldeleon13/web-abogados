import { User } from '../types/auth';

export const hashPassword = (password: string): string => {
  // En una aplicación real, usaríamos bcrypt o similar
  return btoa(password);
};

export const validatePassword = (password: string, hash: string): boolean => {
  return btoa(password) === hash;
};

export const isFirstUser = (): boolean => {
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  return users.length === 0;
};

export const createUser = (email: string, password: string): User => {
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const newUser: User = {
    id: Date.now().toString(),
    email,
    password: hashPassword(password),
    isAdmin: isFirstUser(), // El primer usuario será admin
    createdAt: new Date().toISOString()
  };
  users.push(newUser);
  localStorage.setItem('users', JSON.stringify(users));
  return newUser;
};

export const findUser = (email: string): User | null => {
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  return users.find((u: User) => u.email === email) || null;
};

export const updateUserAdmin = (email: string, adminUser: User) => {
  if (!adminUser.isAdmin) throw new Error('No tienes permisos de administrador');
  
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const userIndex = users.findIndex((u: User) => u.email === email);
  
  if (userIndex === -1) throw new Error('Usuario no encontrado');
  
  users[userIndex].isAdmin = true;
  localStorage.setItem('users', JSON.stringify(users));
};