const fromOptions = document.querySelector('[name="from_currency"]');
const toOptions = document.querySelector('[name="to_currency"]');

const currencies = {
  USD: 'United States Dollar',
  AUD: 'Australian Dollar',
  BGN: 'Bulgarian Lev',
  BRL: 'Brazilian Real',
  CAD: 'Canadian Dollar',
  CHF: 'Swiss Franc',
  CNY: 'Chinese Yuan',
  CZK: 'Czech Republic Koruna',
  DKK: 'Danish Krone',
  GBP: 'British Pound Sterling',
  HKD: 'Hong Kong Dollar',
  HRK: 'Croatian Kuna',
  HUF: 'Hungarian Forint',
  IDR: 'Indonesian Rupiah',
  ILS: 'Israeli New Sheqel',
  INR: 'Indian Rupee',
  JPY: 'Japanese Yen',
  KRW: 'South Korean Won',
  MXN: 'Mexican Peso',
  MYR: 'Malaysian Ringgit',
  NOK: 'Norwegian Krone',
  NZD: 'New Zealand Dollar',
  PHP: 'Philippine Peso',
  PLN: 'Polish Zloty',
  RON: 'Romanian Leu',
  RUB: 'Russian Ruble',
  SEK: 'Swedish Krona',
  SGD: 'Singapore Dollar',
  THB: 'Thai Baht',
  TRY: 'Turkish Lira',
  ZAR: 'South African Rand',
  EUR: 'Euro',
};

const generateOptions = (options) => {
    return Object.entries(options).map((arr) => {
        const [currencyCode, currencyName] = arr;
        const optionsHTML = `<option value=${currencyCode}>${currencyCode} - ${currencyName}</option>`;
        return optionsHTML;
    }).join("")
}

//Fetch Rates
async function fetchRates(base = 'USD') {
const myHeaders = new Headers();
myHeaders.append("apikey", "EyBfpidfvZOVQORvq2KGxLKZ2JScMtmF")

const requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders
};

const response = await fetch(`https://api.apilayer.com/exchangerates_data/latest?base=${base}`, requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));

  return response;
}
const optionsHTML = generateOptions(currencies);
fetchRates();
fromOptions.innerHTML = optionsHTML;
toOptions.innerHTML = optionsHTML;

