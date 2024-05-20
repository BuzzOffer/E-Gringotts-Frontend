
function GraphSelect() {
    return (
        <div>
            <select name="time" className="dropDown">
                <option value="Daily">Daily</option>
                <option value="Monthly">Monthly</option>
                <option value="All Time">All Time</option>
            </select>
        </div>
    )
}

export default GraphSelect;