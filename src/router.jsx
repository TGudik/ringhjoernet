import { createBrowserRouter } from "react-router-dom";

/* site import */
import Home from "./pages/Home";
import Needs from "./pages/Needs";
import Products from "./pages/products/Products";
import About from "./pages//about/About";
import Cart from "./pages/cart/Cart";
import App from "./App";
import DealTerms from "./pages/DealTerms";
import CookieTerms from "./pages/CookieTerms";
import Category from "./pages/products/Category";


/* Admin imports */
import AdminLogin from "./pages/admin/adminLogin/AdminLogin";
import AdminRoute from "./components/adminRoute/AdminRoute";
import AdminProducts from "./pages/admin/adminProducts/AdminProducts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "needs",
        element: <Needs />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "handelsbetingelser",
        element: <DealTerms />,
      },
      {
        path: "cookie-og-privatlivspolitik",
        element: <CookieTerms />,
      },
      {
        path: "products/:category",
        element: <Category />,
      },
      {
        path: "admin/login",
        element: <AdminLogin />,
      },
      {
        path: "admin/products", 
        element: 
        <AdminRoute>
          <AdminProducts/>
        </AdminRoute>
      }
    ],
  },
]);

export default router;
