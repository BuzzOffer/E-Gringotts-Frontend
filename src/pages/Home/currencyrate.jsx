function currencyRate({fc, tc, amt, newAmt}) {
    return (
        <div className="currencyRate">
            <h3 id="fromValue">{Number(amt).toFixed(2)} {fc} = </h3>
            <h1 id="toValue">{Number(newAmt).toFixed(2)} {tc}</h1>
        </div>
    );
}

export default currencyRate