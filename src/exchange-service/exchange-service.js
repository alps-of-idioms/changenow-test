export default class ExchangeService {
  _urlBase = 'https://changenow.io/api/v1'

  getCurrencies = () => {
    return fetch(`${this._urlBase}/currencies`).then(response => {
      return response.json()
    })
  }

  exchangeAmount = (amount, from, to) => {
    return fetch(
      `${this._urlBase}/exchange-amount/${amount}/${from}_${to}`
    ).then(response => {
      return response.json()
    })
  }
}
