import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SiGoogle } from 'react-icons/si';
import { FiArrowLeft } from 'react-icons/fi';
import { motion } from 'framer-motion';
import axios from 'axios';
import { twMerge } from 'tailwind-merge';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase/firebase'; // Adjust the path if needed

export const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  
  const provider = new GoogleAuthProvider();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/auth/login", { username, password });
      console.log(response); // Check the response
      if (response.data.token) {
        localStorage.setItem("username", username);
        localStorage.setItem("loggedIn", "true");
        navigate("/home");
      }
    } catch (err) {
      setError("Invalid username or password");
      console.error(err);
    }
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:3001/auth/register", { username, password });
      setUsername("");
      setPassword("");
      alert("Registration complete! Now login.");
      setIsLogin(true); // Switch to login form after registration
    } catch (err) {
      setError("Username already exists. Use a different username");
      console.error(err);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      localStorage.setItem("username", user.displayName);
      localStorage.setItem("loggedIn", "true");
      navigate("/home");
    } catch (error) {
      setError("Google login failed");
      console.error(error);
    }
  };

  return (
    <div className="bg-zinc-950 py-20 text-zinc-200 selection:bg-zinc-600">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.25, ease: "easeInOut" }}
        className="relative z-10 mx-auto w-full max-w-xl p-4"
      >
        <Heading isLogin={isLogin} setIsLogin={setIsLogin} />
        <SocialOptions handleGoogleLogin={handleGoogleLogin} />
        <Or />
        {isLogin ? (
          <Form
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            label="Login"
            onSubmit={handleLogin}
            error={error}
          />
        ) : (
          <Form
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            label="Register"
            onSubmit={handleRegister}
            error={error}
          />
        )}
        <Terms />
      </motion.div>

      <CornerGrid />
    </div>
  );
};

const Heading = ({ isLogin, setIsLogin }) => (
  <div>
    <div className="mb-9 mt-6 space-y-1.5">
      <h1 className="text-2xl font-semibold">{isLogin ? "Sign in to your account" : "Create your account"}</h1>
      <p className="text-zinc-400">
        {isLogin ? (
          <>
            Don't have an account?{" "}
            <button onClick={() => setIsLogin(false)} className="text-blue-400">
              Create one.
            </button>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <button onClick={() => setIsLogin(true)} className="text-blue-400">
              Sign in.
            </button>
          </>
        )}
      </p>
    </div>
  </div>
);

const SocialOptions = ({ handleGoogleLogin }) => (
  <div>
    <div className="mb-3 flex gap-3">
      <BubbleButton className="flex w-full justify-center py-3" onClick={handleGoogleLogin}>
        <SiGoogle />
      </BubbleButton>
    </div>
  </div>
);

const Or = () => (
  <div className="my-6 flex items-center gap-3">
    <div className="h-[1px] w-full bg-zinc-700" />
    <span className="text-zinc-400">OR</span>
    <div className="h-[1px] w-full bg-zinc-700" />
  </div>
);

const Form = ({ username, setUsername, password, setPassword, label, onSubmit, error }) => (
  <form onSubmit={onSubmit}>
    {error && <p className="error">{error}</p>}
    <div className="mb-3">
      <label htmlFor="username" className="mb-1.5 block text-zinc-400">
        Username
      </label>
      <input
        id="username"
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 placeholder-zinc-500 ring-1 ring-transparent transition-shadow focus:outline-0 focus:ring-blue-700"
      />
    </div>
    <div className="mb-6">
      <div className="mb-1.5 flex items-end justify-between">
        <label htmlFor="password" className="block text-zinc-400">
          Password
        </label>
        {label === "Login" && <a href="#" className="text-sm text-blue-400">Forgot?</a>}
      </div>
      <input
        id="password"
        type="password"
        placeholder="••••••••••••"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 placeholder-zinc-500 ring-1 ring-transparent transition-shadow focus:outline-0 focus:ring-blue-700"
      />
    </div>
    <SplashButton type="submit" className="w-full">
      {label}
    </SplashButton>
  </form>
);

const Terms = () => (
  <p className="mt-9 text-xs text-zinc-400">
    By signing in or registering, you agree to our{" "}
    <a href="#" className="text-blue-400">
      Terms & Conditions
    </a>{" "}
    and{" "}
    <a href="#" className="text-blue-400">
      Privacy Policy.
    </a>
  </p>
);

const SplashButton = ({ children, className, ...rest }) => {
  return (
    <button
      className={twMerge(
        "rounded-md bg-gradient-to-br from-blue-400 to-blue-700 px-4 py-2 text-lg text-zinc-50 ring-2 ring-blue-500/50 ring-offset-2 ring-offset-zinc-950 transition-all hover:scale-[1.02] hover:ring-transparent active:scale-[0.98] active:ring-blue-500/70",
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

const BubbleButton = ({ children, className, ...rest }) => {
  return (
    <button
      className={twMerge(
        `
        relative z-0 flex items-center gap-2 overflow-hidden whitespace-nowrap rounded-md 
        border border-zinc-700 bg-gradient-to-br from-zinc-800 to-zinc-950
        px-3 py-1.5
        text-zinc-50 transition-all duration-300
        
        before:absolute before:inset-0
        before:-z-10 before:translate-y-[200%]
        before:scale-[2.5]
        before:rounded-[100%] before:bg-zinc-100
        before:transition-transform before:duration-500
        before:content-[""]

        hover:scale-105 hover:text-zinc-900
        hover:before:translate-y-[0%]
        active:scale-100`,
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

const CornerGrid = () => {
  return (
    <div
      style={{
        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke-width='2' stroke='rgb(30 58 138 / 0.5)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e")`,
      }}
      className="absolute right-0 top-0 z-0 size-[50vw]"
    >
      <div
        style={{
          backgroundImage:
            "radial-gradient(100% 100% at 100% 0%, rgba(9,9,11,0), rgba(9,9,11,1))",
        }}
        className="absolute inset-0"
      />
    </div>
  );
};