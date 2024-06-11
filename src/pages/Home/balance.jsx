

function Balance({ userInfo }) {
    const balances = [
        {currency: "Galleon", balance: userInfo.galleon_balance},
        {currency: "Sickle", balance: userInfo.sickle_balance},
        {currency: "Knut", balance: userInfo.knut_balance},
    ];

    return (
        <div className="balanceButtons">
            {balances.map((item) => (
                <button id="balance" key={item.currency}>
                    <h1 id="amountLabel">{item?.balance?.toFixed(2)}</h1>
                    <h3 id="currencyLabel">{item.currency}</h3>
                </button>
            ))}
        </div>
    );
}

export default Balance