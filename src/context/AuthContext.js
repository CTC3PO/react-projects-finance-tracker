/* store user authenticaiton context for all user */

import { createContext, useReducer } from "react";
import { projectAuth } from "../firebase/config";
import { useEffect } from "react";

export const AuthContext = createContext();

//authReducer takes current state and the action, then
//update the state, including the user, in different ways
//depending on the action type, it perfomrs different action
export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      //we take current state and spread it in, update user
      //property, with whatever we pass in as payload for the action
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: null };
    case "AUTH_IS_READY":
      return { ...state, user: action.payload, authIsReady: true };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  //reducer function, set user intially to null
  //state and dispatch comes from authReducer
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    //check if a user logged in, if yes - it will update user
    //then we can render component tree
    authIsReady: false,
  });

  //fire function only once initially when first load app
  //to find out if there's an initial user
  useEffect(() => {
    const unsub = projectAuth.onAuthStateChanged((user) => {
      dispatch({ type: "AUTH_IS_READY", payload: user });
      unsub();
    });
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
