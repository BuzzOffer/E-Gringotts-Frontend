function BalanceGalleon() {
    let balance = 2000.00
    return (
        <div className="balGalleon" id="balance">
            <h3>Galleon</h3>
            <h1>{balance.toFixed(2)}</h1>
        </div>
    );
}

export default BalanceGalleon