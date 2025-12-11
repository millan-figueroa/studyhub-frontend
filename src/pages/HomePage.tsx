import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

function HomePage() {
  const { user } = useContext(AuthContext) || {};

  // not logged in → landing page
  if (!user) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-slate-900 px-4">
        <div className="max-w-lg w-full bg-slate-800/80 rounded-2xl shadow-2xl p-8 text-slate-100">
          <h1 className="text-3xl font-bold mb-2">StudyHub</h1>
          <p className="text-slate-400 mb-6">
            plan your modules, track your tasks, and stay organized without
            fighting your tools.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              to="/auth"
              state={{ mode: "login" }}
              className="px-6 py-2 rounded-full bg-orange-400 text-slate-900 font-semibold hover:bg-orange-300 transition"
            >
              login
            </Link>

            <Link
              to="/auth"
              state={{ mode: "register" }}
              className="px-6 py-2 rounded-full border border-slate-500 text-slate-100 hover:bg-slate-700 transition"
            >
              create account
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // logged in → dashboard
  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-slate-900 px-4">
      <div className="max-w-2xl w-full bg-slate-800/80 rounded-2xl shadow-2xl p-8 text-slate-100">
        <h1 className="text-3xl font-bold mb-2">
          welcome back{user.username ? `, ${user.username}` : ""} 👋
        </h1>
        <p className="text-slate-400 mb-6">
          jump into your study modules, add new tasks, and move your work from
          “todo” to “done”.
        </p>

        {/* stats placeholders */}
        <div className="flex gap-4 flex-wrap mb-6">
          <div className="flex-1 min-w-[130px] bg-slate-900 border border-slate-700 rounded-xl p-4">
            <p className="text-xs text-slate-400">modules</p>
            <p className="text-xl font-semibold">—</p>
          </div>

          <div className="flex-1 min-w-[130px] bg-slate-900 border border-slate-700 rounded-xl p-4">
            <p className="text-xs text-slate-400">tasks today</p>
            <p className="text-xl font-semibold">—</p>
          </div>
        </div>

        <div className="flex gap-4 flex-wrap">
          <Link
            to="/modules"
            className="px-6 py-2 rounded-full bg-sky-400 text-slate-900 font-semibold hover:bg-sky-300 transition"
          >
            view modules
          </Link>

          <Link
            to="/modules"
            className="px-6 py-2 rounded-full border border-slate-500 text-slate-100 hover:bg-slate-700 transition"
          >
            add new module
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
