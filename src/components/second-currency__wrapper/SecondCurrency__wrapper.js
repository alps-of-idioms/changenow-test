import React from 'react'
import CurrencySelectbox from '../currency-selectbox'

const SecondCurrency = ({
  secondAmount,
  secondCurrency,
  isOpen,
  toggleSelectboxHandler,
  onClickOutside,
}) => {
  return (
    <div className="second-currency__wrapper">
      <span className="second-currency__label">You Get</span>
      <input
        className="second-currency__input"
        type="text"
        name="secondAmount"
        value={secondAmount}
        disabled
      />

      <CurrencySelectbox
        number={'second'}
        chosenCurrency={secondCurrency}
        isOpen={isOpen}
        toggleSelectboxHandler={toggleSelectboxHandler}
        onClickOutside={onClickOutside}
      />
    </div>
  )
}

export default SecondCurrency
