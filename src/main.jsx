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
import firebaseConfig from './firebase.config.js';
import Homepage from './page/Homepage.jsx';
import Rootlayout from './components/Rootlayout.jsx';
import LoginData from './components/LoginData.jsx';

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
   {
    path: "/homepage",
      element : <Rootlayout />,
       children: [
      {
        index: true,
        element: <Homepage /> 
      },
       ]
  },
      
      
    
  
]);

createRoot(document.getElementById('root')).render(
 <LoginData>
 <RouterProvider router={router} />
 </LoginData>
)
