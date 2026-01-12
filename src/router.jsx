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
import SignUp from "./pages/signUp/SignUp"
import AdminRoute from "./components/adminRoute/AdminRoute";
import AdminProducts from "./pages/admin/adminProducts/AdminProducts";
import ProductPage from "./pages/productPage/ProductPage";
import Checkout from "./pages/checkout/Checkout";


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
        path: "product/:productId",
        element: <ProductPage />,
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
        path: "checkout",
        element: <Checkout />,
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
        path: "sign-up",
        element: <SignUp />,
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
