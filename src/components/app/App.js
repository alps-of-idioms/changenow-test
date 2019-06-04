import React, { Component } from 'react'
import ExchangeService from '../../exchange-service/exchange-service'
import CurrencyWrapper from '../currency-wrapper'
import { ExchangeProvider } from '../exchange-context'
import ErrorBoundry from '../error-boundry'

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
      firstIsOpen: false,
      secondIsOpen: false,
    })
  }

  updateAmount = (
    exchangeService,
    firstAmount,
    firstCurrency,
    secondCurrency
  ) => {
    if (firstAmount === '0' || firstAmount === '') {
      this.setState({
        secondAmount: '0',
      })
    }
    exchangeService
      .exchangeAmount(firstAmount, firstCurrency, secondCurrency)
      .then(parsedJSON => {
        this.setState({
          secondAmount: parsedJSON.estimatedAmount || parsedJSON.error,
        })
      })
      .catch(error => console.error(error))
  }

  updateCurrencies = () => {
    const { exchangeService } = this.state
    exchangeService
      .getCurrencies()
      .then(result => {
        this.setState({
          currencyList: result,
        })
      })
      .catch(error => console.error(error))
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
    this.updateCurrencies()
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
      this.updateCurrencies()
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
      <ErrorBoundry>
        <ExchangeProvider
          value={{
            currencyList,
            setCurrencyType: this.setCurrencyType,
            firstCurrency,
            secondCurrency,
          }}
        >
          <div className="app-container">
            <div className="currency-pair">
              <CurrencyWrapper
                number={'first'}
                isOpen={firstIsOpen}
                setFirstAmount={this.setFirstAmount}
                amount={firstAmount}
                currency={firstCurrency}
                toggleSelectboxHandler={this.toggleSelectboxHandler}
                onClickOutside={this.onClickOutside}
              />
              <CurrencyWrapper
                number={'second'}
                isOpen={secondIsOpen}
                amount={secondAmount}
                currency={secondCurrency}
                toggleSelectboxHandler={this.toggleSelectboxHandler}
                onClickOutside={this.onClickOutside}
              />
            </div>
          </div>
        </ExchangeProvider>
      </ErrorBoundry>
    )
  }
}

export default App
