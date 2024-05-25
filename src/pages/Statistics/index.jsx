import { Chart as ChartJS, defaults} from 'chart.js/auto'
import { Line, Pie, Bar } from "react-chartjs-2";
import { useState, useEffect } from 'react';
import './stats.css';
import expensesData from './data/expensesData.json';
import GraphSelect from './graphselect';
import BackButton from './backbutton';

defaults.maintainAspectRatio = false;
defaults.responsive = true;

export default function Statistics() {

    const daily = {
        labels: expensesData.map((data) => data.label),
        datasets: [
            {
                label: "Galleon",
                data: expensesData.map((data) => data.value),
                backgroundColor: [
                "#7e0af2",
                "#0af2e6",
                "#93db0d",
                "#ff5500"
                ]
            },
        ]
    }
    // const monthly = {
    //     labels: expensesData.map((data) => data.label),
    //     datasets: [
    //         {
    //             label: "Sickle",
    //             data: expensesData.map((data) => data.value),
    //             backgroundColor: [
    //             "#7e0af2",
    //             "#0af2e6",
    //             "#93db0d",
    //             "#ff5500"
    //             ]
    //         },
    //     ]
    // }
    // const allTime = {
    //     labels: expensesData.map((data) => data.label),
    //     datasets: [
    //         {
    //             label: "Knut",
    //             data: expensesData.map((data) => data.value),
    //             backgroundColor: [
    //             "#7e0af2",
    //             "#0af2e6",
    //             "#93db0d",
    //             "#ff5500"
    //             ]
    //         },
    //     ]
    // }
    
    // const updateGraph = (event) => {
    //     setChartData(event.target.value);
    // }
    const today = new Date();
    const month = today.getMonth() + 1;
    const day = today.getDate()
    const date = `${today.getFullYear()}-${month < 10 ? `0${month}` : `${month}`}-${day < 10 ? `0${day}` : `${day}`}` 
    const [chartData, setChartData] = useState(daily);
    const [startDate, setStartDate] = useState(`${date} 00:00:00`);
    const [endDate, setEndDate] = useState(`${date} 23:59:59`);
    
    useEffect(() => {
        const fetchData = async () => {
            fetch(`http://localhost:8080/api/v1/transaction/getTransactionByDateTime?start=${startDate}&end=${endDate}`)
            .then(res => {
                return res.json();
            })
            .then(data => {
                console.log(data);
                console.log(startDate);
                console.log(endDate);
                setChartData({
                    labels: data.map((item) => item.category),
                    datasets: [
                        {
                            label: "Funds",
                            data: data.map((item) => item.amount),
                            backgroundColor: [
                                "#7e0af2",
                                "#0af2e6",
                                "#93db0d",
                                "#ff5500"
                            ]
                        }
                    ]
                })
            })
            
        }
        fetchData();
    }, [])

    return (
        <>
            <h1>Statistics</h1>
            <BackButton />
            <GraphSelect/>
            <div className="visuals">
                <div className="pieChart">
                    <Pie 
                        data={chartData}
                    />
                </div>
                <div className="barChart">
                    <Bar 
                        data={chartData}
                    />
                </div>
            </div>
        </>
    );
}