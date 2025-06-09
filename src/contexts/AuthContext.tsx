
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  favorites: string[];
  orders: Order[];
}

interface Order {
  id: string;
  date: string;
  total: number;
  status: string;
  items: CartItem[];
}

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  category: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  addToFavorites: (productId: string) => void;
  removeFromFavorites: (productId: string) => void;
  addOrder: (order: Omit<Order, 'id' | 'date'>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('jewelry_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Имитация API запроса
    const users = JSON.parse(localStorage.getItem('jewelry_users') || '[]');
    const foundUser = users.find((u: any) => u.email === email && u.password === password);
    
    if (foundUser) {
      const userWithoutPassword = { ...foundUser };
      delete userWithoutPassword.password;
      setUser(userWithoutPassword);
      localStorage.setItem('jewelry_user', JSON.stringify(userWithoutPassword));
      return true;
    }
    return false;
  };

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    // Имитация API запроса
    const users = JSON.parse(localStorage.getItem('jewelry_users') || '[]');
    
    if (users.find((u: any) => u.email === email)) {
      return false; // Пользователь уже существует
    }

    const newUser = {
      id: Date.now().toString(),
      email,
      password,
      name,
      favorites: [],
      orders: []
    };

    users.push(newUser);
    localStorage.setItem('jewelry_users', JSON.stringify(users));

    const userWithoutPassword = { ...newUser };
    delete userWithoutPassword.password;
    setUser(userWithoutPassword);
    localStorage.setItem('jewelry_user', JSON.stringify(userWithoutPassword));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('jewelry_user');
  };

  const addToFavorites = (productId: string) => {
    if (!user) return;
    
    const updatedUser = {
      ...user,
      favorites: [...user.favorites, productId]
    };
    setUser(updatedUser);
    localStorage.setItem('jewelry_user', JSON.stringify(updatedUser));
    
    // Обновляем в общем списке пользователей
    const users = JSON.parse(localStorage.getItem('jewelry_users') || '[]');
    const userIndex = users.findIndex((u: any) => u.id === user.id);
    if (userIndex !== -1) {
      users[userIndex].favorites = updatedUser.favorites;
      localStorage.setItem('jewelry_users', JSON.stringify(users));
    }
  };

  const removeFromFavorites = (productId: string) => {
    if (!user) return;
    
    const updatedUser = {
      ...user,
      favorites: user.favorites.filter(id => id !== productId)
    };
    setUser(updatedUser);
    localStorage.setItem('jewelry_user', JSON.stringify(updatedUser));
    
    // Обновляем в общем списке пользователей
    const users = JSON.parse(localStorage.getItem('jewelry_users') || '[]');
    const userIndex = users.findIndex((u: any) => u.id === user.id);
    if (userIndex !== -1) {
      users[userIndex].favorites = updatedUser.favorites;
      localStorage.setItem('jewelry_users', JSON.stringify(users));
    }
  };

  const addOrder = (order: Omit<Order, 'id' | 'date'>) => {
    if (!user) return;
    
    const newOrder: Order = {
      ...order,
      id: Date.now().toString(),
      date: new Date().toISOString()
    };
    
    const updatedUser = {
      ...user,
      orders: [newOrder, ...user.orders]
    };
    setUser(updatedUser);
    localStorage.setItem('jewelry_user', JSON.stringify(updatedUser));
    
    // Обновляем в общем списке пользователей
    const users = JSON.parse(localStorage.getItem('jewelry_users') || '[]');
    const userIndex = users.findIndex((u: any) => u.id === user.id);
    if (userIndex !== -1) {
      users[userIndex].orders = updatedUser.orders;
      localStorage.setItem('jewelry_users', JSON.stringify(users));
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout,
      addToFavorites,
      removeFromFavorites,
      addOrder
    }}>
      {children}
    </AuthContext.Provider>
  );
};
