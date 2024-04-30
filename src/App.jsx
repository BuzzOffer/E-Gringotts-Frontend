import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Transaction from './pages/Transaction/index.jsx'
import Payment from './pages/Payment/index.jsx'
import Home from './pages/Home/index.jsx'
import Layout from './components/Layout.jsx'
import Login from './pages/Login'
import Register from './pages/Register'

// client side page routing
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
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

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
