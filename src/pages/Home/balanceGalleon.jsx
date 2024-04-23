function BalanceGalleon() {
    let balance = 2000.00
    return (
        <div>
            <button className="balGalleon" id="balance">
                <h3 id="currencyLabel">Galleon</h3>
                <h1 id="amountLabel">{balance.toFixed(2)}</h1>
            </button>
        </div>
    );
}

export default BalanceGalleon