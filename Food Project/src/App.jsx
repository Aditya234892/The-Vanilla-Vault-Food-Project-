// App.js
import { useState } from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout'; // Import Layout
import Home from './components/Home';     // Import Home
import Reviews from './components/Reviews'; // Import Reviews
import Cart from './components/Cart';       // Import Cart
import LoginSignUp from './components/Login&SignUp'; // Import LoginSignUp

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />
        },
        {
          path: "/Reviews",
          element: <Reviews />
        },
        {
          path: "/Cart",
          element: <Cart />
        }
      ]
    },
    {
      path: "/LoginSignUp",
      element: <LoginSignUp />
    }
  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
