const axios = require('axios')

const getExchangeRate = async (from, to) => {
  const response = await axios.get(
    'http://data.fixer.io/api/latest?access_key=6572477528f19e163f272d14e0e16dae'
  )
  const euro = 1 / response.data.rates[from]
  const rate = euro * response.data.rates[to]
  return rate
}

const getCountries = async currencyCode => {
  const response = await axios.get(
    `https://restcountries.eu/rest/v2/currency/${currencyCode}`
  )
  return response.data.map(country => country.name)
}

const convertCurrency = async (from, to, amount) => {
  const rate = await getExchangeRate(from, to)
  const convertedAmount = (amount * rate).toFixed(2)

  const countries = await getCountries(to)

  return `${amount} ${from} is worth ${convertedAmount} ${to}. You can spend these in the follwing countries: ${countries}`
}

convertCurrency('GBP', 'ZAR', 20).then(message => {
  console.log(message)
})
