import { Line } from "react-chartjs-2";

function LineGraph() {
    return (
        <div className="lineGraph">
            <Line 
                data={{
                    labels: expensesData.map((data) => data.label),
                    datasets: [
                        {
                            label: "Galleon",
                            data: expensesData.map((data) => data.value),
                            backgroundColor: "#DFA616",
                            borderColor: "#DFA616",
                        },
                    ], 
                }}
            />
        </div>
    )
}

export default LineGraph