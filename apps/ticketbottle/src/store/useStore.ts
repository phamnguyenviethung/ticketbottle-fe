import { TokenData } from '@/features/Auth/interface/token.interface';
import { User } from '@/features/Auth/interface/user.interface';
import {
  getTokenFromLocalStorage,
  getUserInfoFromLocalStorage,
} from '@/utils/authUtil';
import { create, StateCreator } from 'zustand';
import { devtools } from 'zustand/middleware';

interface AuthSlice {
  token: TokenData | null;
  user: User | null;
  setToken: (token: TokenData) => void;
  setUser: (user: User) => void;
}

type AppStore = AuthSlice;

export const createAuthSlice: StateCreator<
  AppStore,
  [['zustand/devtools', never]],
  [],
  AuthSlice
> = (set) => {
  const token = getTokenFromLocalStorage();
  const user = getUserInfoFromLocalStorage();
  return {
    token,
    user,
    setToken: (token: TokenData) => set({ token }),

    setUser: (user: User) => set({ user }),
  };
};

const useAppStore = create<AppStore>()(
  devtools((...a) => ({
    ...createAuthSlice(...a),
  }))
);
export default useAppStore;
