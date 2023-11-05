import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/style.css";

export const Auth = () => {
  return (
    <div className="auth">
      <Login />
      <Register />
    </div>
  );
};

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/auth/login", {
        username,
        password,
      });

      if (response.data.token) {
        localStorage.setItem("username",username);
        localStorage.setItem("loggedIn","true")
        navigate("/home");
      }
    } catch (err) {
        setError("Invalid username or password");
        console.error(err);
    }
  };

  return (
    <Form
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      label="Login"
      onSubmit={handleLogin}
      error={error}
    />
  );
};

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:3001/auth/register", {
        username,
        password,
      });

      setUsername("");
      setPassword("");
      alert("Registration complete! Now login.");
    } catch (err) {
      setError("Username already exists. Use a different username");
      console.error(err);
    }
  };

  return (
    <Form
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      label="Register"
      onSubmit={onSubmit}
      error={error}
    />
  );
};

const Form = ({ username, setUsername, password, setPassword, label, onSubmit, error }) => {
  return (
    <div className="auth-container">
      <form onSubmit={onSubmit}>
        <h2>{label}</h2>
        {error && <p className="error">{error}</p>}
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button className="three-d-button" type="submit">{label}</button>
      </form>
    </div>
  );
};

export default Auth;
