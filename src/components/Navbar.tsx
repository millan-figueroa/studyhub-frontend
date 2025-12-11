import { NavLink } from "react-router-dom";
import { useAuth } from "../context/useAuth";

export default function NavBar() {
  const auth = useAuth(); // may be null at first render
  console.log("NAV AUTH:", auth);
  // if auth is null, show minimal navbar so app doesn't crash
  if (!auth) {
    return (
      <nav className="bg-slate-900 border-b border-slate-700 text-slate-100 px-6 py-4">
        <div className="flex justify-center gap-10 text-sm font-medium">
          <NavLink className="hover:text-orange-400 transition" to="/">
            home
          </NavLink>
          <NavLink className="hover:text-orange-400 transition" to="/modules">
            modules
          </NavLink>
        </div>
      </nav>
    );
  }

  const { user, logOut } = auth;

  return (
    <nav className="bg-slate-900 border-b border-slate-700 text-slate-100 px-6 py-4">
      <div className="flex justify-between items-center max-w-4xl mx-auto text-sm font-medium">
        {/* left side */}
        <div className="flex gap-10">
          <NavLink className="hover:text-orange-400 transition" to="/">
            home
          </NavLink>
          <NavLink className="hover:text-orange-400 transition" to="/profile">
            profile
          </NavLink>

          {user && (
            <NavLink className="hover:text-orange-400 transition" to="/modules">
              modules
            </NavLink>
          )}

          {!user && (
            <NavLink className="hover:text-orange-400 transition" to="/modules">
              modules
            </NavLink>
          )}
        </div>

        {/* right side — logout */}
        {user && (
          <button
            onClick={logOut}
            className="px-4 py-1.5 rounded-full bg-orange-500 text-slate-900 font-semibold hover:bg-orange-400 transition"
          >
            logout
          </button>
        )}
      </div>
    </nav>
  );
}
