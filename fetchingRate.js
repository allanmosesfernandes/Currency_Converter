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
      .then(response => response.json())
      .then(result => result)
      .catch(error => console.log('error', error));
      
    return response;
}