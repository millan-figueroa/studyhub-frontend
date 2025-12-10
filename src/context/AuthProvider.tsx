import { createContext } from "react";
import type { User } from "../types";
// note: user and token setters should also accept null or TS will complain on logout
interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  logIn: (username: string, password: string) => Promise<void>;
  register: (
    username: string,
    email: string,
    password: string
  ) => Promise<void>;
  logOut: () => void;
  token: string | null;
  setToken: (token: string | null) => void;
}

// context starts out as null until provider sets real values
// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextType | null>(null);

// the provider will wrap everything inside the app
interface AuthProviderProps {
  children: React.ReactNode;
}
