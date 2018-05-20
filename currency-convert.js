const axios = require('axios');

const getExchangeRate = (from, to) => {
    return axios.get('http://data.fixer.io/api/latest?access_key=8ad0ca89f449766f64095f2c9e92d04c&format=1').then(response => {
        let euro = 1 / response.data.rates[from];
        let rate = euro * response.data.rates[to];
        return rate;
    })
};
getExchangeRate('USD', 'CAD').then(rate => console.log(rate));

const getExchangeRateAlt = async (from, to) => {
    try{
        let response = await axios.get('http://data.fixer.io/api/latest?access_key=8ad0ca89f449766f64095f2c9e92d04c&format=1');
        let euro = 1 / response.data.rates[from];
        let rate = euro * response.data.rates[to];
        if(isNaN(rate)){
            throw new Error();
        }
        return rate;
    }catch(err){
        throw new Error(`unable to get exchange rate for ${from} to ${to}`);
    } 
}
getExchangeRateAlt('USD', 'INR').then(rate => console.log(rate));

const getCountries = (currency) => {
    return axios.get(`https://restcountries.eu/rest/v2/currency/${currency}`).then(response => {
        return response.data.map(country => country.name);
    })
};
getCountries('USD').then(countries => console.log(countries));

const getCountriesAlt = async (currency) => {
    try{
        let response = await axios.get(`https://restcountries.eu/rest/v2/currency/${currency}`);
        return response.data.map(country => country.name);
    }catch(err){
        throw new Error(`unable to get countries which uses: ${currency}`);
    }
    
};
getCountriesAlt('INR').then(countries => console.log(countries));

const convertCurrency = async (from, to, amount) => {
    let rate = await getExchangeRate(from, to);
    let convertedAmount = (rate * amount).toFixed(2);
    let countries = await getCountries(to);
    return `${amount}  ${from} is worth ${convertedAmount} ${to}. You can spend it in the following countries: ${countries.join(', ')}`;
};

convertCurrency('USD', 'INR', 120000).then(message => console.log(message)).catch(err => console.log(err));