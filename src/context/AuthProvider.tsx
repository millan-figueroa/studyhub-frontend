import { createContext, useState } from "react";
import { apiClient } from "../clients/api";
import type { User } from "../types";
// note: user and token setters should also accept null or TS will complain on logout
interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  register: (
    username: string,
    email: string,
    password: string
  ) => Promise<void>;
  logIn: (username: string, password: string) => Promise<void>;
  logOut: () => void;
  token: string | null;
  setToken: (token: string | null) => void;
}

// the provider will wrap everything inside the app
interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthContext = createContext<AuthContextType | null>(null);

// context starts out as null
export default function AuthProvider({ children }: AuthProviderProps) {
  // loads the saved user and token from localstorage on start
  const [user, setUser] = useState<User | null>(() => {
    try {
      const value = localStorage.getItem("user");
      if (value) {
        return JSON.parse(value);
      } else return null;
    } catch (error) {
      console.error(error);
    }
  });

  const [token, setToken] = useState<string | null>(() => {
    try {
      // grab the token from localstorage when app loads
      const value = localStorage.getItem("token");
      // if found something return it (parsed)
      if (value) {
        return JSON.parse(value);
      } else {
        // nothing found so just return null
        return null;
      }
    } catch (error) {
      // if something goes wrong show it in console
      console.error(error);
      return null;
    }
  });

  // >>> REGISTER USER <<<
  async function register(username: string, email: string, password: string) {
    try {
      // sending the new user info to my backend register route
      const res = await apiClient.post("/api/users/register", {
        username,
        email,
        password,
      });

      // just logging what backend sends so i can see it
      console.log(res.data);
    } catch (error) {
      // shows the error in console if register fails
      console.error(error);
    }
  }

  // >>> LOGIN USER <<<
  async function logIn(email: string, password: string) {
    try {
      // calling my backend login route with the info the user typed
      const res = await apiClient.post("/api/users/login", { email, password });

      // just checking what the backend sends back
      console.log(res.data);

      // save token + user in state so the rest of the app knows im logged in
      setToken(res.data.token);
      setUser(res.data.user);

      // also saving both to localstorage so login stays after a refresh
      localStorage.setItem("token", JSON.stringify(res.data.token));
      localStorage.setItem("user", JSON.stringify(res.data.user));
    } catch (error) {
      // show error in console so i know what went wrong
      console.error(error);
    }
  }

  // >>> LOGOUT USER <<<
  function logOut() {
    // clear the user + token from state so app knows im logged out
    setUser(null);
    setToken(null);

    // also remove from localstorage so it doesnt auto login again
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  }
  // wrapping the whole app so it can use auth stuff anywhere
  return (
    <AuthContext.Provider
      value={{ user, setUser, register, logIn, logOut, token, setToken }}
    >
      {children}
    </AuthContext.Provider>
  );
}
