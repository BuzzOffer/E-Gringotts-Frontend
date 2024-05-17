import Payment from '../pages/Payment';
import PaymentConfirm from '../pages/Payment/PaymentConfirm';
import PaymentList from '../pages/Payment/PaymentList/PaymentList';
import PaymentReceipt from '../pages/Payment/PaymentReceipt';
import TransactionForm from '../pages/Payment/NewTransfer/TransactionForm'

export const PaymentRoute = {
  path: 'payment',
  element: <Payment />,
  children: [
    { index: true, element: <PaymentList /> },
    {
      path: 'confirmation',
      element: <Payment />,
      children: [
        { index: true, element: <PaymentConfirm /> },
        {
          path: 'receipt',
          element: <PaymentReceipt />
        }
      ]
    }, 
    {
      path: 'new-transfer',
      element: <TransactionForm />
    }
  ]
};