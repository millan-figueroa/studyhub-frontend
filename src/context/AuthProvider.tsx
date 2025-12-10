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
}
