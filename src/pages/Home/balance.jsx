const balances = [
    {currency: "Galleon", balance: 2000},
    {currency: "Sickle", balance: 1000},
    {currency: "Knut", balance: 500},
]

function Balance() {

    return (
        <div>
            {balances.map((item) => (
                <button id="balance" key={item.currency}>
                    <h3 id="currencyLabel">{item.currency}</h3>
                    <h1 id="amountLabel">{item.balance.toFixed(2)}</h1>
                </button>
            ))}

        </div>
    );
}

export default Balance