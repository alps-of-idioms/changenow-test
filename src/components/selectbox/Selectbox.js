import React from 'react'
import CoinItem from '../coin-item'
import { withExchangeService } from '../hoc'

class Selectbox extends React.Component {
  state = {
    currencySearchValue: '',
  }

  SelectboxContainer = React.createRef()

  componentDidMount() {
    this.SelectboxContainer.current.focus()
  }

  searchCurrencyHandler = e => {
    let value = e.target.value
    this.setState({
      currencySearchValue: value,
    })
  }

  handler = e => {
    e.preventDefault()
    e.stopPropagation()
    e.nativeEvent.stopImmediatePropagation()
  }

  excludeCurrency = () => {
    const {
      currencyList,
      firstCurrency,
      secondCurrency,
    } = this.props.exchangeService
    const { number } = this.props
    let currencyToExclude = number === 'first' ? secondCurrency : firstCurrency
    return currencyList.filter(({ ticker }) => {
      return ticker !== currencyToExclude
    })
  }

  filterSearchCoinList = searchValue => {
    let visibleCoins = this.excludeCurrency()
    if (searchValue.length === 0) {
      return visibleCoins
    } else {
      return visibleCoins.filter(({ ticker, name }) => {
        return (
          name.toLowerCase().indexOf(searchValue.toLowerCase()) > -1 ||
          ticker.indexOf(searchValue.toLowerCase()) > -1
        )
      })
    }
  }

  render() {
    const { currencySearchValue } = this.state
    const { setCurrencyType } = this.props.exchangeService
    const { number } = this.props
    return (
      <div
        className="selectbox__wrapper"
        onClick={this.handler}
        style={{ zIndex: 999 }}
      >
        <input
          ref={this.SelectboxContainer}
          className="selectbox__input"
          type="text"
          name="searchCurrency"
          onChange={this.searchCurrencyHandler}
          value={currencySearchValue}
          placeholder="Type a currency"
        />
        <div className="selectbox-list__wrapper">
          <ul className="selectbox-list__coinlist">
            {this.filterSearchCoinList(currencySearchValue).map(
              ({ ticker, name }) => {
                return (
                  <CoinItem
                    key={ticker}
                    name={name}
                    ticker={ticker}
                    setCurrencyType={setCurrencyType(number)}
                  />
                )
              }
            )}
          </ul>
        </div>
      </div>
    )
  }
}

export default withExchangeService(Selectbox)
