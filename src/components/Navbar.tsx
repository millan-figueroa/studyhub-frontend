import { NavLink } from "react-router-dom";
import { useAuth } from "../context/useAuth";

export default function NavBar() {
  const auth = useAuth(); // may be null at first render

  // if auth is null, show minimal navbar so app doesn't crash
  if (!auth) {
    return (
      <nav>
        <NavLink to="/">home</NavLink>
        <NavLink to="/auth">signin / signup</NavLink>
      </nav>
    );
  }

  // grab current user and logout function
  const { user, logOut } = auth;

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
