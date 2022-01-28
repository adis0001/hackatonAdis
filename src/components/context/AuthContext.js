import React from "react";
import { useState } from "react";

import { useEffect } from "react";
import { useContext } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../../firebase";
export const authContext = React.createContext();

export function useAuth() {
  return useContext(authContext);
}

const AuthProvide = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }
  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }
  function logout() {
    return auth.signOut();
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser((q) => user);
      setLoading((q) => false);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login,
    signup,
    logout,
  };
  return (
    <authContext.Provider value={{ value, GoogleAuthProvider, logout }}>
      {!loading && children}
    </authContext.Provider>
  );
};

export default AuthProvide;
