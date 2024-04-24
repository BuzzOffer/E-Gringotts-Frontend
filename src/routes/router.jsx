import { createBrowserRouter } from "react-router-dom";
import Layout from '../components/Layout';
import Home from '../pages/Home';
import Transaction from '../pages/Transaction';
import Payment from '../pages/Payment';
import Login from '../pages/Login';
import Register from '../pages/Register';

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
          {
            path: "/",
            element: <Home />
          },
          {
            path: "/transaction",
            element: <Transaction />,
          },
          {
            path: "/payment",
            element: <Payment />,
          },
          {
            path: "/login",
            element: <Login />,
          },
          {
            path: "/register",
            element: <Register />,
          },
        ],
      }
]);