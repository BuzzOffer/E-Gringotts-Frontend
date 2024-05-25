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
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate()
    const yearMonth = `${year}-${month < 10 ? `0${month}` : `${month}`}`
    const date = `${yearMonth}-${day < 10 ? `0${day}` : `${day}`}`

  
    const [chartData, setChartData] = useState(daily);
    const [startDate, setStartDate] = useState(`${date} 00:00:00`);
    const [endDate, setEndDate] = useState(`${date} 23:59:59`);
    const getWithinPeriod = `getTransactionByDateTime?start=${startDate}&end=${endDate}` //will change to get by acc id and by datetime
    const getAll = `all` //will change to get by acc id
    const [condition, setCondition] = useState(getWithinPeriod)

    var lastDayOfMonth;
    if (month === 2) {
        if (year % 4 == 0 && year % 100 != 0 || year % 400 == 0) {
            lastDayOfMonth == 29;
        }
        else {
            lastDayOfMonth == 28;
        }
    }
    else if (month === 4 || month === 6 || month === 9 || month === 11) {
        lastDayOfMonth = 30;
    }
    else {
        lastDayOfMonth = 31;
    }


    
    useEffect(() => {
        const fetchData = async () => {
            fetch(`http://localhost:8080/api/v1/transaction/${condition}`)
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

    const onSelect = (event) => {
        switch(event.target.value) {
            case 'daily':
                setStartDate(`${date} 00:00:00`);
                setEndDate(`${date} 23:59:59`);
                setCondition(getWithinPeriod);
                console.log("Daily!")
                break;
            case 'monthly':
                setStartDate(`${yearMonth}-01 00:00:00`);
                setEndDate(`${yearMonth}-${lastDayOfMonth} 23:59:59`);
                setCondition(getWithinPeriod);
                console.log("Monthly!")
                break;
            case 'allTime':
                setCondition(getAll);
                console.log("All time!")
                break;
        }
    }

    return (
        <>
            <h1>Statistics</h1>
            <BackButton />
            <GraphSelect onOption={onSelect}/>
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