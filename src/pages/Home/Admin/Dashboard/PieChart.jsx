import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement);

export default function PieChart({ transactions }) {

    console.log(transactions);
    
    const currencyCount = {
        galleon: 0,
        sickle: 0,
        knut: 0
    };

    transactions.forEach((transaction) => {
        const currency = transaction.sourceCurrency;
        if(currency != null){
            currencyCount[currency.toLowerCase()]++;
        }
    });

    const data = {
        labels: ["Galleon", "Sickle", "Knut"],
        datasets: [
          {
            label: 'No. of transactions',
            data: Object.values(currencyCount),
            backgroundColor: [
              '#DFA616',
              '#6A6A6A',
              '#955C23',
            ],
            borderWidth: 1,
          },
        ],
    };

    return (
        <Pie data={data}/>
    );
}