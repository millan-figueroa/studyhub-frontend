import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";

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
  const handleLogin = async () => {
    try {
      // clear any old error message
      setError("");
      setLoading(true);

      // api call here to login the user
      await auth?.logIn(email, password);
      navigate("/modules");

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      // log error to dev tools
      console.error(error.message);
      setError(error.message);
    } finally {
      // turn off loading so button is clickable again
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-sm flex flex-col gap-4 p-6 border rounded-md shadow">
        <h1 className="text-center text-xl font-bold">Track your studies!</h1>
        {error && (
          <div className="text-red-500 text-sm text-center">{error}</div>
        )}

        {/* if user is in register mode show register form. otherwise show login */}
        {showRegister ? (
          <form onSubmit={handleRegister} className="flex flex-col gap-3">
            <div className="text-center font-semibold">Register</div>

            {/* username input field */}
            <label htmlFor="username" className="flex flex-col text-sm">
              Username:
              <input
                type="text"
                name="username"
                // using the state value
                value={username}
                // update state when user types
                onChange={(e) => setUsername(e.target.value)}
                className="border p-1 rounded"
              />
            </label>

            {/* email input */}
            <label htmlFor="email" className="flex flex-col text-sm">
              Email:
              <input
                type="text"
                name="email"
                value={email}
                // update state on typing
                onChange={(e) => setEmail(e.target.value)}
                className="border p-1 rounded"
              />
            </label>

            {/* password input */}
            <label htmlFor="password" className="flex flex-col text-sm">
              Password:
              <input
                type="password"
                name="password"
                value={password}
                // update state while typing
                onChange={(e) => setPassword(e.target.value)}
                className="border p-1 rounded"
              />
            </label>

            {/* submit button to register user */}
            <input
              type="submit"
              value="Register"
              className="bg-violet-500 text-white p-2 rounded cursor-pointer"
            />

            {/* show loading indicator while waiting for api */}
            {loading && <div className="text-center">...</div>}
          </form>
        ) : (
          <form onSubmit={handleLogin} className="flex flex-col gap-3">
            {/* title text so user knows this is login */}
            <div className="text-center font-semibold">login</div>

            {/* email input */}
            <label htmlFor="email" className="flex flex-col text-sm">
              Email:
              <input
                type="text"
                name="email"
                value={email}
                // update value on typing
                onChange={(e) => setEmail(e.target.value)}
                className="border p-1 rounded"
              />
            </label>

            {/* password input */}
            <label htmlFor="password" className="flex flex-col text-sm">
              Password:
              <input
                type="password"
                name="password"
                value={password}
                // update as user types
                onChange={(e) => setPassword(e.target.value)}
                className="border p-1 rounded"
              />
            </label>

            {/* submit login button */}
            <input
              type="submit"
              value="login"
              className="bg-violet-500 text-white p-2 rounded cursor-pointer"
            />

            {/* loading indicator while api call is happening */}
            {loading && <div className="text-center">...</div>}
          </form>
        )}

        {/* toggle between login and register */}
        {showRegister ? (
          <div className="text-center text-sm">
            login to your account{" "}
            <span
              className="text-violet-600 cursor-pointer"
              // when user clicks this switch to login form
              onClick={() => setShowRegister(false)}
            >
              sign in
            </span>
          </div>
        ) : (
          <div className="text-center text-sm">
            no account?{" "}
            <span
              className="text-violet-600 cursor-pointer"
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
