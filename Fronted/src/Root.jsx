import React, { useState, useEffect } from 'react';
import App from './App.jsx';
import RouteData from './Routers/RouteData';
import ErrorPage from './Routers/ErrorPage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

export default function Root() {
  const [resultado, setResultado] = useState([]);
  const fetchProdutos = async () => {
    try {
      const res = await fetch('http://localhost:3000');
      if (!res.ok) throw new Error('Erro ao obter produtos');
      const data = await res.json();
      setResultado(data);
    } catch (error) {
      console.error('Erro em fetchProdutos:', error);
    }
  };
  useEffect(() => { fetchProdutos(); }, []);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <App resultado={resultado} setResultado={setResultado} fetchProdutos={fetchProdutos} />,
      errorElement: <ErrorPage />,
    },
    {
      path: '/modificar/:id',
      element: <RouteData resultado={resultado} setResultado={setResultado} fetchProdutos={fetchProdutos} />,
    },
  ]);

  return <RouterProvider router={router} />;
}
