
function GraphSelect({onOption}) {
    return (
        <div>
            <select name="time" className="dropDown" onChange={onOption}>
                <option value="daily">Daily</option>
                <option value="monthly">Monthly</option>
                <option value="allTime">All Time</option>
            </select>
        </div>
    )
}

export default GraphSelect;