//custom hook to sign user up
import { useState, useEffect } from "react";
import { projectAuth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [isCanceled, setIsCanceled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  //invoke the useAuthContext hook
  const { dispatch } = useAuthContext();

  //function to sign user up (after user fill out form)
  //the argument for the async function is email, password and displayName
  const signup = async (email, password, displayName) => {
    //initially, set error to null when user starts signup
    setError(null);
    setIsPending(true);

    try {
      //signup user
      const response = await projectAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      console.log(response.user);

      //if no response, throw error
      //error examples: password too short, email already in database
      if (!response) {
        throw new Error("Could not complete sign up ");
      }

      //else, there's valid response, add display name to user
      await response.user.updateProfile({ displayName });

      //dispatch login action (after signup)
      //has 2: type action, and payload
      dispatch({ type: "LOGIN", payload: response.user });

      //then check if isCanceled bfore setIsPending and setError
      if (!isCanceled) {
        setIsPending(false);
        setError(null);
      }

      //if not successful, catch error
    } catch (err) {
      if (!isCanceled) {
        console.log(err);
        setError(err.message);
        setIsPending(false);
      }
    }
  };

  //useEffect to return a clean up function
  useEffect(() => {
    return () => setIsCanceled(true);
  }, []);

  //return items from the hook
  return { error, isPending, signup };
};
