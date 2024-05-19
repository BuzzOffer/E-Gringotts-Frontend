import { Line, Pie, Bar } from "react-chartjs-2";

export default function Statistics() {
    return (
        <>
            <h1>Statistics</h1>
            <div id="visuals">
                <div id="lineGraph">
                    <Line></Line>
                </div>
                <div id="pieChart"></div>
                <div id="barChart"></div>
            </div>
        </>
    );
}