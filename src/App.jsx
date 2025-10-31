import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import NotFound from './pages/NotFound';
import Contact from './pages/Contact';
import About from './pages/About';
import Layout from './components/Layout';
import ProductList from './components/Header/ProductList/ProductList.tsx';
import ProductInfo from './components/Header/ProductInfo/ProductInfo';

import LoginPage from './components/AuthForms/LoginPage/LoginPage';
import RegisterPage from './components/AuthForms/RegisterPage/RegisterPage';
import ProtectedRoute from './helpers/ProtectedRoute';
import AdminPage from './pages/AdminPage/AdminPage';
import { GoodsProvider } from './contexts/GoodContext';
import { AuthProvider } from './contexts/AuthContext.tsx';
import { CartProvider } from './contexts/CartContext.tsx';
import CartPage from './pages/CartPage/CartPage.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />, // <-- Layout wraps everything, including login/register
    children: [
      // Public routes
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/register',
        element: <RegisterPage />,
      },

      // Protected routes
      {
        path: '/',
        element: (
          <ProtectedRoute>
            <ProductList />
          </ProtectedRoute>
        ),
      },
      {
        path: '/about',
        element: (
          <ProtectedRoute>
            <About />
          </ProtectedRoute>
        ),
      },
      {
        path: '/contact',
        element: (
          <ProtectedRoute>
            <Contact />
          </ProtectedRoute>
        ),
      },
	  {
        path: '/admin-page',
        element: (
          <ProtectedRoute adminEnabled>
			<AdminPage/>
          </ProtectedRoute>
        ),
      },
      {
        path: '/product/:id',
        element: (
          <ProtectedRoute>
            <ProductInfo />
          </ProtectedRoute>
        ),
      },
      {
        path: '/cart',
        element: (
          <ProtectedRoute>
            <CartPage />
          </ProtectedRoute>
        ),
      },

      // Fallback
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);

function App() {
  return (
    <AuthProvider>
      <GoodsProvider>
        <CartProvider>
          <RouterProvider router={router} />
        </CartProvider>
      </GoodsProvider>
    </AuthProvider>
  );
}

export default App;
