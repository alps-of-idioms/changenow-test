import React from 'react'

const CoinItem = ({ ticker, name, setCurrencyType, idx }) => {
  return (
    <li
      className="selectbox-list__coin"
      onClick={() => setCurrencyType(ticker)}
      onKeyUp={e => {
        e.keyCode === 13 && setCurrencyType(ticker)
      }}
      tabIndex={1001 + idx}
    >
      <span className="selectbox-list__ticker">{ticker.toUpperCase()}</span>
      <span className="selectbox-list__name">{name}</span>
    </li>
  )
}

export default CoinItem
