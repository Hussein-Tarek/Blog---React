import {
  useState,
  useContext,
  useEffect,
  createContext,
  Children,
} from "react";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}
export function AuthProvider({ children }) {
  const [authUser, setAuthUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState();
  const [userId, setUserId] = useState();
  //   const value
  return (
    <AuthContext.Provider
      value={{
        authUser,
        setAuthUser,
        isLoggedIn,
        setIsLoggedIn,
        userId,
        setUserId,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export default AuthContext;
