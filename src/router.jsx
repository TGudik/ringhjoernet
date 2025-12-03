import { createBrowserRouter } from "react-router-dom";

/* site import */
import Home from "./pages/Home";
import Needs from "./pages/Needs";
import Products from "./pages/products/Products";
import About from "./pages/About";
import Cart from "./pages/cart/Cart";
import App from "./App";
import DealTerms from "./pages/DealTerms";
import CookieTerms from "./pages/CookieTerms";

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
    ],
  },
]);

export default router;
