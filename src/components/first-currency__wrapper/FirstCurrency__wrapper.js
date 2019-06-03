import React from 'react'
import CurrencySelectbox from '../currency-selectbox'

const FirstCurrency = ({
  firstAmount,
  firstCurrency,
  isOpen,
  toggleSelectboxHandler,
  onClickOutside,
  setFirstAmount,
}) => {
  const inputHandler = e => {
    let value = e.target.value
    /* if (/(?<=^| )\d+(\.\d+)?(?=$| )/.test(value)) { */
    setFirstAmount(e.target.name, value)
    /* } */
  }

  return (
    <div className="first-currency__wrapper">
      <span className="first-currency__label">You Send</span>
      <input
        className="first-currency__input"
        type="text"
        name="firstAmount"
        value={firstAmount}
        onChange={inputHandler}
      />
      <CurrencySelectbox
        number={'first'}
        chosenCurrency={firstCurrency}
        isOpen={isOpen}
        toggleSelectboxHandler={toggleSelectboxHandler}
        onClickOutside={onClickOutside}
      />
    </div>
  )
}

export default FirstCurrency
