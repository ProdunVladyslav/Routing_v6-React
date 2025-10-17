import React from 'react'
import {NavLink} from 'react-router-dom'
import './header.css';

function Header() {
	return (
		<>
			<nav>
				<ul>
					<li><NavLink to="/">Home</NavLink></li>
					<li><NavLink to="/about">About</NavLink></li>
					<li><NavLink to="/contact">Contact</NavLink></li>
				</ul>
			</nav>
		</>
	)
}

export default Header
