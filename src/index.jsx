import React from 'react';
import ReactDOM from 'react-dom/client'; 
import { RouterProvider, createBrowserRouter, } from 'react-router-dom';
import Login from "./components/Login"
import UpdatePassword from "./components/UpdatePassword"
import GenerateOtp from "./components/GenerateOtp"
import { UserIdProvider } from './store/user-auth';
import Home from './components/Home';


const router=createBrowserRouter([

    {
      path:"/",
      element:<Login/>
    },

    {
        path:"/forget-password",
        element:<UpdatePassword/>
    },

    {
      path:"/generate-otp",
      element:<GenerateOtp/>
    },

    {
        path:"/dashboard",
        element:<Home/>
    },


]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserIdProvider>
    <RouterProvider router={router}/>

    </UserIdProvider>
  
    
  </React.StrictMode>
);


