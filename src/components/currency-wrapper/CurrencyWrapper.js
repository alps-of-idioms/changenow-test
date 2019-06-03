import React from 'react'
import CurrencySelectbox from '../currency-selectbox'

const CurrencyWrapper = ({
  number,
  amount,
  currency,
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
    <div className={`${number}-currency`}>
      <span className={`${number}-currency__label`}>
        You {number === 'first' ? 'Send' : 'Get'}
      </span>
      <input
        className={`${number}-currency__input`}
        type="text"
        name={`${number}Amount`}
        value={amount}
        onChange={number === 'first' ? inputHandler : () => {}}
        disabled={number === 'first' ? false : true}
      />
      <CurrencySelectbox
        number={number}
        chosenCurrency={currency}
        isOpen={isOpen}
        toggleSelectboxHandler={toggleSelectboxHandler}
        onClickOutside={onClickOutside}
      />
    </div>
  )
}

export default CurrencyWrapper
