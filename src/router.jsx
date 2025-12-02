import { createBrowserRouter } from "react-router-dom";

/* site import */
import Home from "./pages/Home";
import Needs from "./pages/Needs";
import Products from "./pages/Products";
import About from "./pages/About";
import Cart from "./pages/Cart";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home/>,
    },
    {
        path: "/needs",
        element: <Needs/>,
    },
    {
        path: "/products",
        element: <Products/>,
    },
    {
        path: "/about",
        element: <About/>,
    },
    {
        path: "/cart",
        element: <Cart/>,
    },
])


export default router