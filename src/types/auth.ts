export interface User {
  id: string;
  email: string;
  password: string;
  isAdmin: boolean;
  createdAt: string;
}

export interface AuthContextType {
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  makeAdmin: (email: string) => void;
  error: string | null;
}