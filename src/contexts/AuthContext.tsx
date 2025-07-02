
import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
  createdAt: Date;
  lastLogin?: Date;
}

interface AuthContextType {
  user: User | null;
  users: User[];
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string, role?: 'admin' | 'user') => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  addUser: (userData: Omit<User, 'id' | 'createdAt'>) => void;
  removeUser: (id: string) => void;
  updateUser: (id: string, updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Usuário admin padrão
const DEFAULT_ADMIN: User = {
  id: 'admin-1',
  email: 'admin@unifi.local',
  name: 'Administrador',
  role: 'admin',
  createdAt: new Date(),
  lastLogin: new Date(),
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([DEFAULT_ADMIN]);

  // Carrega dados do localStorage
  useEffect(() => {
    const savedUsers = localStorage.getItem('unifi-users');
    if (savedUsers) {
      const parsed = JSON.parse(savedUsers);
      setUsers(parsed);
    }

    const savedUser = localStorage.getItem('unifi-current-user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // Salva usuários no localStorage
  useEffect(() => {
    localStorage.setItem('unifi-users', JSON.stringify(users));
  }, [users]);

  // Salva usuário atual no localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem('unifi-current-user', JSON.stringify(user));
    } else {
      localStorage.removeItem('unifi-current-user');
    }
  }, [user]);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulação de autenticação
    // Senha padrão do admin: admin123
    if (email === 'admin@unifi.local' && password === 'admin123') {
      const adminUser = users.find(u => u.email === email);
      if (adminUser) {
        const updatedUser = { ...adminUser, lastLogin: new Date() };
        setUser(updatedUser);
        setUsers(prev => prev.map(u => u.id === adminUser.id ? updatedUser : u));
        return true;
      }
    }

    // Verificar outros usuários (senha = "123456" para teste)
    const foundUser = users.find(u => u.email === email);
    if (foundUser && password === '123456') {
      const updatedUser = { ...foundUser, lastLogin: new Date() };
      setUser(updatedUser);
      setUsers(prev => prev.map(u => u.id === foundUser.id ? updatedUser : u));
      return true;
    }

    return false;
  };

  const register = async (name: string, email: string, password: string, role: 'admin' | 'user' = 'user'): Promise<boolean> => {
    // Verificar se o email já existe
    if (users.some(u => u.email === email)) {
      return false;
    }

    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
      role,
      createdAt: new Date(),
    };

    setUsers(prev => [...prev, newUser]);
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  const addUser = (userData: Omit<User, 'id' | 'createdAt'>) => {
    const newUser: User = {
      ...userData,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    setUsers(prev => [...prev, newUser]);
  };

  const removeUser = (id: string) => {
    setUsers(prev => prev.filter(u => u.id !== id));
    if (user?.id === id) {
      setUser(null);
    }
  };

  const updateUser = (id: string, updates: Partial<User>) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, ...updates } : u));
    if (user?.id === id) {
      setUser(prev => prev ? { ...prev, ...updates } : null);
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      users,
      login,
      register,
      logout,
      isAuthenticated: !!user,
      addUser,
      removeUser,
      updateUser,
    }}>
      {children}
    </AuthContext.Provider>
  );
};
