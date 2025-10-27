import React, { useEffect, useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import "../AuthForms.css";
import { useNavigate, NavLink } from "react-router-dom";

function RegisterPage() {
  const { state, dispatch } = useAuth();
  const navigate = useNavigate(); 

  const [username, setUsername] = useState("");
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin]   = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    dispatch({
      type: "REGISTER",
      user: {
        id: crypto.randomUUID(),
        username,
        email,
        password,
        isAdmin,
      },
    });

  };

  useEffect(() => {
    if (state.message === "Successfully registered") {
      navigate("/login");
    }
  }, [state.message, navigate]);

  return (
    <div className="auth-page-wrapper">
      <div className="auth-card">
        <h2 className="auth-title">Create account</h2>
        <p className="auth-sub">Register as admin or regular user.</p>

        <form onSubmit={handleSubmit} className="auth-form">
          <label className="auth-label">
            Username
            <input
              className="auth-input"
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
            />
          </label>

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

          <label className="auth-checkbox-row">
            <input
              className="auth-checkbox"
              type="checkbox"
              checked={isAdmin}
              onChange={e => setIsAdmin(e.target.checked)}
            />
            <span>Register as admin</span>
          </label>

          <button type="submit" className="auth-button">
            Sign up
          </button>
        </form>

        {state.message && (
          <div className="auth-message">{state.message}</div>
        )}

        <div className="auth-alt-link">
          Already have an account? <a href="/login">Log in</a>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
