

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // ... (código anterior)

  const resetPassword = async (email: string, newPassword: string) => {
    try {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const userIndex = users.findIndex((u: User) => u.email === email);
      
      if (userIndex === -1) throw new Error('Usuario no encontrado');
      
      users[userIndex].password = hashPassword(newPassword);
      localStorage.setItem('users', JSON.stringify(users));
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al restablecer contraseña');
      throw err;
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      signIn, 
      signUp, 
      signOut, 
      makeAdmin, 
      resetPassword, 
      error 
    }}>
      {children}
    </AuthContext.Provider>
  );
};