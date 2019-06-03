import React from 'react'

const CoinItem = ({ ticker, name, setCurrencyType }) => {
  return (
    <li onClick={() => setCurrencyType(ticker)}>
      <span>{ticker}</span>
      <span>{name}</span>
    </li>
  )
}

export default CoinItem
