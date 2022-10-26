import { useState, useEffect } from "react";
import { projectAuth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
  //states
  const [isCanceled, setIsCanceled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  //logout function
  const logout = async () => {
    //set initial
    setError(null);
    setIsPending(true);

    //sign the user out
    try {
      await projectAuth.signOut();

      //dispatch logout action
      dispatch({ type: "LOGOUT" });

      //if not canceled, /update state
      if (!isCanceled) {
        setIsPending(false);
        setError(null);
      }
    } catch (err) {
      if (!isCanceled) {
        console.log(err);
        setError(err);
        setIsPending(false);
      }
    }
  };

  //useEffect to return a clean up function
  useEffect(() => {
    return () => setIsCanceled(true);
  }, []);

  return { logout, error, isPending };
};
