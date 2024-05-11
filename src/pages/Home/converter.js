export let fromCurrency;
export let toCurrency;
export let amount;
export let convertedAmount;
let fromValue = document.getElementById("fromValue");
let toValue = document.getElementById("toValue");

export function convert() {
    fromCurrency = document.querySelector("#fromCurrency").value;
    toCurrency = document.querySelector("#toCurrency").value;
    amount = document.getElementById("amount").value;
    convertedAmount = amount;
    switch (fromCurrency) {
        case "Galleon":
            switch (toCurrency) {
                case "Sickle":
                    convertedAmount = amount * 17;
                    break;
                case "Knut":
                    convertedAmount = amount * 493;
                    break;
            }
            break;
        case "Sickle":
            switch(toCurrency) {
                case "Galleon":
                    convertedAmount = amount * 0.05882;
                    break;
                case "Knut":
                    convertedAmount = amount * 29;
                    break;
            }
            break;
        case "Knut":
            switch(toCurrency) {
                case "Galleon":
                    convertedAmount = amount * 0.002028;
                    break;
                case "Sickle":
                    convertedAmount = amount * 0.03448;
                    break;
            }
            break;
    }
    fromValue.textContent = `${amount} ${fromCurrency} = `;
    toValue.textContent = `${convertedAmount} ${toCurrency}`;
}