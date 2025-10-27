  import React, { createContext, useReducer, useContext } from "react";
  import { authReducer, initialState } from "../reducers/AuthReducer";
  import type { AuthState, AuthAction, User } from "../reducers/AuthReducer";    

  type AuthContextType = {
    state: AuthState;
    dispatch: React.Dispatch<AuthAction>;
  };

  const AuthContext = createContext<AuthContextType | undefined>(undefined);

  export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(authReducer, initialState);

    return (
      <AuthContext.Provider value={{ state, dispatch }}>
        {children}
      </AuthContext.Provider>
    );
  }

  export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) {
      throw new Error("useAuth must be used inside <AuthProvider>");
    }
    return ctx;
  }
