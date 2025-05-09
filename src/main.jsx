import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import NotFound from './page/NotFound.jsx';
import Home from './page/Home.jsx';
import Login from './page/Login.jsx';
import Signup from './page/Signup.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },{
    path: "*",
      element : <NotFound />,
  },
  {
    path: "/login",
      element : <Login />,
  },
  {
    path: "/signup",
      element : <Signup />,
  },
      
      
    
  
]);

createRoot(document.getElementById('root')).render(
 <RouterProvider router={router} />
)
