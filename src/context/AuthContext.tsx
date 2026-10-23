import { createContext, useContext, useState } from 'react';

export interface User {
  name: string;
  email: string;
  role: 'member' | 'pioneer' | 'investor' | 'partner' | 'admin' | 'school-admin';
  tier: 'member' | 'pioneer';
  phone?: string;
  country?: string;
  city?: string;
  sector?: string;
  occupation?: string;
  goals?: string;
  isPaid: boolean;
  isConfirmed: boolean;
  firmName?: string;
  investmentFocus?: string;
  ticketSize?: string;
  orgName?: string;
  partnerType?: string;
  supportOffered?: string;
  department?: string;
  position?: string;
}

interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  updateUser: (data: Partial<User>) => void;
}

const STORAGE_KEY = 'aiim_user';

function readUser(): User | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as User;
  } catch {
    return null;
  }
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
  updateUser: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => readUser());

  const login = (userData: User) => {
    setUser(userData);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(userData)); } catch { /* ignore */ }
  };
  const logout = () => {
    setUser(null);
    try { localStorage.removeItem(STORAGE_KEY); } catch { /* ignore */ }
  };
  const updateUser = (data: Partial<User>) => {
    setUser(prev => {
      if (!prev) return prev;
      const next = { ...prev, ...data };
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch { /* ignore */ }
      return next;
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);