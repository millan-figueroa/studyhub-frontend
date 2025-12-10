import { useState } from "react";

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

  // >>> REGISTER USER <<<
  const handleRegister = async () => {
    try {
      // clearing out any old error before i try to register again
      setError("");
      // turn loading on so button is disabled and user sees something is happening
      setLoading(true);
      // this is where i will send the register info to my backend api
      // i havent plugged it in yet but the call will go here

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      // printing error in console so i can figure out what went wrong
      console.error(error.message);
      // show the error message on screen for user instead of nothing
      setError(error.message);
    } finally {
      // loading off whether it worked or failed
      setLoading(false);
    }
  };

  // >>> LOGIN USER <<<
  const handleLogin = async () => {
    try {
      // clear any old error message so its not stuck onscreen
      setError("");
      // turning on loading so i can disable button and show spinner so user knows something is happening
      setLoading(true);
      // api call here to login the user
      // i dont know the exact api code yet but i will call my backend here

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      // log error to dev tools so i can see exact issue
      console.error(error.message);
      // show the same error to user on screen so they know what happend
      setError(error.message);
    } finally {
      // turn off loading no matter what so button is clickable again
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Track your studies!</h1>
      {error && <div>{error}</div>}

      {/* if user is in register mode show register form. otherwise show login */}
      {showRegister ? (
        <form onSubmit={handleRegister}>
          <div>register</div>

          {/* username input field */}
          <label htmlFor="username">
            Username:
            <input
              type="text"
              name="username"
              // using the state value
              value={username}
              // update state when user types
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>

          {/* email input */}
          <label htmlFor="email">
            Email:
            <input
              type="text"
              name="email"
              value={email}
              // update state on typing
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          {/* password input */}
          <label htmlFor="password">
            Password:
            <input
              type="password"
              name="password"
              value={password}
              // update state while typing
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          {/* submit button to register user */}
          <input type="submit" value="Register" />

          {/* show loading indicator while waiting for api */}
          {loading && <div>...</div>}
        </form>
      ) : (
        <form onSubmit={handleLogin}>
          {/* title text so user knows this is login */}
          <div>login</div>

          {/* email input */}
          <label htmlFor="email">
            Email:
            <input
              type="text"
              name="email"
              value={email}
              // update value on typing
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          {/* password input */}
          <label htmlFor="password">
            Password:
            <input
              type="password"
              name="password"
              value={password}
              // update as user types
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          {/* submit login button */}
          <input type="submit" value="Register" />

          {/* loading indicator while api call is happening */}
          {loading && <div>...</div>}
        </form>
      )}

      {/* toggle between login and register */}
      {showRegister ? (
        <div>
          login to your account
          <span
            // when user clicks this switch to login form
            onClick={() => setShowRegister(false)}
          >
            sign in
          </span>
        </div>
      ) : (
        <div>
          no account?
          <span
            // when user clicks this switch to register form
            onClick={() => setShowRegister(true)}
          >
            sign up
          </span>
        </div>
      )}
    </div>
  );
}

export default AuthPage;
