import { CURRENCIES, generateOptions } from "./currencies.js";
const from_currency = document.querySelector('[name="from_currency"]');
const form = document.querySelector('form');

const BASE_RATE = {};
// step 1 load base currency with options  
const options = generateOptions(CURRENCIES);
from_currency.innerHTML = options;

/* 



*/
form.addEventListener('input', () => {
    if(!BASE_RATE[from_currency.value]) {
        
    }
    
})
