import React from 'react'
import PropTypes from 'prop-types'
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
    if (value.match(/^[0-9]*[.]?[0-9]*$/) !== null) {
      setFirstAmount(e.target.name, value)
    }
  }

  return (
    <div
      className={`exchange-currency__wrapper ${number === 'second' &&
        'exchange-currency--down'} `}
    >
      <span className={`exchange-currency__label`}>
        You {number === 'first' ? 'Send' : 'Get'}
      </span>
      <input
        className={`exchange-currency__input`}
        type="text"
        name={`${number}Amount`}
        value={amount}
        onChange={number === 'first' ? inputHandler : null}
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
CurrencyWrapper.propTypes = {
  number: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  setFirstAmount: PropTypes.func,
  amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  currency: PropTypes.string.isRequired,
  toggleSelectboxHandler: PropTypes.func.isRequired,
  onClickOutside: PropTypes.func.isRequired,
}

export default CurrencyWrapper
