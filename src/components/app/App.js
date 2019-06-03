import React, { Component } from 'react'
import ExchangeService from '../../exchange-service/exchange-service'
import FirstCurrency from '../first-currency__wrapper'
import SecondCurrency from '../second-currency__wrapper'
import { ExchangeServiceProvider } from '../exchange-service-context'

class App extends Component {
  state = {
    exchangeService: new ExchangeService(),
    firstAmount: 1,
    secondAmount: '',
    firstCurrency: 'btc',
    secondCurrency: 'xmr',
    firstIsOpen: false,
    secondIsOpen: false,
    currencyList: [],
  }

  setFirstAmount = (name, value) => {
    this.setState({
      [name]: value,
    })
  }

  onClickOutside = () => {
    this.setState({
      firstIsOpen: false,
      secondIsOpen: false,
    })
  }

  toggleSelectboxHandler = inputNumber => {
    let otherInputNumber = inputNumber === 'first' ? 'second' : 'first'
    this.setState(prevState => {
      return {
        [`${inputNumber}IsOpen`]: !prevState[`${inputNumber}IsOpen`],
        [`${otherInputNumber}IsOpen`]: false,
      }
    })
  }

  setCurrencyType = inputNumber => ticker => {
    console.log('choose cur')
    this.setState({
      [`${inputNumber}Currency`]: ticker,
    })
  }

  updateAmount = (
    exchangeService,
    firstAmount,
    firstCurrency,
    secondCurrency
  ) => {
    exchangeService
      .exchangeAmount(firstAmount, firstCurrency, secondCurrency)
      .then(parsedJSON =>
        this.setState({
          secondAmount: parsedJSON.estimatedAmount,
        })
      )
  }

  componentDidMount() {
    const {
      exchangeService,
      firstAmount,
      firstCurrency,
      secondCurrency,
    } = this.state
    this.updateAmount(
      exchangeService,
      firstAmount,
      firstCurrency,
      secondCurrency
    )
    exchangeService.getCurrencies().then(result => {
      this.setState({
        currencyList: result,
      })
    })
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      exchangeService,
      firstAmount,
      firstCurrency,
      secondCurrency,
    } = this.state
    if (
      firstAmount !== prevState.firstAmount ||
      firstCurrency !== prevState.firstCurrency ||
      secondCurrency !== prevState.secondCurrency
    ) {
      this.updateAmount(
        exchangeService,
        firstAmount,
        firstCurrency,
        secondCurrency
      )
    }
  }

  render() {
    const {
      currencyList,
      firstAmount,
      secondAmount,
      firstCurrency,
      secondCurrency,
      firstIsOpen,
      secondIsOpen,
    } = this.state
    return (
      <ExchangeServiceProvider
        value={{
          currencyList: currencyList,
          setCurrencyType: this.setCurrencyType,
        }}
      >
        <div className="app__container">
          <div className="currency-pair__wrapper">
            <FirstCurrency
              isOpen={firstIsOpen}
              toggleSelectboxHandler={() =>
                this.toggleSelectboxHandler('first')
              }
              setFirstAmount={this.setFirstAmount}
              firstAmount={firstAmount}
              firstCurrency={firstCurrency}
              onClickOutside={this.onClickOutside}
            />
            <SecondCurrency
              isOpen={secondIsOpen}
              toggleSelectboxHandler={() =>
                this.toggleSelectboxHandler('second')
              }
              secondAmount={secondAmount}
              secondCurrency={secondCurrency}
              onClickOutside={this.onClickOutside}
            />
          </div>
        </div>
      </ExchangeServiceProvider>
    )
  }
}

export default App
