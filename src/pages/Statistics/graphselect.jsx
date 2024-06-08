
function GraphSelect({onOption}) {
    return (
            <select name="time" className="dropDown" onChange={onOption}>
                <option value="daily">Daily</option>
                <option value="monthly">Monthly</option>
                <option value="allTime">All Time</option>
            </select>
    )
}

export default GraphSelect;