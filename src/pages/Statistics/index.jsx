import { Chart as ChartJS } from 'chart.js/auto'
import { Line, Pie, Bar } from "react-chartjs-2";
import './stats.css';
import expensesData from './data/expensesData.json';
import GraphSelect from './graphselect';
import BackButton from './backbutton';

export default function Statistics() {
    return (
        <>
            <h1>Statistics</h1>
            <BackButton />
            <GraphSelect />
            <div className="visuals">
                <div className="pieChart">
                    <Pie 
                        data={{
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
                        }}
                    />
                </div>
                <div className="barChart">
                    <Bar 
                        data={{
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
                        }}
                    />
                </div>
            </div>
        </>
    );
}