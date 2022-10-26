/*
The Signup page allows the user to sign up with email and
 password and their name. It call the useSignup hook for
signup function, then return a form with fields email,
  password and displayName 
*/

import { useState } from "react";

//import hooks
import { useSignup } from "../../hooks/useSignup";

//styles
import styles from "./Signup.module.css";

export default function Signup() {
  //states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  //get return properties and function from useSignup hook
  const { signup, isPending, error } = useSignup();

  //handleSubmit function, call lthe signup function from the hook
  const handleSubmit = (e) => {
    e.preventDefault();
    signup(email, password, displayName);
  };

  return (
    <form onSubmit={handleSubmit} className={styles["signup-form"]}>
      <h2>Sign up</h2>

      <label>
        <span>email: </span>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </label>
      <label>
        <span>password: </span>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </label>
      <label>
        <span>display name: </span>
        <input
          type="text"
          onChange={(e) => setDisplayName(e.target.value)}
          value={displayName}
        />
      </label>

      {!isPending && <button>Sign up </button>}
      {isPending && (
        <button className="btn" disabled>
          Loading...
        </button>
      )}
      {error && <p>{error}</p>}
    </form>
  );
}
