import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header/Header'
import { AuthProvider } from '../contexts/AuthContext'
import { GoodsProvider } from '../contexts/GoodContext'

function Layout() {
	return (
		<>
			<Header/>
			<main>
				<Outlet />
			</main>
			<footer></footer>
		</>
	)
}

export default Layout
