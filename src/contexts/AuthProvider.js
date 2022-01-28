import React, { useEffect, useReducer } from "react";
import {
  GoogleAuthProvider, // ! Для авторизации через гугл
  signInWithPopup, // ! Чтобы вышло модальное окно при входе
  onAuthStateChanged, // ! Чтобы понимать пользователь в системе или нет
  signOut, // ! Чтобы выйти из системы
} from "firebase/auth";
import { auth } from "../firebase";

export const AuthContext = React.createContext();

const INIT_STATE = {
  user: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "CHECK_USER":
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

const AuthProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  const googleProvider = new GoogleAuthProvider();
  const authWithGoogle = async () => {
    try {
      const response = await signInWithPopup(auth, googleProvider);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const checkUser = () => {
    onAuthStateChanged(auth, (user) => {
      let action = {
        type: "CHECK_USER",
        payload: user,
      };
      dispatch(action);
    });
  };
  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <AuthContext.Provider value={{ authWithGoogle, logout, user: state.user }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
