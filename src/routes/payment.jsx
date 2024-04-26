import Payment from '../pages/Payment';
import PaymentConfirm from "../pages/Payment/PaymentConfirm";
import PaymentList from "../pages/Payment/PaymentList";

export const PaymentRoute = {
    path: "payment",
    element: <Payment />,
    children:[
      { index: true, element: <PaymentList /> },
      {
        path: "confirmation",
        element: <PaymentConfirm />
      }
    ]
}