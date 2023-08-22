import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Home from "./pages/Home/Home"
import Product from "./pages/Product/Product"
import Products from "./pages/Products/Products"
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import "./app.scss";

const Layout = () => {
  return (
  <div className="app">
    <Navbar />
    <Outlet />                     {/* Basically it represents our diffrent pages, placeholder for rendering child routes inside the parent component. */}
    <Footer />
  </div>
  );
}

const router = createBrowserRouter([
  {
    path:"/",
    element:<Layout />,
    children: [
      {
        path:"/",
        element:<Home />
      },
      {
        path:"/product/:id",
        element:<Product />
      },
      {
        path:"/products/:id",
        element:<Products />
      }
    ]
  }
]);

function App() {
  return <div>
    <RouterProvider router={router} />
  </div>
}

export default App;