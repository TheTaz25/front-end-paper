import { TokenDescription } from "../../api/auth/types";
import { AUTH_KEY } from "./keys";

export const clearAuthFromLocalStorage = () => {
  window.localStorage.removeItem(AUTH_KEY);
}

export const saveAuthToLocalStorage = (tokens: TokenDescription) => {
  window.localStorage.setItem(AUTH_KEY, JSON.stringify(tokens));
};

export const getAuthFromLocalStorage = (): TokenDescription | null => {
  const item = window.localStorage.getItem(AUTH_KEY);
  if (item) {
    return JSON.parse(item);
  }
  return null;
}
