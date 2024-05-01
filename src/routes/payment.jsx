import Payment from '../pages/Payment';
import PaymentConfirm from "../pages/Payment/PaymentConfirm";
import PaymentList from "../pages/Payment/PaymentList";
import PaymentReceipt from "../pages/Payment/PaymentReceipt";

export const PaymentRoute = {
    path: "payment",
    element: <Payment />,
    children:[
      { index: true, element: <PaymentList /> },
      {
        path: "confirmation",
        element: <Payment />,
        children:[
          { index: true, element: <PaymentConfirm /> },
          {
            path: "receipt",
            element: <PaymentReceipt />
          }
        ]
      }
    ]
}