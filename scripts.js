import { CURRENCIES, generateOptions } from "./currencies.js";
const from_currency = document.querySelector('[name="from_currency"]');
const gbp_currency = document.querySelector('[name="gbp_currency"]');


const form = document.querySelector('form');

const BASE_RATE = {};
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
        .catch(error => console.log('error', error));
    
    return response;
} 

async function getBaseRate(from, to, amount) {

    if(!BASE_RATE[from_currency.value]) {
        const rates =  await fetchRates(from);
        BASE_RATE[from] = rates;
        console.log(BASE_RATE)
    }

    //converting amount
    const rate = BASE_RATE[from].rates[to];
    const convertedAmount = amount * rate;
    console.log(`the ${from} to ${to} is ${convertedAmount}`)
    return convertedAmount;
}
   
form.addEventListener('input', () => {
const total = getBaseRate(from_currency.value,gbp_currency.value, 100 )
console.log(total);
    
})
