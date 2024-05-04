let fromCurrency = document.querySelector("#fromCurrency").value;
let toCurrency = document.querySelector("#toCurrency").value;
let amount = document.getElementById("amount").value;
let convertedAmount;

function convert() {
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
}