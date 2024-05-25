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
    const [data, setData] = useState({});
    useEffect(() => {
        const fetchData = async () => {
            fetch(`http://localhost:8080/api/v1/transaction/getTransaction?property=source_account&value=23`)
            .then(res => {
                return res.json();
            })
            .then(data => {
                console.log(data);
                setData({
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
    })

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
    const monthly = {
        labels: expensesData.map((data) => data.label),
        datasets: [
            {
                label: "Sickle",
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
    const allTime = {
        labels: expensesData.map((data) => data.label),
        datasets: [
            {
                label: "Knut",
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
    
    const updateGraph = (event) => {
        setData(event.target.value);
    }

    return (
        <>
            <h1>Statistics</h1>
            <BackButton />
            <GraphSelect onOption={updateGraph}/>
            <div className="visuals">
                <div className="pieChart">
                    <Pie 
                        data={data}
                    />
                </div>
                <div className="barChart">
                    <Bar 
                        data={data}
                    />
                </div>
            </div>
        </>
    );
}