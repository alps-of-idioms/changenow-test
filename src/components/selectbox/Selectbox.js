import React from 'react'
import CoinItem from '../coin-item'
import { withExchange } from '../hoc'

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
    } = this.props.dataPackage
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
    const { setCurrencyType } = this.props.dataPackage
    const { number } = this.props
    return (
      <div className="selectbox__wrapper" onClick={this.handler}>
        <div className="selectbox__search-icon">
          <svg width="24" height="24" fillRule="evenodd" clipRule="evenodd">
            <path d="M15.853 16.56c-1.683 1.517-3.911 2.44-6.353 2.44-5.243 0-9.5-4.257-9.5-9.5s4.257-9.5 9.5-9.5 9.5 4.257 9.5 9.5c0 2.442-.923 4.67-2.44 6.353l7.44 7.44-.707.707-7.44-7.44zm-6.353-15.56c4.691 0 8.5 3.809 8.5 8.5s-3.809 8.5-8.5 8.5-8.5-3.809-8.5-8.5 3.809-8.5 8.5-8.5z" />
          </svg>
        </div>
        <input
          ref={this.SelectboxContainer}
          className="selectbox__input"
          type="text"
          name="searchCurrency"
          onChange={this.searchCurrencyHandler}
          value={currencySearchValue}
          placeholder="Type a currency"
          tabIndex={1000}
        />
        <div className="selectbox-list__wrapper">
          <ul className="selectbox-list__coinlist">
            {this.filterSearchCoinList(currencySearchValue).map(
              ({ ticker, name }, idx) => {
                return (
                  <CoinItem
                    key={ticker}
                    name={name}
                    ticker={ticker}
                    idx={idx}
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

export default withExchange(Selectbox)
