import { SliceInterface } from '@/store/useStore';
import { TokenData } from './interface/token.interface';
import { User } from './interface/user.interface';
import {
  clearAuthLocalStorage,
  getTokenFromLocalStorage,
  getUserInfoFromLocalStorage,
} from '@/utils/authUtil';

export interface AuthSlice {
  token: TokenData | null;
  user: User | null;
  setToken: (token: TokenData | null) => void;
  setUser: (user: User | null) => void;
  logout: () => void;
}
export const createAuthSlice: SliceInterface<AuthSlice> = (set) => {
  const token = getTokenFromLocalStorage();
  const user = getUserInfoFromLocalStorage();
  return {
    token,
    user,
    setToken: (token: TokenData | null) => set({ token }),
    setUser: (user: User | null) => set({ user }),
    logout: () => {
      set({ token: null });
      set({ user: null });
      clearAuthLocalStorage();
    },
  };
};
