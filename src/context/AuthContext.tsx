import React, { createContext, useState, useContext, ReactNode } from 'react';
import { User } from '../types';

interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo purposes
const mockUsers = [
  { id: 'admin1', email: 'admin@college.edu', role: 'admin' as const, name: 'Admin User' },
  { id: 'student1', email: 'student@example.com', role: 'student' as const, name: 'John Doe' },
];

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const isAuthenticated = !!currentUser;
  const isAdmin = currentUser?.role === 'admin';

  const login = async (email: string, password: string) => {
    // Simulating API call
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        const user = mockUsers.find(u => u.email === email);
        if (user && password === 'password') { // Simple password check for demo
          setCurrentUser(user);
          localStorage.setItem('user', JSON.stringify(user));
          resolve();
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 1000);
    });
  };

  const register = async (email: string, password: string) => {
    // Simulating API call
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        const exists = mockUsers.some(u => u.email === email);
        if (exists) {
          reject(new Error('User already exists'));
        } else {
          const newUser = {
            id: `student${Date.now()}`,
            email,
            role: 'student' as const
          };
          mockUsers.push(newUser);
          setCurrentUser(newUser);
          localStorage.setItem('user', JSON.stringify(newUser));
          resolve();
        }
      }, 1000);
    });
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ currentUser, isAuthenticated, isAdmin, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};