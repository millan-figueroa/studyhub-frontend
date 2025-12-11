import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthProvider";
import { useNavigate, useSearchParams } from "react-router-dom";

function AuthPage() {
  // storing value user types in the username and email input
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  // storing password they type when login/register
  const [showRegister, setShowRegister] = useState(true);
  const [password, setPassword] = useState("");

  // if something goes wrong this shows up to user
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode");

  useEffect(() => {
    if (mode === "login") setShowRegister(false);
    if (mode === "register") setShowRegister(true);
  }, [mode]);

  // grabbing auth functions from context
  const auth = useContext(AuthContext);

  // redirect user after login/register
  const navigate = useNavigate();

  // >>> REGISTER USER <<<
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // clearing out any old error
      setError("");
      // turn loading on so button is disabled and user sees something is happening
      setLoading(true);

      // send the register info to backend api
      await auth?.register(username, email, password);
      navigate("/modules");

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      // printing error in console
      console.error(error.message);
      setError(error.message);
    } finally {
      // loading off whether it worked or failed
      setLoading(false);
    }
  };

  // >>> LOGIN USER <<<
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);

      await auth?.logIn(email, password);

      // redirect to homepage after login
      navigate("/");
    } catch (error: any) {
      console.error(error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-slate-900 px-4">
      <div className="w-full max-w-md bg-slate-800/80 border border-slate-700 rounded-2xl shadow-2xl p-8 text-slate-100">
        <h1 className="text-center text-2xl font-bold mb-2">
          track your studies
        </h1>
        <p className="text-center text-sm text-slate-400 mb-4">
          create modules, add tasks, and keep your study plan in one place.
        </p>

        {error && (
          <div className="mb-4 text-red-400 text-sm text-center bg-red-950/40 border border-red-500/40 rounded-md px-3 py-2">
            {error}
          </div>
        )}

        {/* if user is in register mode show register form. otherwise show login */}
        {showRegister ? (
          <form onSubmit={handleRegister} className="flex flex-col gap-4">
            <div className="text-center font-semibold text-slate-200"></div>

            {/* username input field */}
            <label htmlFor="username" className="flex flex-col text-sm gap-1">
              <span className="text-slate-300">username</span>
              <input
                type="text"
                name="username"
                // using the state value
                value={username}
                // update state when user types
                onChange={(e) => setUsername(e.target.value)}
                className="bg-slate-900/80 border border-slate-600 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
              />
            </label>

            {/* email input */}
            <label htmlFor="email" className="flex flex-col text-sm gap-1">
              <span className="text-slate-300">email</span>
              <input
                type="text"
                name="email"
                value={email}
                // update state on typing
                onChange={(e) => setEmail(e.target.value)}
                className="bg-slate-900/80 border border-slate-600 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
              />
            </label>

            {/* password input */}
            <label htmlFor="password" className="flex flex-col text-sm gap-1">
              <span className="text-slate-300">password</span>
              <input
                type="password"
                name="password"
                value={password}
                // update state while typing
                onChange={(e) => setPassword(e.target.value)}
                className="bg-slate-900/80 border border-slate-600 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
              />
            </label>

            {/* submit button to register user */}
            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full bg-orange-400 text-slate-900 font-semibold py-2.5 rounded-full hover:bg-orange-300 disabled:opacity-60 disabled:cursor-not-allowed transition"
            >
              {loading ? "creating account..." : "register"}
            </button>

            {/* show loading indicator while waiting for api */}
            {loading && (
              <div className="text-center text-xs text-slate-400">...</div>
            )}
          </form>
        ) : (
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            {/* title text so user knows this is login */}
            <div className="text-center font-semibold text-slate-200">
              login
            </div>

            {/* email input */}
            <label htmlFor="email" className="flex flex-col text-sm gap-1">
              <span className="text-slate-300">email</span>
              <input
                type="text"
                name="email"
                value={email}
                // update value on typing
                onChange={(e) => setEmail(e.target.value)}
                className="bg-slate-900/80 border border-slate-600 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
              />
            </label>

            {/* password input */}
            <label htmlFor="password" className="flex flex-col text-sm gap-1">
              <span className="text-slate-300">password</span>
              <input
                type="password"
                name="password"
                value={password}
                // update as user types
                onChange={(e) => setPassword(e.target.value)}
                className="bg-slate-900/80 border border-slate-600 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
              />
            </label>

            {/* submit login button */}
            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full bg-orange-400 text-slate-900 font-semibold py-2.5 rounded-full hover:bg-orange-300 disabled:opacity-60 disabled:cursor-not-allowed transition"
            >
              {loading ? "logging in..." : "login"}
            </button>

            {/* loading indicator while api call is happening */}
            {loading && (
              <div className="text-center text-xs text-slate-400">...</div>
            )}
          </form>
        )}

        {/* toggle between login and register */}
        {showRegister ? (
          <div className="mt-6 text-center text-sm text-slate-400">
            already have an account?{" "}
            <span
              className="text-orange-400 cursor-pointer hover:underline"
              // when user clicks this switch to login form
              onClick={() => setShowRegister(false)}
            ></span>
          </div>
        ) : (
          <div className="mt-6 text-center text-sm text-slate-400">
            no account?{" "}
            <span
              className="text-orange-400 cursor-pointer hover:underline"
              // when user clicks this switch to register form
              onClick={() => setShowRegister(true)}
            >
              sign up
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default AuthPage;
