
import './App.scss'
import {createBrowserRouter,RouterProvider,Route, Outlet} from 'react-router-dom'
import { useEffect } from 'react';
import Register from "./pages/Register"
import Login from "./pages/Login"
import Home from "./pages/Home"
import Single from "./pages/Single";
import Write from "./pages/Write";
import MyPosts from "./pages/MyPosts"

import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

const Layout=()=>{
  return(
    <>
      <NavBar/>
      <Outlet/>
      <Footer/>
    </>
  )
}
const router=createBrowserRouter([
  {
    path:"/",
    element:<Layout/>,
    children:[
      {
        path:"/post/:id",
        element:<Single/>
      },
      {
        path:"/write",
        element:<Write/>
      },
      {
        path: "/myposts", // Add MyPosts route
        element: <MyPosts />
      },
      {
        path:"/",
        element:<Home/>
      },
      
    ]
  },
  {
    path:"/register",
    element:<Register/>
  },
  {
    path:"/login",
    element:<Login/>
  },
  
  
])
function App() {

  
  return (
    <div className="app">
      <div className="container">
        <RouterProvider router={router}/>
      </div>
    </div>
  )
}

export default App;
