import { TokenData } from '@/features/Auth/interface/token.interface';
import { User } from '@/features/Auth/interface/user.interface';

const TOKEN_KEY = 'token';
const USER_KEY = 'user';

export function getTokenFromLocalStorage(): TokenData | null {
  const data = localStorage.getItem(TOKEN_KEY);
  if (!data) return null;

  return JSON.parse(data);
}

export function saveTokenToLocalStorage(token: TokenData): void {
  localStorage.setItem(TOKEN_KEY, JSON.stringify(token));
}

export function getUserInfoFromLocalStorage(): User | null {
  const data = localStorage.getItem(USER_KEY);
  if (!data) return null;

  return JSON.parse(data);
}

export function saveUserInfoToLocalStorage(user: User): void {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}
