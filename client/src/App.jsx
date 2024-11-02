import * as React from "react";

import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from "react-router-dom";
import Register from "./pages/Register";

import Home from "./pages/Home";
import Write from "./pages/Write";
import Single from "./pages/Single";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import "./styles/index.css"
import SocialMediaIcons from "./components/SocialMedia";
const Layout=()=> {
  return (
    <>
    <Navbar/>
    <Outlet/>
  
    </>
  )
}
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children: [
      {
        path:"/",
        element:<Home/>
      },
      {
        path:"/post/:id",
        element:<Single/>
      },
      {
        path:"/write",
        element:<Write/>
      },
    ]
      
  },
  {
    path: "/register",
    element: <Register/>
  },
  {
    path: "/login",
    element: <Login/>

  },
  {
path:"/home",
element:<Home/>
  },
  {
    path:"/write",
    element:<Write/>
  },
  {
    path:"/single",
    element:<Single/>
  }
]);

function App() {
  return (<>
  <div className="app">
    <div className="container">
    <RouterProvider router={router}/>
    </div>
    </div>
    <Footer/>
    <SocialMediaIcons/>
    </>
  );
}



export default App;
