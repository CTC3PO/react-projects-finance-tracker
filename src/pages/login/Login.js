import styles from "./Login.module.css";
import { useState } from "react";

//hooks
import { useLogin } from "../../hooks/useLogin";

//create a form for user to log in

export default function Login() {
  //set states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //extract from hooks
  const { login, error, isPending } = useLogin();

  //handleSubmit function
  const handleSubmit = (e) => {
    e.preventDefault();

    login(email, password);
  };

  return (
    <form onSubmit={handleSubmit} className={styles["login-form"]}>
      <h2>Login</h2>
      <label>
        <span>email: </span>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </label>
      <label>
        <span>password:</span>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </label>
      {!isPending && <button className="btn">Login</button>}
      {isPending && (
        <button className="btn" disabled>
          Loading...
        </button>
      )}
      {error && <p>{error}</p>}
    </form>
  );
}
