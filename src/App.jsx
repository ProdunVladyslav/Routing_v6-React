import React from 'react'
import { BrowserRouter as Router, Routes, Route, createBrowserRouter, RouterProvider } from 'react-router-dom'
import NotFound from './pages/NotFound'
import Contact from './pages/Contact'
import About from './pages/About'
import Layout from './components/Layout'
import Home from './pages/Home'
import ProductList from './components/Header/ProductList/ProductList'
import ProductInfo from './components/Header/ProductInfo/ProductInfo'

const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children:[
			{
				path: '/',
				element: <ProductList />
			},
			{
				path: '/about',
				element: <About />
			},
			{
				path: '/contact',
				element: <Contact />
			},
			{
				path: "/product/:id",
				element: <ProductInfo/>
			},
			{
				path: '*',
				element: <NotFound />
			}
		]
	}
])

function App() {
	return (
		<>
			<RouterProvider router={router}/>
		</>
	)
}

export default App
