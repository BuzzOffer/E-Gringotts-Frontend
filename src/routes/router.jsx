import { createBrowserRouter } from "react-router-dom";
import Layout from '../components/Layout';
import Home from '../pages/Home';
import Transaction from '../pages/Transaction';
import { PaymentRoute } from "./payment";
import Login from '../pages/Login';
import Register from '../pages/Register';
import Statistics from '../pages/Statistics';
import ProtectedRoutes from "./ProtectedRoutes";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
          {
            path: "/",
            element: (
              <ProtectedRoutes>
                <Home />
              </ProtectedRoutes>
            )
          },
          {
            path: "transaction",
            element: <ProtectedRoutes><Transaction /></ProtectedRoutes>,
          },
          PaymentRoute,
          {
            path: "login",
            element: <Login />,
          },
          {
            path: "register",
            element: <Register />,
          },
          {
            path: "statistics",
            element: <ProtectedRoutes><Statistics /></ProtectedRoutes>,
          },
        ],
      }
]);