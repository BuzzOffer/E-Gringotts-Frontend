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
            currencyCount[currency]++;
        }
    });

    const data = {
        labels: ["Galleon", "Sickle", "Knut"],
        datasets: [
          {
            label: '# of Votes',
            data: Object.values(currencyCount),
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
            ],
            borderWidth: 1,
          },
        ],
    };

    return (
        <Pie data={data}/>
    );
}