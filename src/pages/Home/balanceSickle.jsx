function BalanceSickle() {
    let balance = 1000.00
    return (
        <div>
            <button className="balSickle" id="balance">
                <h3 id="currencyLabel">Sickle</h3>
                <h1 id="amountLabel">{balance.toFixed(2)}</h1>
            </button>
        </div>
    );
}

export default BalanceSickle