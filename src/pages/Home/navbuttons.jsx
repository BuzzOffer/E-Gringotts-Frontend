const features = [
    {src: "", label: "View Transactions"},
    {src: "", label: "New Transaction"},
    {src: "", label: "Statistics"},
]

function Navbuttons() {
    return (
        <div className="navButtons">
            {features.map((item) => (
                <button id="navbutton" key={item.label}>
                    <svg></svg>
                    <h3 id="navLabel">{item.label}</h3>
                </button>
            ))}

        </div>
    );
}

export default Navbuttons;