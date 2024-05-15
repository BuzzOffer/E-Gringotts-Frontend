export let fromCurrency;
export let toCurrency;
export let amount;
export let convertedAmount;
let fromValue = document.getElementById("fromValue");
let toValue = document.getElementById("toValue");

export function convert(amt, frm, to) {
    let newAmt = amt;
    if (frm === to) {
        return amt;
    }
    switch (frm) {
        case "Galleon":
            switch (to) {
                case "Sickle":
                    newAmt = amt * 17;
                    break;
                case "Knut":
                    newAmt = amt * 493;
                    break;
            }
            break;
        case "Sickle":
            switch(to) {
                case "Galleon":
                    newAmt = amt * 0.05882;
                    break;
                case "Knut":
                    newAmt = amt * 29;
                    break;
            }
            break;
        case "Knut":
            switch(to) {
                case "Galleon":
                    newAmt = amt * 0.002028;
                    break;
                case "Sickle":
                    newAmt = amt * 0.03448;
                    break;
            }
            break;
    }
    return newAmt;
}