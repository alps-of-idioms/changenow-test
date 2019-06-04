import React from 'react'
import PropTypes from 'prop-types'

const CoinItem = ({ ticker, name, setCurrencyType, idx }) => {
  return (
    <li
      className="selectbox-list__coin"
      onClick={() => setCurrencyType(ticker)}
      onKeyUp={e => {
        e.keyCode === 13 && setCurrencyType(ticker)
      }}
      tabIndex={501 + idx}
    >
      <span className="selectbox-list__ticker">{ticker.toUpperCase()}</span>
      <span className="selectbox-list__name">{name}</span>
    </li>
  )
}
CoinItem.propTypes = {
  ticker: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  setCurrencyType: PropTypes.func.isRequired,
  idx: PropTypes.string.isRequired,
}
export default CoinItem
