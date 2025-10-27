import React, { useEffect, useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import "../AuthForms.css";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const { state, dispatch } = useAuth();
  const navigate = useNavigate()

  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if(state.message === "Successfully logged in as admin" ||
      state.message === "Successfully logged in as user"
    ){
      navigate("/")
    }
  }, [state.message])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    dispatch({
      type: "LOGIN",
      email,
      password,
    });
  };

  return (
    <div className="auth-page-wrapper">
      <div className="auth-card">
        <h2 className="auth-title">Welcome back</h2>
        <p className="auth-sub">Log in as admin or user.</p>

        <form onSubmit={handleSubmit} className="auth-form">
          <label className="auth-label">
            Email
            <input
              className="auth-input"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </label>

          <label className="auth-label">
            Password
            <input
              className="auth-input"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </label>

          <button type="submit" className="auth-button">
            Log in
          </button>
        </form>

        {state.message && (
          <div className="auth-message">{state.message}</div>
        )}

        <div className="auth-alt-link">
          Don't have an account? <a href="/register">Sign up</a>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
