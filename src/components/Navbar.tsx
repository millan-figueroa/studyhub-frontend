import { NavLink } from "react-router-dom";
import { useAuth } from "../context/useAuth";

export default function NavBar() {
  // grab current user and logout function
  const { user, logOut } = useAuth();

  return (
    <nav>
      <NavLink to="/">home</NavLink>

      {/* if user is not logged in show auth link */}
      {!user && <NavLink to="/auth">signin / signup</NavLink>}

      {/* if logged in show modules link */}
      {user && <NavLink to="/modules">modules</NavLink>}

      {/* logout button when logged in */}
      {user && (
        <NavLink
          to="/"
          onClick={() => {
            logOut(); // clears user + token
          }}
        >
          logout
        </NavLink>
      )}
    </nav>
  );
}
