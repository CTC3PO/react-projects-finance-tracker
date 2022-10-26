//styles
import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";

//hooks
import { useAuthContext } from "../hooks/useAuthContext";

export default function Navbar() {
  const { logout } = useLogout();
  //access the user component in useAuthContext
  const { user } = useAuthContext();

  //conditionally showing user content (login, logout, signup)
  //if don't have a user, shows "login" and "Signup"
  //if there's a user logged in, show "logout" and user's name

  return (
    <nav className={styles.navbar}>
      <ul>
        <li className={styles.title}>My Finance Tracker</li>
        {!user && (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
          </>
        )}

        {user && (
          <>
            <li>Hello, {user.displayName} </li>
            <li>
              <button className="btn" onClick={logout}>
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
