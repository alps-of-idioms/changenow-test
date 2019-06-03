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
  }
  handler = e => {
    e.preventDefault()
    e.stopPropagation()
    e.nativeEvent.stopImmediatePropagation()
  }

  render() {
    const { currencySearchValue } = this.state
    const { currencyList, setCurrencyType } = this.props.exchangeService
    const { number } = this.props
    /*  const { toggleSelectboxHandler } = this.props */
    return (
      <div className="selectbox__wrapper" onClick={this.handler}>
        <input
          ref={this.SelectboxContainer}
          className="selectbox-input"
          type="text"
          name="searchCurrency"
          onChange={this.searchCurrencyHandler}
          value={currencySearchValue}
        />
        <div className="selectbox-list__wrapper">
          <ul className="selectbox-list__coinlist">
            {currencyList.map(({ ticker, name }) => {
              return (
                <CoinItem
                  key={ticker}
                  name={name}
                  ticker={ticker}
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

export default withExchangeService(Selectbox)
