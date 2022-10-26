import { useState, useEffect } from "react";
import { projectAuth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  //states
  const [isCanceled, setIsCanceled] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const { dispatch } = useAuthContext();

  //login function, try (login, dispatch function), catch error
  const login = async (email, password) => {
    //set initially state
    setIsPending(true);
    setError(null);

    try {
      //login
      const response = await projectAuth.signInWithEmailAndPassword(
        email,
        password
      );

      //dispatch login action
      dispatch({ type: "LOGIN", payload: response.user });

      if (!isCanceled) {
        setIsPending(false);
        setError(null);
      }
    } catch (err) {
      if (!isCanceled) {
        setIsPending(false);
        setError(err.message);
      }
    }
  };

  //useEffect for clean up function
  useEffect(() => {
    return () => setIsCanceled(true);
  }, []);

  //return
  return { login, error, isPending };
};
