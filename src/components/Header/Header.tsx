import React from "react";
import { NavLink } from "react-router-dom";
import "./header.css";
import { useAuth } from "../../contexts/AuthContext"

function Header() {
  const { state, dispatch } = useAuth();
  const user = state.loggedInUser;

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <>
		{user?(
			<nav>
				<ul className="nav-links">
					<li><NavLink to="/">Home</NavLink></li>
					<li><NavLink to="/about">About</NavLink></li>
					<li><NavLink to="/contact">Contact</NavLink></li>
					{user.isAdmin ? <li><NavLink to="/admin-page">Admin Page</NavLink></li>:""}
				</ul>

				<div className="nav-footer">
					{user ? (
					<>
						<p className="username">{user.username}</p>
						<button className="logout-btn" onClick={handleLogout}>
						Log out
						</button>
					</>
					) : (
					<p className="username">Not logged in</p>
					)}
				</div>
			</nav>
			):""}
    </>
  );
}

export default Header;
