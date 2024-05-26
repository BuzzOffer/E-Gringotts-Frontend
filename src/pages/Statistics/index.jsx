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
    
    // const updateGraph = (event) => {
    //     setChartData(event.target.value);
    // }
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate()
    const yearMonth = `${year}-${month < 10 ? `0${month}` : `${month}`}`
    const date = `${yearMonth}-${day < 10 ? `0${day}` : `${day}`}`
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
  
    const [chartData, setChartData] = useState(daily);
    const [startDate, setStartDate] = useState(`${date} 00:00:00`);
    const [endDate, setEndDate] = useState(`${date} 23:59:59`);
    const getDaily = `getTransactionByDateTime?start=${date} 00:00:00&end=${date} 23:59:59` //will change to get by acc id and by datetime
    const getMonthly = `getTransactionByDateTime?start=${yearMonth}-01 00:00:00&end=${yearMonth}-${lastDayOfMonth} 23:59:59` //will change to get by acc id and by datetime
    const getAll = `all` //will change to get by acc id
    const [condition, setCondition] = useState(getDaily)

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

                const newData = data.filter((object) => object.source_account_id_long === 24);
                const categories = [];
                const amounts = [];

                for (let transactions of newData) {
                    if (!categories.includes(transactions.category)) {
                        categories.push(transactions.category);
                        amounts.push(transactions.amount);
                    }
                    else {
                        var targetIndex = categories.indexOf(transactions.category);
                        amounts[targetIndex] += transactions.amount;
                    }
                }
                
                setChartData({
                    labels: categories,
                    datasets: [
                        {
                            label: "Funds",
                            data: amounts,
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
    }, [condition])

    const onSelect = (event) => {
        switch(event.target.value) {
            case 'daily':
                setCondition(getDaily);
                console.log("Daily!")
                break;
            case 'monthly':
                setCondition(getMonthly);
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