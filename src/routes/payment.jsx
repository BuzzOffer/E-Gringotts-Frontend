import Payment from '../pages/Payment';
import PaymentConfirm from '../pages/Payment/PaymentConfirm';
import PaymentList from '../pages/Payment/PaymentList/PaymentList';
import PaymentReceipt from '../pages/Payment/PaymentReceipt';
import TransactionForm from '../pages/Payment/NewTransfer/TransactionForm';
import AddAccountScreen from '../pages/Payment/AddNewAccount';

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
    },
    {
      path: 'add-account',
      element: <AddAccountScreen />
    }
  ]
};