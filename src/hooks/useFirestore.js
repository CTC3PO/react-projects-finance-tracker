import { useReducer, useEffect, useState } from "react";
import { projectFirestore, timestamp } from "../firebase/config";

//initialState object
let initialState = {
  document: null,
  isPending: false,
  error: null,
  success: null,
};

/*
firestoreReducer function for switching between different actions
IS_PENDING case: add document, set states and document
case: error, set error message and other states
case ADDED_DOCUMENT
*/
const firestoreReducer = (state, action) => {
  switch (action.type) {
    case "IS_PENDING":
      return { success: false, isPending: true, error: null, document: null };
    case "ERROR":
      return {
        success: false,
        isPending: false,
        error: action.payload,
        document: null,
      };
    case "ADDED_DOCUMENT":
      return {
        success: true,
        isPending: false,
        error: null,
        document: action.payload,
      };
    case "DELETED_DOCUMENT":
      return {
        success: true,
        isPending: false,
        error: null,
        document: null,
      };
    default:
      return state;
  }
};

/*
useFirestore function takes in the collection as argument, 
and allows to add/delete document
*/
export const useFirestore = (collection) => {
  //states isCancelled, call useReducer on firestoreReducer - state is initialState
  const [response, dispatch] = useReducer(firestoreReducer, initialState);
  const [isCancelled, setIsCancelled] = useState(false);

  // collection ref
  const ref = projectFirestore.collection(collection);

  // only dispatch if not cancelled function
  const dispatchIfNotCancelled = (action) => {
    if (!isCancelled) {
      dispatch(action);
    }
  };

  // add a document
  const addDocument = async (doc) => {
    //first, dispatch the IS_PENDING action
    dispatch({ type: "IS_PENDING" });

    //try to add document to firestore
    try {
      const createdAt = timestamp.fromDate(new Date());
      const addedDocument = await ref.add({ ...doc, createdAt });
      dispatchIfNotCancelled({
        type: "ADDED_DOCUMENT",
        payload: addedDocument,
      });

      //catch any error and display message
    } catch (err) {
      dispatchIfNotCancelled({ type: "ERROR", payload: err.message });
    }
  };

  // delete a document
  const deleteDocument = async (id) => {
    dispatch({ type: "IS_PENDING" });

    try {
      const deleteDocument = await ref.doc(id).delete();
      dispatchIfNotCancelled({
        type: "DELETE_DOCUMENT",
        payload: deleteDocument,
      });
    } catch (err) {
      dispatchIfNotCancelled({ type: "ERROR", payload: "could not delete" });
    }
  };

  //useEffect to setIsCancelled as true
  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  //return of useFirestore hook
  return { addDocument, deleteDocument, response };
};
