import { create } from 'zustand';

interface User {
  id: string;
  email: string;
  name: string;
  plan: 'free' | 'standard' | 'premium';
  usageLimit: number;
  usageCount: number;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  signup: (email: string, password: string, name: string) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  // 預設為已登入狀態,方便測試
  isAuthenticated: true,
  user: {
    id: '1',
    email: 'demo@example.com',
    name: 'Demo User',
    plan: 'free',
    usageLimit: 100,
    usageCount: 45
  },

  login: async (email: string, password: string) => {
    // 模擬登入 - 實際應串接 Supabase Auth
    await new Promise((resolve) => setTimeout(resolve, 1000));

    set({
      isAuthenticated: true,
      user: {
        id: '1',
        email,
        name: email.split('@')[0],
        plan: 'free',
        usageLimit: 100,
        usageCount: 0
      }
    });
  },

  logout: () => {
    set({
      isAuthenticated: false,
      user: null
    });
  },

  signup: async (email: string, password: string, name: string) => {
    // 模擬註冊 - 實際應串接 Supabase Auth
    await new Promise((resolve) => setTimeout(resolve, 1000));

    set({
      isAuthenticated: true,
      user: {
        id: '1',
        email,
        name,
        plan: 'free',
        usageLimit: 100,
        usageCount: 0
      }
    });
  }
}));