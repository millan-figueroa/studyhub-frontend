import { NavLink } from "react-router-dom";
import { useAuth } from "../context/useAuth";

export default function NavBar() {
  const auth = useAuth(); // may be null at first render

  // if auth is null, show minimal navbar so app doesn't crash
  if (!auth) {
    return (
      <nav className="flex gap-4 p-3 border-b border-gray-400">
        <NavLink className="hover:underline" to="/">
          home
        </NavLink>
        <NavLink className="hover:underline" to="/auth">
          signin / signup
        </NavLink>
      </nav>
    );
  }

  // grab current user and logout function
  const { user, logOut } = auth;

  return (
    <nav className="flex gap-4 p-3 border-b border-gray-400">
      <NavLink className="hover:underline" to="/">
        home
      </NavLink>

      {/* if user is not logged in show auth link */}
      {!user && (
        <NavLink className="hover:underline" to="/auth">
          signin / signup
        </NavLink>
      )}

      {/* if logged in show modules link */}
      {user && (
        <NavLink className="hover:underline" to="/modules">
          modules
        </NavLink>
      )}

      {/* logout button when logged in */}
      {user && (
        <NavLink
          className="hover:underline"
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
