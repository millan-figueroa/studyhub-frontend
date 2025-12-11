import { NavLink } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const auth = useAuth();
  const navigate = useNavigate();

  // minimal navbar if auth not ready
  if (!auth) {
    return (
      <nav className="bg-slate-900 border-b border-slate-700 text-slate-100 px-6 py-4">
        <div className="max-w-4xl mx-auto flex justify-center gap-12 text-sm font-medium">
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

  const { logOut } = auth;

  return (
    <nav className="bg-slate-900 border-b border-slate-700 text-slate-100 px-6 py-4">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        {/* centered links */}
        <div className="flex-1 flex justify-center gap-12 text-sm font-medium">
          <NavLink className="hover:text-orange-400 transition" to="/">
            home
          </NavLink>
          <NavLink className="hover:text-orange-400 transition" to="/profile">
            profile
          </NavLink>
          <NavLink className="hover:text-orange-400 transition" to="/library">
            Anki Library
          </NavLink>
          <NavLink className="hover:text-orange-400 transition" to="/modules">
            modules
          </NavLink>
        </div>

        {/* logout all the way on the right */}
        <button
          onClick={() => {
            logOut();
            navigate("/");
          }}
          className="ml-auto px-3 py-1 rounded-full bg-orange-500 text-slate-900 font-semibold hover:bg-orange-400 transition text-xs"
        >
          logout
        </button>
      </div>
    </nav>
  );
}
