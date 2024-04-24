const balances = [
    {currency: "Galleon", balance: 2000},
    {currency: "Sickle", balance: 1000},
    {currency: "Knut", balance: 500},
]

function Balance() {

    return (
        <div className="balanceButtons">
            {balances.map((item) => (
                <button id="balance" key={item.currency}>
                    <h1 id="amountLabel">{item.balance.toFixed(2)}</h1>
                    <h3 id="currencyLabel">{item.currency}</h3>
                </button>
            ))}

        </div>
    );
}

export default Balance