import { CURRENCIES, generateOptions } from "./currencies.js";
const from_currency = document.querySelector('[name="from_currency"]');
const gbp_currency = document.querySelector('[name="gbp_currency"]');
const usa_currency = document.querySelector('[name="USD_amount"]');
const from_amount = document.querySelector('[name="from_amount"]');
let gbp_amount_input = document.querySelector('[name="GBP_amount"]');

const INR_amount = document.querySelector('[name="INR_amount"]');
const form = document.querySelector('form');
const BASE_RATE = {};
const errorMessage = document.querySelector(".error__message");
// step 1 load base currency with options  
const options = generateOptions(CURRENCIES);
from_currency.innerHTML = options;

    async function fetchRates(base = 'USD') {
    const myHeaders = new Headers();
    myHeaders.append("apikey", "wFKXuHJQWn8pzQ9J1DY5if2OvWPIuArt")
    const requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: myHeaders
    };

    const response = await fetch(`https://api.apilayer.com/exchangerates_data/latest?base=${base}`, requestOptions)
        .then(response => response.json())
        .then(result => result)
        .catch(error => ('error', error));
    
    return response;
} 

async function getBaseRate(from, to, amount) {

  // show loader
  const loader = document.querySelector('.loader');
   loader.style.display = 'block';

    if(!BASE_RATE[from_currency.value]) {
        const rates =  await fetchRates(from);
        BASE_RATE[from] = rates;
    }

    //converting amount
    const rate = BASE_RATE[from].rates[to];
    const INRrate = BASE_RATE[from].rates['INR'];
    const USARate = BASE_RATE[from].rates['USD'];

    const convertedAmount = ((amount * rate).toFixed(2));
    (convertedAmount);
    const convertedAmountINR = (amount * INRrate).toFixed(2);
    const convertedAmountUSD = (amount * USARate).toFixed(2);
    (convertedAmountINR);
    (`the ${from} to ${to} is ${convertedAmount}`);
    gbp_amount_input.value = `${convertedAmount} £`;
    INR_amount.value = `${convertedAmountINR} ₹`;
    usa_currency.value = `${convertedAmountUSD} $`;
    // hide loader
     loader.style.display = 'none';

    return convertedAmount;
}
   
form.addEventListener('input', (event) => {
  const inputValue = event.target.value;
   const sanitizedValue = inputValue.replace(/[^0-9.]/g, '');
//   console.log(from_currency.value);
   if (inputValue !== sanitizedValue) {
     errorMessage.style.opacity = '1';
   }
   else {
     errorMessage.style.opacity = '0';
     const total = getBaseRate(from_currency.value,gbp_currency.value, from_amount.value );

   }
  
//   event.target.value = sanitizedValue;
    
})
