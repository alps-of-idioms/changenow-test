import React from 'react'
import PropTypes from 'prop-types'
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

  preventBubblingHandler = e => {
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
    const { number, toggleSelectboxHandler } = this.props
    let filteredCoinList = this.filterSearchCoinList(currencySearchValue)
    return (
      <div
        className="selectbox__wrapper"
        onClick={this.preventBubblingHandler}
        onKeyUp={e => {
          e.keyCode === 27 && toggleSelectboxHandler(number)
        }}
      >
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
          tabIndex={500}
        />
        <div className="selectbox-list__wrapper">
          {filteredCoinList.length === 0 && (
            <div className="selectbox-list__coinlistnot--not-found">
              <p>Currency not found</p>
            </div>
          )}
          <ul className="selectbox-list__coinlist">
            {filteredCoinList.map(({ ticker, name }, idx) => {
              return (
                <CoinItem
                  key={ticker}
                  name={name}
                  ticker={ticker}
                  idx={idx}
                  setCurrencyType={setCurrencyType(number)}
                />
              )
            })}
          </ul>
        </div>
      </div>
    )
  }
}
Selectbox.propTypes = {
  number: PropTypes.string.isRequired,
  toggleSelectboxHandler: PropTypes.func.isRequired,
  dataPackage: PropTypes.shape({
    setCurrencyType: PropTypes.func.isRequired,
    currencyList: PropTypes.arrayOf(PropTypes.object),
    firstCurrency: PropTypes.string.isRequired,
    secondCurrency: PropTypes.string.isRequired,
  }),
}

export default withExchange(Selectbox)
